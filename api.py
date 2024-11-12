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
# TEST_UID = "66c981879d9f915ad268680a"
media_save_dir = ".../../input"
media_output_dir = ".../../output"
is_connection = False
wss_c1 = None
wss_c2 = None
last_value = None
last_time = None
RECONNECT_DELAY = 1
MAX_RECONNECT_DELAY = 3
MAX_RECONNECT_ATTEMPTS = 10
HEART_INTERVAL = 30
gc_task_queue = queue.Queue()
ws_task_queue = queue.Queue()


def download_media(url, save_dir):
    try:
        # 发送 GET 请求获取内容
        response = requests.get(url, stream=True)
        response.raise_for_status()  # 如果请求不成功则抛出异常

        # 从 Content-Type 或 URL 中获取文件扩展名
        content_type = response.headers.get("content-type")
        extension = mimetypes.guess_extension(content_type) or os.path.splitext(url)[1]
        if not extension:
            extension = ".bin"  # 如果无法确定扩展名，使用 .bin

        # 生成唯一的文件名
        filename = f"{os.urandom(8).hex()}{extension}"
        save_path = os.path.join(save_dir, filename)

        # 确保保存目录存在
        os.makedirs(save_dir, exist_ok=True)

        # 以二进制写模式打开文件，并写入内容
        with open(save_path, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)

        print(f"媒体文件已成功下载到: {save_path}")
        return save_path
    except requests.exceptions.RequestException as e:
        print(f"下载媒体文件时发生错误: {e}")
        return None


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


def generate_unique_hash(mac_address, port):
    uid = f"{mac_address}:{port}"
    # logging.info(f"mac_address:port =》 {uid}")
    hashValue = hashlib.sha256(uid.encode())
    return hashValue.hexdigest()


args = parse_args()
cur_client_id = f"{str(uuid.uuid4())}:{parse_port_from_args(args)}"
cfy_ws_url = "ws://{}:{}/ws?clientId={}".format(
    get_address_from_args(args), parse_port_from_args(args), cur_client_id
)

uni_hash = generate_unique_hash(get_mac_address(), get_port_from_cmd())
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
    image_base = uploadData.get("imageBase")
    if not image_base:
        raise ValueError("uploadData 中缺少 imageBase 键")
    proj_root = get_comfy_root()
    image_path = os.path.join(proj_root, "input", image_base)
    if is_image_file(image_path):
        with open(image_path, "rb") as img_file:
            image_content = img_file.read()

        # uploadData["imageBase"] = base64.b64encode(image_content).decode("utf-8")
        # print("imageBase 已成功替换为文件内容")

        # 所有待上传的图片或视频，单独上传，并获取fileId+url；暂时这里只有一张，后续可能会有多张图片和视频
        # 改为七牛云-扩展存储后。直接下载七牛云的 SDK 来上传到 OSS
        # 客户端上传文件到云函数、云函数再上传文件到云存储，这样的过程会导致文件流量带宽耗费较大。所以一般上传文件都是客户端直传。（且云函数的请求体大小限制2M）

        media_urls = [
            {
                "type": "images",
                "url": "cloud://env-00jxh693vso2/1731033595419.jpeg",
                "url_temp": "https://env-00jxh693vso2.normal.cloudstatic.cn/1731033595419.jpeg?expire_at=1731034196&er_sign=3f6fb944df7fd893e4a9c147e2c1b389",
            }
        ]
        uploadData["media_urls"] = media_urls

        uploadData["uni_hash"] = uni_hash
        uploadData["inputTypeArr"] = getInputTypeArr(uploadData.get("output"))
        uploadData.pop("output", None)
        uploadData.pop("workflow", None)
    else:
        raise FileNotFoundError(f"图片文件不存在或无效: {image_path}")

    return uploadData


# 插件端与服务器端的心跳。理论上，初始化一次，任务变动（新增+1、完成-1）时触发一次。就可以。 其余时刻发送（数据都是重复）是多余的（网络探活不靠这个）
async def send_heartbeat(websocket):
    while True:
        try:
            payload = {
                "type": "ping",
                "data": {
                    "uni_hash": uni_hash,
                    "queue_size": 5,  # 队列具体情况 todo写死先
                    "uniqueids": [
                        "m384phoac3oapxvhv3b"
                    ],  # 本地正在运行的工作流标识列表 todo写死先
                },
            }
            heartbeat_message = json.dumps(payload)
            await websocket.send(heartbeat_message)
            print("Sent heartbeat")

        except Exception as e:
            print(f"Error sending heartbeat or no response: {e}")

        await asyncio.sleep(HEART_INTERVAL)

async def receive_messages(websocket, c_flag):
    try:
        while True:
            try:
                message = await websocket.recv()
                if c_flag == 1:
                    print(f"接收支付宝云端ws事件数据: {message}")
                    await process_server_message1(message)
                elif c_flag == 2:
                    print(f"接收comfyUI的生图任务信息: {message}")
                    await process_server_message2(message)

            except asyncio.CancelledError:
                print("Task was cancelled during recv.")
                break
    except Exception as e:
        print(f"Error in receiving messages 代码异常，必须处理: {e}")
        raise e


async def handle_websocket(c_flag, reconnect_attempts=0):
    global wss_c1, wss_c2
    if c_flag == 1:
        url = await get_wss_server_url()
        print(f"websocket connected to WebSocket server at {url}")
    elif c_flag == 2:
        url = cfy_ws_url
    else:
        raise ValueError("无效的 c_flag 值")
    logging.info(f"当前url: {url}")
    reconnect_delay = RECONNECT_DELAY
    while True:
        print(f"ws{c_flag} 开始发起连接")
        try:
            async with websockets.connect(url) as websocket:
                print(f"ws{c_flag} 连接成功！~")
                reconnect_delay = RECONNECT_DELAY
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
            print(f"WebSocket connection closed: {c_flag},{e}")
            await asyncio.sleep(reconnect_delay)
        except Exception as e:
            print(f"WebSocket connection error: {c_flag},{e}")
            await asyncio.sleep(reconnect_delay)
            reconnect_delay = min(reconnect_delay * 2, MAX_RECONNECT_DELAY)


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
            deal_recv_generate_data(data)

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


# 发送所有任务的排队情况
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
                "clientType": "plugin",
                "connCode": 1,
            },
        }
        await wss_c1.send(json.dumps(executed_success))
    elif message_type == "execution_success":
        # 该任务所有节点完成，任务也完成。此时可以通知下
        prompt_id = message_json["data"]["prompt_id"]
        bd.remove_value(prompt_id)

        # 这里也可以用来记录生图全耗时、（生图开始 - 生图开始）
        timestamp = message_json["data"]["timestamp"]

        await update_all_prompt_status()
    elif message_type == "execution_error":
        print(f"执行错误: {message_json}")
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


@server.PromptServer.instance.routes.post(END_POINT_URL1)
async def kaji_r(req):
    jsonData = await req.json()
    async with aiohttp.ClientSession() as session:
        oldData = jsonData.get("uploadData")
        if oldData:
            uniqueid = oldData.get("uniqueid")  # 从上传数据中提取uniqueid
            if uniqueid:
                # 本地保存工作流数据
                workflow = oldData.get("workflow")
                output = oldData.get("output")
                save_workflow(uniqueid, {"workflow": workflow, "output": output})

                newData = reformat(oldData)

                # 有 id 说明是更新作品
                newData["product_id"] = "672b821f31c9b7c2eecb13dd"
                newData["token"] = (
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NmM5ODE4NzlkOWY5MTVhZDI2ODY4MGEiLCJyb2xlIjpbImFkbWluIl0sInBlcm1pc3Npb24iOltdLCJ1bmlJZFZlcnNpb24iOiIxLjAuMTciLCJpYXQiOjE3MzE0MjAyMjUsImV4cCI6MTczMTQyNzQyNX0.mkxso5vSe8K9l_O-aERavztY8veYqH_LyJXk8tbq1Ro"
                )
                logging.info(f"作品上传接口入参:{newData}")

            async with session.post(
                BASE_URL + END_POINT_URL_FOR_PRODUCT_2, json=newData
            ) as response:
                try:
                    res = await response.text()
                    res_js = json.loads(res)
                    print("res_js", res_js)

                    data = res_js.get("data", {})
                    PRODUCT_ID = data.get("_id", None)
                    if PRODUCT_ID is None:
                        raise ValueError("未能从响应中获取 PRODUCT_ID")

                    txt_audit_status = data.get("txt_audit_status", None)
                    if txt_audit_status != 1:
                        raise ValueError("标题或描述审核未通过，涉嫌违规")

                    image_audit_status = data.get("image_audit_status", None)
                    if image_audit_status != 1:
                        raise ValueError("图片审核未通过，涉嫌违规")

                    # thread_exe()
                    return web.json_response(res_js)
                except json.JSONDecodeError:
                    return web.Response(
                        status=response.status, text="uniqueid is missing"
                    )
        else:
            return web.Response(status=400, text="uploadData is missing")


def save_workflow(uniqueid, data):
    base_path = find_project_root() + "custom_nodes/ComfyUI_Bxj/config/json/"

    # 保存workflow
    workflow_path = os.path.join(base_path, "workflow")
    if not os.path.exists(workflow_path):
        os.makedirs(workflow_path)
    workflow_file = os.path.join(workflow_path, f"{uniqueid}.json")
    with open(workflow_file, "w") as f:
        json.dump(data["workflow"], f, indent=4)

    # 保存output
    output_path = os.path.join(base_path, "output")
    if not os.path.exists(output_path):
        os.makedirs(output_path)
    output_file = os.path.join(output_path, f"{uniqueid}.json")
    with open(output_file, "w") as f:
        json.dump(data["output"], f, indent=4)

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
    logging.info(f"请求 ComfyUI 的队列数据: {url}")

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


def deal_recv_generate_data(recv_data):
    # 本地将会有多个uniqueid（对应创作者服务端上的不同作品）
    uniqueid = recv_data["uniqueid"]
    kaji_generate_record_id = recv_data["kaji_generate_record_id"]

    output = get_output(uniqueid + ".json")

    # 检查消息中是否包含 medias,获取下载的local_path路径，替换output中的图片名为图片输入
    if "medias" in recv_data:
        for media in recv_data["medias"]:
            url_temp = media["url_temp"]
            # 媒体文件下载计时
            start_time = time.time()
            local_path = download_media(url_temp, media_save_dir)
            end_time = time.time()
            duration = end_time - start_time
            print(f"媒体文件下载耗时: {duration}")
            if local_path:
                # 获取文件名及后缀
                filename = os.path.basename(local_path)
                index = media["index"]
                if index in output:
                    output[index]["inputs"]["image"] = filename
                else:
                    logging.error(f"未找到索引为 {index} 的输出项")
            else:
                logging.error(f"下载媒体失败: {url_temp}")
    # 检查消息中是否包含 texts，并添加 input_des 到 output 的相应索引
    if "texts" in recv_data:
        for text in recv_data["texts"]:
            input_des = text["input_des"]
            index = text["index"]
            if index in output:
                output[index]["inputs"]["text"] = input_des
            else:
                logging.error(f"未找到索引为 {index} 的输出项")
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
    base_url = find_project_root() + "custom_nodes/ComfyUI_Bxj/config/" + path
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
