import os
import time
import base64
from PIL import Image
import aiohttp
from aiohttp import web
import server
import json
import sys
import re
import uuid
import hashlib
import threading
import asyncio
import websockets
import collections
import queue
import traceback
from concurrent.futures import ThreadPoolExecutor
from threading import Lock, Condition
from comfy.cli_args import parser
import logging
import random
import requests
import mimetypes
import math
import platform
import subprocess
import aiohttp_cors
from aiohttp import web


# 在文件开头设置日志配置
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(module)s:%(lineno)d - %(message)s",
)
logger = logging.getLogger(__name__)


DEBUG = True
BASE_URL = "https://env-00jxh693vso2.dev-hz.cloudbasefunction.cn"
END_POINT_URL3 = "/kaji-upload-file/uploadFile"
END_POINT_URL1 = "/kaji-upload-file/uploadProduct"
END_POINT_URL2 = "/get-ws-address/getWsAddress"
END_POINT_URL_FOR_PRODUCT_1 = "/plugin/getProducts"
END_POINT_URL_FOR_PRODUCT_2 = "/plugin/createOrUpdateProduct"
END_POINT_URL_FOR_PRODUCT_3 = "/plugin/deleteProduct"
END_POINT_URL_FOR_PRODUCT_4 = "/plugin/toggleAuthorStatus"
END_POINT_URL_FOR_PRODUCT_5 = "/plugin/toggleDistributionStatus"
END_POINT_FILE_IS_EXITS = "/plugin/fileIsExits"  
END_POINT_DELETE_FILE = "/plugin/deleteFiles"  
END_POINT_GET_WORKFLOW = "/plugin/getWorkflow"                
media_save_dir = ".../../input"
media_output_dir = ".../../output"
is_connection = False
wss_c1 = None
wss_c2 = None
last_value = None
last_time = None
RECONNECT_DELAY = 5
MAX_RECONNECT_ATTEMPTS = 10
HEART_INTERVAL = 30
gc_task_queue = queue.Queue()
ws_task_queue = queue.Queue()


def parse_args():
    args = parser.parse_args()
    return args if args.listen else parser.parse_args([])


def get_address_from_args(args):
    return args.listen if args.listen != "0.0.0.0" else "127.0.0.1"


def parse_port_from_args(args):
    return args.port


def get_mac_address() -> str:
    mac_uid = uuid.getnode()
    mac_address = ":".join(("%012X" % mac_uid)[i : i + 2] for i in range(0, 12, 2))
    return mac_address


def get_port_from_cmd(default_port=8188):
    port = None

    def extract_port_from_arg(arg):
        match = re.search(r"--port[=\s]*(\d+)", arg)
        if match:
            return int(match.group(1))
        return None

    for i, arg in enumerate(sys.argv):
        if arg == "--port" and i + 1 < len(sys.argv):
            try:
                port = int(sys.argv[i + 1])
            except ValueError:
                continue

        extracted_port = extract_port_from_arg(arg)
        if extracted_port:
            port = extracted_port
        if port:
            break

    return port if port else default_port


def get_machine_unique_id():
    # 获取机器唯一标识符（跨平台适配）
    try:
        system = platform.system()

        if system == "Linux":
            # 优先尝试从 /etc/machine-id 获取
            if os.path.exists("/etc/machine-id"):
                with open("/etc/machine-id", "r") as f:
                    return f.read().strip()

            # 如果 /etc/machine-id 不存在，尝试 dmidecode
            try:
                result = subprocess.check_output(
                    ["dmidecode", "-s", "system-uuid"], stderr=subprocess.DEVNULL
                )
                return result.decode().strip()
            except (subprocess.CalledProcessError, FileNotFoundError):
                pass

            # 如果 dmidecode 不可用，尝试从 /proc/cpuinfo 获取 CPU 信息
            try:
                with open("/proc/cpuinfo", "r") as f:
                    cpuinfo = f.read()
                    for line in cpuinfo.split("\n"):
                        if line.startswith("Serial"):
                            return line.split(":")[1].strip()
            except FileNotFoundError:
                pass

            # 最后尝试生成基于网络接口的 UUID
            mac_address = uuid.getnode()
            return uuid.UUID(int=mac_address).hex

        elif system == "Darwin":  # macOS
            result = subprocess.check_output(
                ["ioreg", "-rd1", "-c", "IOPlatformExpertDevice"]
            )
            for line in result.decode().split("\n"):
                if "IOPlatformUUID" in line:
                    return line.split('"')[-2]
            raise ValueError("IOPlatformUUID not found")

        elif system == "Windows":  # Windows
            result = subprocess.check_output(["wmic", "csproduct", "get", "UUID"])
            return result.decode().split("\n")[1].strip()

        else:
            raise ValueError("Unsupported platform")

    except Exception as e:
        raise RuntimeError(f"Failed to retrieve machine ID: {e}")


def generate_unique_hash():
    # 考虑到端口动态性和mac地址如果在虚拟机中更改mac，或者更换网卡也会受影响，使用机器唯一标识符生成稳定的哈希值
    machine_id = get_machine_unique_id()
    hash_value = hashlib.sha256(machine_id.encode()).hexdigest()
    return hash_value


args = parse_args()
cur_client_id = f"{str(uuid.uuid4())}:{parse_port_from_args(args)}"
cfy_ws_url = "ws://{}:{}/ws?clientId={}".format(
    get_address_from_args(args), parse_port_from_args(args), cur_client_id
)

uni_hash = generate_unique_hash()
print(f"每次启动都是相同的机器码，uni_hash：{uni_hash}")


def get_comfyui_address():
    args = parse_args()
    address = get_address_from_args(args)
    port = parse_port_from_args(args)
    return f"http://{address}:{port}"


class ManagedThreadPoolExecutor(ThreadPoolExecutor):
    def __init__(self, max_workers=None, thread_name_prefix=""):
        super().__init__(max_workers=max_workers, thread_name_prefix=thread_name_prefix)
        self._task_lock = Lock()
        self._task_condition = Condition(self._task_lock)
        self._current_active_tasks = 0
        self._max_concurrent_tasks = max_workers

    def submit(self, fn, *args, **kwargs):
        with self._task_lock:
            while self._current_active_tasks >= self._max_concurrent_tasks:
                self._task_condition.wait()
            self._current_active_tasks += 1

        wrapped_function = self._wrap_task(fn)
        future_task = super().submit(wrapped_function, *args, **kwargs)
        return future_task

    def _wrap_task(self, fn):
        def wrapped_fn(*args, **kwargs):
            try:
                return fn(*args, **kwargs)
            finally:
                with self._task_lock:
                    self._current_active_tasks -= 1
                    self._task_condition.notify_all()

        return wrapped_fn

    def get_active_task_count(self):
        with self._task_lock:
            return self._current_active_tasks


# 创建线程池执行器
executor = ManagedThreadPoolExecutor(max_workers=20)


# 定义一个双向字典，维护正在等待进度（包括排队人数）的生成记录
# key: generate_record_id, value: prompt_id
class BidirectionalDict:
    def __init__(self):
        self.forward = {}
        self.backward = {}

    def add(self, key, value):
        self.forward[key] = value
        self.backward[value] = key

    def has_key(self, key):
        return key in self.forward

    def get_value_by_key(self, key):
        return self.forward.get(key)

    def remove_key(self, key):
        value = self.forward.pop(key, None)
        self.backward.pop(value, None)

    def has_value(self, value):
        return value in self.backward

    def get_key_by_value(self, value):
        return self.backward.get(value)

    def remove_value(self, value):
        key = self.backward.pop(value, None)
        self.forward.pop(key, None)


bd = BidirectionalDict()


def is_image_file(image_path):
    if not os.path.isfile(image_path):
        print(f"文件不存在: {image_path}")
        return False
    try:
        with Image.open(image_path) as img:
            img.verify()
        print(f"文件存在且为有效的图片: {image_path}")
        return True
    except (IOError, SyntaxError) as e:
        print(f"文件存在，但不是有效的图片: {image_path}")
        return False


def get_comfy_root(levels_up=2):
    current_directory = os.path.dirname(os.path.abspath(__file__))

    relative_path = os.path.join(current_directory, *[".."] * levels_up)

    proj_root = os.path.abspath(relative_path)

    if not proj_root.endswith(os.sep):
        proj_root += os.sep

    return proj_root


def getInputTypeArr(data):

    input_type_arr = []
    for key, item in data.items():
        if item.get("class_type") == "sdCpm":
            inputs = item.get("inputs")
            input_text1 = inputs.get("input_text1(optional)")
            input_text2 = inputs.get("input_text2(optional)")
            input_text3 = inputs.get("input_text3(optional)")
            input_img1 = inputs.get("input_img1(optional)")
            input_img2 = inputs.get("input_img2(optional)")
            input_img3 = inputs.get("input_img3(optional)")
            input_video1 = inputs.get("input_video1(optional)")
            input_video2 = inputs.get("input_video2(optional)")
            input_video3 = inputs.get("input_video3(optional)")

            text1_tips = inputs.get("text1_tips")
            text2_tips = inputs.get("text2_tips")
            text3_tips = inputs.get("text3_tips")
            img1_tips = inputs.get("img1_tips")
            img2_tips = inputs.get("img2_tips")
            img3_tips = inputs.get("img3_tips")
            video1_tips = inputs.get("video1_tips")
            video2_tips = inputs.get("video2_tips")
            video3_tips = inputs.get("video3_tips")

            if input_text1:
                text1 = {
                    "index": input_text1[0],
                    "class_type": data.get(input_text1[0], {}).get("class_type"),
                    "input_des": text1_tips,
                }
                input_type_arr.append(text1)
            if input_text2:
                text2 = {
                    "index": input_text2[0],
                    "class_type": data.get(input_text2[0], {}).get("class_type"),
                    "input_des": text2_tips,
                }
                input_type_arr.append(text2)
            if input_text3:
                text3 = {
                    "index": input_text3[0],
                    "class_type": data.get(input_text3[0], {}).get("class_type"),
                    "input_des": text3_tips,
                }
                input_type_arr.append(text3)
            if input_img1:
                img1 = {
                    "index": input_img1[0],
                    "class_type": data.get(input_img1[0], {}).get("class_type"),
                    "input_des": img1_tips,
                }
                input_type_arr.append(img1)
            if input_img2:
                img2 = {
                    "index": input_img2[0],
                    "class_type": data.get(input_img2[0], {}).get("class_type"),
                    "input_des": img2_tips,
                }
                input_type_arr.append(img2)
            if input_img3:
                img3 = {
                    "index": input_img3[0],
                    "class_type": data.get(input_img3[0], {}).get("class_type"),
                    "input_des": img3_tips,
                }
                input_type_arr.append(img3)
            if input_video1:
                video1 = {
                    "index": input_video1[0],
                    "class_type": data.get(input_video1[0], {}).get("class_type"),
                    "input_des": video1_tips,
                }
                input_type_arr.append(video1)
            if input_video2:
                video2 = {
                    "index": input_video2[0],
                    "class_type": data.get(input_video2[0], {}).get("class_type"),
                    "input_des": video2_tips,
                }
                input_type_arr.append(video2)
            if input_video3:
                video3 = {
                    "index": input_video3[0],
                    "class_type": data.get(input_video3[0], {}).get("class_type"),
                    "input_des": video3_tips,
                }
                input_type_arr.append(video3)
    logging.info(f"input_type_arr =====》 {input_type_arr}")
    return input_type_arr


def reformat(uploadData):
    # 从数据中提取必要字段
    uniqueid = uploadData.get("uniqueid")
    workflow = uploadData.get("workflow")
    output = uploadData.get("output")
    formMetaData = uploadData.get("formMetaData")

    if not uniqueid or not workflow or not output:
        raise ValueError("缺少必要字段：uniqueid, workflow 或 output")

    # 确保 formMetaData 是字典类型
    if not isinstance(formMetaData, dict):
        raise TypeError("formMetaData 必须是一个字典对象")

    images = uploadData.get("images", [])
    # 替换上传数据中的 media_urls
    uploadData["media_urls"] = images

    # 添加额外数据
    uploadData["uni_hash"] = uni_hash
    uploadData["formMetaData"] = formMetaData

    # 移除工作流不上传
    uploadData.pop("output", None)
    uploadData.pop("workflow", None)

    return uploadData


# 插件端与服务器端的心跳。理论上，初始化一次，任务变动（新增+1、完成-1）时触发一次。就可以。 其余时刻发送（数据都是重复）是多余的（网络探活不靠这个）
async def send_heartbeat(websocket):
    while True:
        try:
            print(f"开始发送心跳, 状态为：{websocket.state}")

            # 获取所有工作流id
            workflow_path = (
                find_project_root() + "custom_nodes/ComfyUI_bxj/config/json/workflow"
            )
            uniqueids = get_filenames(workflow_path)

            # 获取当前队列大小
            rres = await get_remaining_from_comfyui()
            queue_size = rres.get("exec_info").get("queue_remaining")

            payload = {
                "type": "ping",
                "data": {
                    "uni_hash": uni_hash,
                    "queue_size": queue_size,
                    "uniqueids": uniqueids,
                },
            }
            print(f"发送 ping 数据：{payload}")

            heartbeat_message = json.dumps(payload)
            await websocket.send(heartbeat_message)
        except websockets.ConnectionClosedError:
            print("发送ping失败, WebSocket连接意外关闭，可能网络出现问题")
            raise e
        except Exception as e:
            print(f"发送ping失败: {e}")
            raise e

        await asyncio.sleep(HEART_INTERVAL)


def get_filenames(directory):
    if os.path.exists(directory):
        all_entries = os.listdir(directory)
        # 过滤掉隐藏文件和非文件
        all_entries = [
            name
            for name in all_entries
            if os.path.isfile(os.path.join(directory, name)) and not name.startswith(".")
        ]
        # 提取文件名（去掉扩展名）
        all_entries = [name.split(".")[0] for name in all_entries]
        return all_entries
    else:
        return []


async def receive_messages(websocket, c_flag):
    try:
        while True:
            message = await websocket.recv()
            if c_flag == 1:
                print(f"接收支付宝云端ws事件数据: {message}")
                await process_server_message1(message)
            elif c_flag == 2:
                print(f"接收comfyUI的生图任务信息: {message}")
                await process_server_message2(message)
    except Exception as e:
        print(f"ws{c_flag} 接收消息失败: {e}")
        raise e


async def handle_websocket(c_flag):
    global wss_c1, wss_c2
    while True:
        try:
            if c_flag == 1:
                url = await get_wss_server_url()
            elif c_flag == 2:
                url = cfy_ws_url
            else:
                return
            logging.info(f"ws{c_flag},url: {url},开始发起连接")
            async with websockets.connect(url) as websocket:
                print(f"ws{c_flag} 连接成功！~")
                if c_flag == 1:
                    wss_c1 = websocket
                    tasks = [
                        asyncio.create_task(send_heartbeat(websocket)),
                        asyncio.create_task(receive_messages(websocket, c_flag)),
                    ]
                elif c_flag == 2:
                    wss_c2 = websocket
                    tasks = [
                        asyncio.create_task(receive_messages(websocket, c_flag)),
                    ]
                await asyncio.gather(*tasks)
        except (websockets.ConnectionClosedOK, websockets.ConnectionClosedError) as e:
            print(f"ws{c_flag} 连接不上{e}")
        except Exception as e:
            print(f"ws{c_flag} 连接失败,请检查网络{e}")

        # asyncio.gather其中的任务不退出，就不会重新连
        await asyncio.sleep(RECONNECT_DELAY)


# 咔叽服务端的数据
async def process_server_message1(message):
    try:
        # 尝试将接收到的消息解析为 JSON 对象
        message_data = json.loads(message)
        message_type = message_data.get("type")
        data = message_data.get("data", {})

        # if message_type == "pong":
        #     print("连接正常")

        if message_type == "generate_submit":
            print("收到生图消息", data)
            await deal_recv_generate_data(data)

        elif message_type == "cancel_listen":
            print("任务进度监听取消", data)
            bd.remove_key(data["kaji_generate_record_id"])

    except json.JSONDecodeError:
        print("Received non-JSON message from server.")
    except Exception as e:
        print(f"An error occurred while processing the message: {e}")


# 查出新任务的排队情况
async def find_prompt_status(prompt_id):
    qres = await get_queue_from_comfyui()
    runing_number = 0
    if qres:
        # 检查 queue_running
        for item in qres.get("queue_running", []):
            runing_number = item[0]
            if item[1] == prompt_id:
                return {"cur_q": 0, "q_status": "queue_running"}

        # 检查 queue_pending
        for item in qres.get("queue_pending", []):
            if item[1] == prompt_id:
                cur_q = item[0] - runing_number
                return {"cur_q": cur_q, "q_status": "queue_pending"}
    return None


# 发送所有任务的排队情况(此处也可以与 ping 事件合并)
async def update_all_prompt_status():
    qres = await get_queue_from_comfyui()

    if qres:
        runing_number = 0
        queue_info = {}
        for item in qres.get("queue_running", []):
            if item:
                runing_number = item[0]
        for item in qres.get("queue_pending", []):
            if item:
                prompt_id = item[1]
                # 判断是否还需要发送信息给前端用户
                if not bd.has_value(prompt_id):
                    continue
                cur_q = item[0] - runing_number
                queue_info[prompt_id] = cur_q

        if queue_info:
            update_queue = {
                "type": "update_queue",
                "data": {"queue_info": queue_info},
            }
            # 这里可以和ping 的逻辑保持一致。合并
            await wss_c1.send(json.dumps(update_queue))


# comfyUI 的 任务数据
async def process_server_message2(message):
    global last_value, last_time
    message_json = json.loads(message)
    message_type = message_json.get("type")
    if message_type == "status":
        pass
    elif message_type == "execution_start":
        # 该任务开始执行，进行中...
        pass
    elif message_type == "execution_cached":
        # 该任务被缓存好的所有节点数组
        pass

    elif message_type == "executing":
        # 该任务某个节点正在执行中
        pass
    elif message_type == "progress":
        # 该任务某个节点的具体的执行进度，与executing事件对应（往往最耗时的节点是ksample那个环节）
        progress_data = message_json.get("data", {})
        prompt_id = progress_data.get("prompt_id")

        # 判断是否还需要发送信息给前端用户
        if not bd.has_value(prompt_id):
            return

        value = progress_data.get("value")
        max_value = progress_data.get("max")

        current_time = time.time()  # 获取当前时间
        # 计算剩余时间
        if last_value is not None and last_time is not None:
            # 计算时间间隔
            time_interval = current_time - last_time
            # 计算进度变化
            value_change = value - last_value

            if value_change > 0:  # 确保进度在增加
                # 估算总时间
                estimated_total_time = (max_value / value_change) * time_interval
                remaining_time = estimated_total_time - (value * time_interval)
            else:
                remaining_time = 0  # 如果没有进度变化，设置剩余时间为 0
        else:
            remaining_time = 0  # 第一次接收进度时，无法计算剩余时间
        remaining_time = math.ceil(max(remaining_time, 0))
        # 更新上一个值和时间
        last_value = value
        last_time = current_time

        # 通过 wss_c1 发送进度信息
        if wss_c1 is not None:
            progress_message = {
                "type": "progress_update",
                "data": {
                    "remaining_time": remaining_time,  # 发送剩余时间
                    "prompt_id": prompt_id,
                    "value": value,
                    "max_value": max_value,
                },
            }
            await wss_c1.send(json.dumps(progress_message))  # 发送进度消息
            print(f"发送进度更新: {progress_message}")
        else:
            print("wss_c1 连接未建立，无法发送进度消息")

    elif message_type == "executed":
        # TODO 不是这样拿结果图...
        # 该任务某个节点执行结束。也就是最后保存结果节点。从中拿到结果。
        prompt_id = message_json["data"]["prompt_id"]
        filename = message_json["data"]["output"]["images"][0]["filename"]
        # "filename": "ComfyUI_00031_.png",
        # get_generated_image_and_upload(filename)
        media_link = await get_generated_image(filename)
        executed_success = {
            "type": "executed_success",
            "data": {
                "prompt_id": prompt_id,
                "media_link": media_link,
                "media_type": "image",
            },
        }
        await wss_c1.send(json.dumps(executed_success))

        #  结果发送成功才可以把这个prompt_id删除，否则后续需要补偿
        bd.remove_value(prompt_id)
    elif message_type == "execution_success":
        # 该任务所有节点完成，任务也完成。此时可以通知下
        await update_all_prompt_status()

    elif message_type == "execution_error":
        print(f"执行错误: {message_json}")
        # 该任务出错了。需要通知下
        prompt_id = message_json["data"]["prompt_id"]

        execution_error = {"type": "execution_error", "data": {"prompt_id": prompt_id}}
        await wss_c1.send(json.dumps(execution_error))
        #  结果发送成功才可以把这个prompt_id删除，否则后续需要补偿
        bd.remove_value(prompt_id)

    # 可以根据需要添加更多消息类型的处理


async def on_websocket_disconnection(websocket):
    if websocket is not None:
        await websocket.close()
        print("WebSocket connection has been closed.")


def start_websocket_thread(c_flag):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(handle_websocket(c_flag))


async def get_wss_server_url():
    async with aiohttp.ClientSession() as session:
        # 告知服务器，有一台新机器，使用了咔叽插件，并与您网络接通中（信息放到机器表中）
        payload = {"uni_hash": uni_hash}
        async with session.post(BASE_URL + END_POINT_URL2, json=payload) as response:
            try:
                res = await response.json()
                wss_server_url = res.get("data")
                if not wss_server_url:
                    raise Exception("Failed to retrieve WebSocket server URL")
                return wss_server_url
            except json.JSONDecodeError:
                return web.Response(
                    status=response.status, text="Invalid JSON response2"
                )


user_id = "66c1f5419d9f915ad22bf864"
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NmMxZjU0MTlkOWY5MTVhZDIyYmY4NjQiLCJyb2xlIjpbImFkbWluIl0sInBlcm1pc3Npb24iOltdLCJ1bmlJZFZlcnNpb24iOiIxLjAuMTciLCJpYXQiOjE3MzE5NDEzMzMsImV4cCI6MTczMTk0ODUzM30.q4KwshczA2jPcaiHkaqNSLjiAzrwCPxacBhD0ozFql0"


@server.PromptServer.instance.routes.post(END_POINT_URL_FOR_PRODUCT_1)
async def getProducts(req):
    jsonData = {}
    async with aiohttp.ClientSession() as session:
        jsonData["token"] = token
        jsonData["user_id"] = user_id
        async with session.post(
            BASE_URL + END_POINT_URL_FOR_PRODUCT_1, json=jsonData
        ) as response:
            res_js = await response.json()
            data = res_js.get("data", {})
            print("res_js", res_js)

            return web.json_response(res_js)


@server.PromptServer.instance.routes.post(END_POINT_URL_FOR_PRODUCT_3)
async def deleteProduct(req):
    jsonData = await req.json()
    async with aiohttp.ClientSession() as session:
        jsonData["token"] = token
        jsonData["user_id"] = user_id
        # jsonData["product_id"] = "xxxx"  # 写死
        async with session.post(
            BASE_URL + END_POINT_URL_FOR_PRODUCT_3, json=jsonData
        ) as response:
            res_js = await response.json()
            data = res_js.get("data", {})
            print("res_js", res_js)

            return web.json_response(res_js)

@server.PromptServer.instance.routes.post(END_POINT_URL_FOR_PRODUCT_4)
async def toggleAuthor(req):
    jsonData = await req.json()
    async with aiohttp.ClientSession() as session:
        jsonData["token"] = token
        jsonData["user_id"] = user_id
        async with session.post(
            BASE_URL + END_POINT_URL_FOR_PRODUCT_4, json=jsonData
        ) as response:
            res_js = await response.json()
            data = res_js.get("data", {})
            print("res_js", res_js)

            return web.json_response(res_js)
        
@server.PromptServer.instance.routes.post(END_POINT_URL_FOR_PRODUCT_5)
async def toggleDistribution(req):
    jsonData = await req.json()
    async with aiohttp.ClientSession() as session:
        jsonData["token"] = token
        jsonData["user_id"] = user_id
        async with session.post(
            BASE_URL + END_POINT_URL_FOR_PRODUCT_5, json=jsonData
        ) as response:
            res_js = await response.json()
            data = res_js.get("data", {})
            print("res_js", res_js)

            return web.json_response(res_js)
        
@server.PromptServer.instance.routes.post(END_POINT_FILE_IS_EXITS)
async def checkFileIsExits(req):
    # 获取请求数据
    jsonData = await req.json()

    # 获取文件路径参数
    file_path = jsonData.get("file_path")
    if not file_path:
        return web.json_response({"success": False, "errMsg": "文件路径不能为空"})
    abs_file_path = os.path.join(
            find_project_root(),file_path
        )
    # 检查文件是否存在
    file_exists = os.path.exists(abs_file_path)

    # 返回结果
    return web.json_response({
        "success": True,
        "fileExists": file_exists
    })

@server.PromptServer.instance.routes.post(END_POINT_GET_WORKFLOW)
async def getWorkflowJson(req):
    # 获取请求数据
    jsonData = await req.json()

    # 获取工作流ID参数
    workflow_id = jsonData.get("workflow_id")
    if not workflow_id:
        return web.json_response({"success": False, "errMsg": "工作流ID不能为空"})

    # 构建工作流文件的绝对路径
    base_dir = os.path.abspath(os.path.join(find_project_root(), "custom_nodes", "ComfyUI_bxj", "config", "json", "workflow"))
    abs_file_path = os.path.join(base_dir, f"{workflow_id}.json")

    # 防止路径遍历攻击，确保文件在允许的目录下
    abs_file_path = os.path.abspath(abs_file_path)
    if not abs_file_path.startswith(base_dir):
        return web.json_response({"success": False, "errMsg": "非法的文件路径"})

    # 检查文件是否存在
    if not os.path.exists(abs_file_path):
        return web.json_response({"success": False, "errMsg": "工作流文件不存在"})

    # 读取文件内容
    try:
        with open(abs_file_path, 'r', encoding='utf-8') as f:
            workflow_data = json.load(f)
    except Exception as e:
        return web.json_response({"success": False, "errMsg": f"读取工作流文件时出错：{str(e)}"})

    # 返回工作流数据
    return web.json_response({
        "success": True,
        "workflow": workflow_data
    })

@server.PromptServer.instance.routes.post(END_POINT_DELETE_FILE)
async def deleteFile(req):
    # 获取请求数据
    jsonData = await req.json()

    # 获取文件路径参数
    file_path = jsonData.get("file_path")
    if not file_path:
        return web.json_response({"success": False, "errMsg": "文件路径不能为空"})

    # 构建绝对文件路径
    abs_file_path = os.path.abspath(os.path.join(find_project_root(), file_path))

    # 检查文件是否存在
    if os.path.exists(abs_file_path):
        try:
            # 尝试删除文件
            os.remove(abs_file_path)
            return web.json_response({"success": True, "message": "文件删除成功"})
        except Exception as e:
            # 处理删除文件时的异常
            return web.json_response({"success": False, "errMsg": f"删除文件时出错：{str(e)}"})
    else:
        return web.json_response({"success": False, "errMsg": "文件不存在"})

# 前端直传有跨域问题，暂时不知道咋解决，先传给python端。
# 前端直传接口已预留，后续如果通过扩展存储可以解决跨域问题，直接用，否则这里加上传扩展存储
@server.PromptServer.instance.routes.post(END_POINT_URL3)
async def uploadFile(req):
    try:
        # 提取 multipart 数据
        reader = await req.multipart()

        # 读取文件数据
        field = await reader.next()
        if not field or field.name != "file":
            return web.Response(status=400, text="Missing file field")

        # 使用时间戳生成文件名
        timestamp = int(time.time())
        original_filename = field.filename or "uploaded_image.png"
        filename = f"{timestamp}_{original_filename}"

        # 暂存到 input 文件夹
        os.makedirs(media_save_dir, exist_ok=True)  # 确保目录存在
        temp_path = os.path.join(media_save_dir, filename)

        # 读取传输的数据
        base64_data = b""
        while True:
            chunk = await field.read_chunk()
            if not chunk:
                break
            base64_data += chunk

        # 检查数据是否为 Base64 格式
        base64_data_str = base64_data.decode("utf-8")
        if base64_data_str.startswith("data:image"):
            # 去掉 Base64 前缀（如 `data:image/png;base64,`）
            base64_data_str = base64_data_str.split(",")[1]

        try:
            # 解码 Base64 数据为二进制
            binary_data = base64.b64decode(base64_data_str)
        except Exception as e:
            return web.Response(status=400, text=f"Invalid Base64 data: {str(e)}")

        # 保存解码后的二进制文件到本地
        with open(temp_path, "wb") as f:
            f.write(binary_data)

        print(f"文件已成功保存到本地: {temp_path}")

        # 验证文件是否为有效图片（可选）
        if not temp_path.lower().endswith(
            (".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp")
        ):
            return web.Response(status=400, text="Unsupported file type")

        # 上传到远程存储服务
        async with aiohttp.ClientSession() as session:
            upload_url = f"{BASE_URL}{END_POINT_URL3}"  # 替换为实际上传接口
            payload = {
                "imageBase": base64_data_str,  # 传递原始的 Base64 数据
                "filename": filename,
            }
            headers = {"Authorization": f"Bearer {token}"}

            async with session.post(
                upload_url, json=payload, headers=headers
            ) as response:
                if response.status == 200:
                    res_js = await response.json()
                    uploaded_url = res_js.get("data", {}).get("tempUrl")
                    fileID = res_js.get("data", {}).get("fileID")

                    if uploaded_url:
                        # 返回格式化的响应
                        return web.json_response(
                            {"type": "images", "url": fileID, "url_temp": uploaded_url}
                        )
                    else:
                        return web.Response(
                            status=500, text="Failed to retrieve uploaded URL"
                        )
                else:
                    error_text = await response.text()
                    return web.Response(
                        status=response.status, text=f"Upload failed: {error_text}"
                    )

    except Exception as e:
        print(f"错误: {str(e)}")
        return web.Response(status=500, text=f"Internal server error: {str(e)}")


@server.PromptServer.instance.routes.post(END_POINT_URL1)
async def kaji_r(req):
    try:
        # 获取请求体中的 JSON 数据
        jsonData = await req.json()
        logging.info(f"收到的请求数据: {jsonData}")

        # 提取字段
        uniqueid = jsonData.get("uniqueid")  # 从数据中直接提取 uniqueid
        workflow = jsonData.get("workflow")
        output = jsonData.get("output")

        # 检查是否缺少必要字段
        if not uniqueid:
            logging.error("请求中缺少 uniqueid 字段")
            return web.Response(status=400, text="uniqueid is missing")
        if not workflow or not output:
            logging.error("请求中缺少 workflow 或 output 字段")
            return web.Response(status=400, text="workflow or output is missing")

        # 本地保存工作流数据
        logging.info(f"正在保存工作流数据: uniqueid={uniqueid}")
        save_workflow(uniqueid, {"workflow": workflow, "output": output})

        # 重新格式化数据
        newData = reformat(jsonData)
        # 添加 token
        newData["token"] = token
        newData["user_id"] = user_id

        # logging.info(f"作品上传接口入参: {newData}")

        async with aiohttp.ClientSession() as session:
            async with session.post(
                BASE_URL + END_POINT_URL_FOR_PRODUCT_2, json=newData
            ) as response:
                try:
                    # 解析响应数据
                    res = await response.text()
                    logging.info(f"收到的响应文本: {res}")
                    res_js = json.loads(res)

                    # 获取作品 ID
                    data = res_js.get("data", {})
                    PRODUCT_ID = data.get("_id", None)
                    if PRODUCT_ID is None:
                        logging.error("未能从响应中获取 PRODUCT_ID")
                        raise ValueError("未能从响应中获取 PRODUCT_ID")

                    # 检查审核状态
                    txt_audit_status = data.get("txt_audit_status", None)
                    if txt_audit_status != 1:
                        logging.error("标题或描述审核未通过，涉嫌违规")
                        raise ValueError("标题或描述审核未通过，涉嫌违规")

                    image_audit_status = data.get("image_audit_status", None)
                    if image_audit_status != 1:
                        logging.error("图片审核未通过，涉嫌违规")
                        raise ValueError("图片审核未通过，涉嫌违规")

                    # 成功处理
                    logging.info("作品上传成功")
                    return web.json_response(res_js)
                except json.JSONDecodeError:
                    logging.error("无法解析 JSON 响应")
                    return web.Response(
                        status=response.status, text="Failed to parse JSON response"
                    )
                except ValueError as e:
                    logging.error(f"值错误: {e}")
                    return web.Response(status=400, text=str(e))
    except Exception as e:
        logging.error(f"处理请求时出错: {e}")
        return web.Response(status=500, text="Internal Server Error")


def save_workflow(uniqueid, data):
    base_path = os.path.join(
        find_project_root(), "custom_nodes/ComfyUI_bxj/config/json/"
    )

    # 检查并创建主目录
    if not os.path.exists(base_path):
        os.makedirs(base_path)

    # 保存 workflow 数据
    workflow_path = os.path.join(base_path, "workflow")
    if not os.path.exists(workflow_path):
        os.makedirs(workflow_path)
    workflow_file = os.path.join(workflow_path, f"{uniqueid}.json")
    with open(workflow_file, "w", encoding="utf-8") as f:
        json.dump(data.get("workflow", {}), f, indent=4, ensure_ascii=False)

    # 保存 output 数据
    output_path = os.path.join(base_path, "output")
    if not os.path.exists(output_path):
        os.makedirs(output_path)
    output_file = os.path.join(output_path, f"{uniqueid}.json")
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data.get("output", {}), f, indent=4, ensure_ascii=False)

    print(f"工作流数据已保存: \nWorkflow: {workflow_file}\nOutput: {output_file}")


def thread_exe():
    global is_connection
    logging.info(f"是否已连接过: {is_connection}")
    if is_connection:
        return
    is_connection = True
    logging.info(f"开启WS、环形队列")

    threading.Thread(target=start_websocket_thread, args=(1,), daemon=True).start()
    threading.Thread(target=start_websocket_thread, args=(2,), daemon=True).start()
    executor.submit(run_task_with_loop, task_generate)


def run_task_with_loop(task, *args, **kwargs):
    while True:
        task(*args, **kwargs)


def task_generate():
    try:
        task_data = gc_task_queue.get(timeout=300)
        if "data" in task_data and isinstance(task_data["data"], dict):
            executor.submit(run_gc_task, task_data["data"])
            gc_task_queue.task_done()
        else:
            logging.error(f"任务数据格式不正确: {task_data}")
    except queue.Empty:
        print("没有可用的任务，继续等待...")
    except Exception as e:
        print(f"发生错误: {e}")
        traceback.print_exc()


async def send_prompt_to_comfyui(prompt, client_id, workflow=None):
    comfyui_address = get_comfyui_address()

    data = {
        "prompt": prompt,
        "client_id": client_id,
    }
    logging.info(f"发送到 ComfyUI 的 prompt 数据: {data}")
    if workflow and "extra_data" in workflow:
        data["extra_data"] = workflow["extra_data"]

    logging.info(f"核心接口 /prompt的接口入参: {data}")
    async with aiohttp.ClientSession() as session:
        async with session.post(f"{comfyui_address}/prompt", json=data) as response:
            if response.status == 200:
                response_json = await response.json()
                logging.info(f"核心接口 /prompt的接口出参: {response_json}")
                return response_json
            else:
                error_text = await response.text()
                logging.error(
                    f"发送prompt失败，状态码: {response.status}, 错误信息: {error_text}"
                )
                return None


async def get_queue_from_comfyui():
    comfyui_address = get_comfyui_address()

    # 构建请求的 URL
    url = f"{comfyui_address}/queue"
    logging.info(f"请求 ComfyUI 的队列详情: {url}")

    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                response_json = await response.json()
                logging.info(f"/queue 接口出参: {response_json}")
                return response_json
            else:
                error_text = await response.text()
                logging.error(
                    f"获取队列失败，状态码: {response.status}, 错误信息: {error_text}"
                )
                return None


async def get_remaining_from_comfyui():
    comfyui_address = get_comfyui_address()

    # 构建请求的 URL
    url = f"{comfyui_address}/prompt"
    logging.info(f"请求 ComfyUI 的队列大小: {url}")

    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                response_json = await response.json()
                logging.info(f"/prompt 接口出参: {response_json}")
                return response_json
            else:
                error_text = await response.text()
                logging.error(
                    f"获取队列大小失败，状态码: {response.status}, 错误信息: {error_text}"
                )
                return None


@DeprecationWarning
async def wait_for_generation(prompt_id, max_retries=30, retry_delay=1):
    comfyui_address = get_comfyui_address()
    retries = 0
    async with aiohttp.ClientSession() as session:
        while retries < max_retries:
            try:
                async with session.get(
                    f"{comfyui_address}/history/{prompt_id}"
                ) as response:
                    if response.status == 200:
                        history = await response.json()
                        if prompt_id in history:
                            status = history[prompt_id]["status"]["status"]
                            if status == "completed":
                                print(f"生成完成，prompt_id: {prompt_id}")
                                return history[prompt_id]
                            elif status == "error":
                                print(f"生成失败，prompt_id: {prompt_id}")
                                return None
                            else:
                                print(f"生成中，状态: {status}，prompt_id: {prompt_id}")
                        else:
                            print(f"历史记录中未找到 prompt_id: {prompt_id}，等待中...")
                    else:
                        print(f"获取历史记录失败，状态码: {response.status}")
            except Exception as e:
                print(f"等待生成时发生错误: {str(e)}")

            retries += 1
            await asyncio.sleep(retry_delay)

    print(f"达到最大重试次数，prompt_id: {prompt_id}")
    return None


async def get_generated_image_by_id(session, prompt_id):
    comfyui_address = get_comfyui_address()
    async with session.get(f"{comfyui_address}/history/{prompt_id}") as response:
        if response.status == 200:
            history = await response.json()
            outputs = history[prompt_id]["outputs"]
            if outputs:
                # 假设我们只关心第一个输出的第一张图片
                first_output = outputs[0]
                if "images" in first_output and first_output["images"]:
                    image_filename = first_output["images"][0]["filename"]
                    # 获取图像数据
                    async with session.get(
                        f"{comfyui_address}/view?filename={image_filename}"
                    ) as img_response:
                        if img_response.status == 200:
                            return await img_response.read()


async def get_generated_image(filename):
    comfyui_address = get_comfyui_address()
    async with aiohttp.ClientSession() as session:
        async with session.get(
            f"{comfyui_address}/view?filename={filename}"
        ) as img_response:
            if img_response.status == 200:
                image_content = await img_response.read()
                logging.info("获取本地的图片结果，并传到云端")
                # todo https://doc.dcloud.net.cn/uniCloud/ext-storage/dev.html#q3
                # 上传到扩展存储。1：获取前端上传参数（地址和token），2：然后上传
                imageBase = base64.b64encode(image_content).decode("utf-8")
                async with session.post(
                    BASE_URL + END_POINT_URL3, json={"imageBase": imageBase}
                ) as upload_response:
                    if upload_response.status == 200:
                        result = await upload_response.json()
                        logging.info(f"生产成功，返回值: {result}")
                        return result.get("data").get("tempUrl")


def run_gc_task(task_data):
    asyncio.run(run_gc_task_async(task_data))


def validate_prompt(prompt):
    for node_id, node_data in prompt.items():
        if "class_type" not in node_data:
            logging.error(f"节点 {node_id} 缺少 class_type 属性")
            return False
    return True


async def run_gc_task_async(task_data):
    try:
        logging.info(f"工作队列获取任务-开始执行: {task_data}")
        if (
            "client_id" not in task_data
            or "prompt" not in task_data
            or "kaji_generate_record_id" not in task_data
        ):
            logging.error(f"任务数据不完整: {task_data}")
            return
        prompt = task_data["prompt"]
        client_id = task_data["client_id"]
        kaji_generate_record_id = task_data["kaji_generate_record_id"]

        if not validate_prompt(prompt):
            logging.error("prompt 数据无效")
            return

        result = await send_prompt_to_comfyui(prompt, client_id)
        if result and "prompt_id" in result:
            prompt_id = result["prompt_id"]

            cur_queue_info = await find_prompt_status(prompt_id)
            logging.info(f"立即获取当前任务的排队状态： {cur_queue_info}")
            # 排队0人：代表此前空闲，将会立即开始

            # 本地维护关系
            bd.add(kaji_generate_record_id, prompt_id)
            # 存储到云端，表明此生图任务提交成功，让服务端等待这个prompt_id最终结果(任务生图进度的数据发不发，会根据本地保存的prompt_id对应的前端用户ws)

            # 服务器也维护关系
            submit_success = {
                "type": "submit_success",
                "data": {
                    "kaji_generate_record_id": kaji_generate_record_id,
                    "prompt_id": prompt_id,
                    "cur_q": cur_queue_info.get("cur_q"),
                },
            }
            await wss_c1.send(json.dumps(submit_success))
            logging.info(f"任务成功提交，prompt_id: {result['prompt_id']}")
        else:
            logging.error("任务提交失败")

    except Exception as e:
        logging.error(f"执行任务时发生错误: {str(e)}")
        logging.error("详细错误信息:", exc_info=True)


# 添加任务到队列的函数
def add_task_to_queue(task_data):
    gc_task_queue.put(task_data)
    print("任务(包含工作流的数据)添加至工作队列。")


async def download_media_async(url, save_dir):
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                if response.status != 200:
                    logging.error(f"下载媒体文件失败: {url}, 状态码: {response.status}")
                    return None

                # 从 Content-Type 或 URL 中获取文件扩展名
                content_type = response.headers.get("content-type")
                extension = (
                    mimetypes.guess_extension(content_type) or os.path.splitext(url)[1]
                )
                if not extension:
                    extension = ".bin"

                # 生成唯一文件名
                filename = f"{os.urandom(8).hex()}{extension}"
                save_path = os.path.join(save_dir, filename)

                # 确保保存目录存在
                os.makedirs(save_dir, exist_ok=True)

                # 写入文件
                with open(save_path, "wb") as file:
                    while chunk := await response.content.read(8192):
                        file.write(chunk)

                print(f"媒体文件已成功下载到: {save_path}")
                return save_path
    except Exception as e:
        logging.error(f"下载媒体文件时发生错误: {e}")
        return None


async def download_all_media(form_data):
    download_tasks = []

    for key, value in form_data.items():
        # 如果字段包含 URL，则创建下载任务
        if isinstance(value, dict) and "url" in value:
            url = value["url"]
            download_tasks.append(download_media_async(url, media_save_dir))

    # 等待所有任务完成
    downloaded_paths = await asyncio.gather(*download_tasks)
    return downloaded_paths


def update_output_from_form_data(form_data, output, downloaded_paths):
    download_index = 0

    for key, value in form_data.items():
        # 分解 key，"KSampler:sampler_name" -> ["KSampler", "sampler_name"]
        key_parts = key.split(":")
        if not key_parts:
            continue

        # 找到对应的 output 项
        output_item = None
        for output_key, output_value in output.items():
            if output_value["class_type"] == key_parts[0]:
                output_item = output_value
                break

        if not output_item:
            logging.warning(f"未找到匹配的 class_type: {key_parts[0]}，跳过 {key}")
            continue

        # 定位到 inputs 部分，根据后续的 key_parts 更新字段
        current = output_item.get("inputs", {})
        for part in key_parts[1:-1]:
            current = current.setdefault(part, {})

        # 如果是媒体文件，替换为本地路径
        if isinstance(value, dict) and "url" in value:
            local_path = downloaded_paths[download_index]
            download_index += 1
            if local_path:
                current[key_parts[-1]] = os.path.basename(local_path)  # 更新为文件名
            else:
                logging.error(f"媒体文件下载失败: {value['url']}")
        else:
            # 直接更新字段
            current[key_parts[-1]] = value


async def deal_recv_generate_data(recv_data):
    # 获取 uniqueid 和任务 ID
    uniqueid = recv_data["uniqueid"]
    kaji_generate_record_id = recv_data["kaji_generate_record_id"]
    form_data = recv_data["formData"]

    # 从 uniqueid 加载对应的 output
    output = get_output(uniqueid + ".json")

    # 等待下载所有媒体文件才难生成
    # 下载失败或其他插件端生成异常，如果没有同步到生成失败的状态去退款，可能需要一个统一的超时处理执行退款等炒作
    downloaded_paths = await download_all_media(form_data)

    # 更新 output 数据
    update_output_from_form_data(form_data, output, downloaded_paths)

    # 预处理并继续后续操作
    pre_process_data(kaji_generate_record_id, output)


def pre_process_data(kaji_generate_record_id, output):
    try:
        # 通过查看comfyui原生缓存机制定位到，调用prompt接口不会自动修改Ksample中的随机种子值，导致走了缓存逻辑，所以直接跳过了所有步骤。
        # （缓存机制在execution.py-->execute函数-->recursive_output_delete_if_changed函数）
        # 这里手动重置随机种子值
        for item in output.values():
            if item.get("class_type") == "KSampler":
                # 这个随机数只需要和上次生图不一样就行，seed的位数为15位
                item["inputs"]["seed"] = random.randint(10**14, 10**15 - 1)

        # 使用收到的输入数据生图
        # 准备任务数据
        task_data = {
            "type": "prompt_queue",
            "data": {
                "kaji_generate_record_id": kaji_generate_record_id,
                "client_id": cur_client_id,
                "prompt": output,
            },
        }
        # 将任务添加到队列
        add_task_to_queue(task_data)

    except Exception as e:
        print(f"处理数据时发生错误: {e}")


def get_output(uniqueid, path="json/output/"):
    output = read_json_from_file(uniqueid, path, "json")
    if output is not None:
        return output
    return None


def get_workflow(uniqueid, path="json/workflow/"):
    workflow = read_json_from_file(uniqueid, path, "json")
    if workflow is not None:
        return {"extra_data": {"extra_pnginfo": {"workflow": workflow}}}
    return None


def read_json_from_file(name, path="json/", type_1="json"):
    base_url = find_project_root() + "custom_nodes/ComfyUI_bxj/config/" + path
    if not os.path.exists(base_url + name):
        return None
    with open(base_url + name, "r") as f:
        data = f.read()
        if data == "":
            return None
        if type_1 == "json":
            try:
                data = json.loads(data)
                return data
            except ValueError as e:
                return None
        if type_1 == "str":
            return data


def find_project_root():
    script_directory = os.path.dirname(os.path.abspath(__file__))
    relative_path = script_directory + "../../../"
    absolute_path = os.path.abspath(relative_path)
    if not absolute_path.endswith(os.sep):
        absolute_path += os.sep
    return absolute_path


def thread_run():
    logging.info(f"进程启动，咔叽插件初始化：开启WS、队列消费")
    threading.Thread(target=start_websocket_thread, args=(1,), daemon=True).start()
    threading.Thread(target=start_websocket_thread, args=(2,), daemon=True).start()
    executor.submit(run_task_with_loop, task_generate)
    pass
