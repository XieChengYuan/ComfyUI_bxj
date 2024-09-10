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

DEBUG = True
BASE_URL = "https://env-00jxh693vso2.dev-hz.cloudbasefunction.cn"
END_POINT_URL1 = "/kaji-upload-file/uploadProduct"
END_POINT_URL2 = "/get-ws-address/getWsAddress"
TEST_UID = "66c1f5419d9f915ad22bf864"
wss_c1 = None
RECONNECT_DELAY = 5  
MAX_RECONNECT_ATTEMPTS = 3 
HEART_INTERVAL = 300
gc_task_queue = queue.Queue()
task_status = {}

def get_comfyui_address():
    args = parse_args()
    address = get_address_from_args(args)
    port = parse_port_from_args(args)
    return f"http://{address}:{port}"

class ManagedThreadPoolExecutor(ThreadPoolExecutor):
    def __init__(self, max_workers=None, thread_name_prefix=''):
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
    
def parse_args():
    args = parser.parse_args()
    return args if args.listen else parser.parse_args([])

def get_address_from_args(args):
    return args.listen if args.listen != '0.0.0.0' else '127.0.0.1'

def parse_port_from_args(args):
    return args.port

def get_comfy_root(levels_up=2):
    current_directory = os.path.dirname(os.path.abspath(__file__))

    relative_path = os.path.join(current_directory, *['..'] * levels_up)

    proj_root = os.path.abspath(relative_path)

    if not proj_root.endswith(os.sep):
        proj_root += os.sep

    return proj_root

def reformat(uploadData):
    image_base = uploadData.get('imageBase')
    if not image_base:
        raise ValueError("uploadData 中缺少 imageBase 键")
    proj_root = get_comfy_root()
    image_path = os.path.join(proj_root, 'input', image_base)
    if is_image_file(image_path):
        with open(image_path, 'rb') as img_file:
            image_content = img_file.read()

        uploadData['imageBase'] = base64.b64encode(image_content).decode('utf-8')
        uploadData['uni_hash'] = generate_unique_hash(get_mac_address(),get_port_from_cmd())
        print("imageBase 已成功替换为文件内容")
    else:
        raise FileNotFoundError(f"图片文件不存在或无效: {image_path}")

    return uploadData

def get_mac_address() -> str:
    mac_uid = uuid.getnode()
    mac_address = ':'.join(('%012X' % mac_uid)[i:i + 2] for i in range(0, 12, 2))
    return mac_address

def get_port_from_cmd(default_port=8188):
    port = None
    def extract_port_from_arg(arg):
        match = re.search(r'--port[=\s]*(\d+)', arg)
        if match:
            return int(match.group(1))
        return None

    for i, arg in enumerate(sys.argv):
        if arg == '--port' and i + 1 < len(sys.argv):
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
    hashValue = hashlib.sha256(uid.encode())
    return hashValue.hexdigest()

async def send_heartbeat(websocket):
    while True:
        try:
            heartbeat_message = json.dumps({"type": "ping"})
            await websocket.send(heartbeat_message)
            print("Sent heartbeat")

        except Exception as e:
            print(f"Error sending heartbeat or no response: {e}")
            break  

        await asyncio.sleep(HEART_INTERVAL)

async def receive_messages(websocket):
    try:
        while True:
            try:
                message = await asyncio.wait_for(websocket.recv(), timeout=HEART_INTERVAL * 5)
                print(f"Received message from server: {message}")
                await process_server_message(websocket, message)
            except asyncio.TimeoutError:
                print("No message received within the timeout period. Reconnecting...")
                raise
            except asyncio.CancelledError:
                print("Task was cancelled during recv.")
                break
    except Exception as e:
        print(f"Error in receiving messages: {e}")

async def handle_websocket(reconnect_attempts=0):
    global wss_c1
    try:
        uri = await get_wss_server_url()  
        async with websockets.connect(uri) as websocket:
            wss_c1 = websocket
            reconnect_attempts = 0
            print(f"wss_c1 connected to WebSocket server at {uri}")
            initial_message = {
            "type": "initial_request",
            "data": {
                "uin_hash": generate_unique_hash(get_mac_address(), get_port_from_cmd()),
                "user_id": TEST_UID,
                "clientType": "plugin",
                "connCode":1
                }
            }
            await websocket.send(json.dumps(initial_message))
            tasks = [
                asyncio.create_task(receive_messages(websocket)),
                asyncio.create_task(send_heartbeat(websocket))
            ]
            await asyncio.gather(*tasks)
    except websockets.ConnectionClosedOK as e:
        print(f"WebSocket connection closed normally with code {e.code}: {e.reason}")
    except websockets.ConnectionClosedError as e:
        print(f"WebSocket connection closed with error, code {e.code}: {e.reason}")
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
    # 确保 websocket 对象在关闭连接之前被正确创建
        if websocket is not None and websocket.open:
            await on_websocket_disconnection(websocket)
        else:
            print("WebSocket object was not created successfully; skipping disconnection.")
    # 判断是否已达到最大重连次数
    if reconnect_attempts < MAX_RECONNECT_ATTEMPTS:
        print(f"Attempting to reconnect in {RECONNECT_DELAY} seconds... (Attempt {reconnect_attempts + 1}/{MAX_RECONNECT_ATTEMPTS})")
        await asyncio.sleep(RECONNECT_DELAY)
        await handle_websocket(reconnect_attempts + 1)
    else:
        print(f"Max reconnect attempts reached ({MAX_RECONNECT_ATTEMPTS}). Giving up on reconnecting.")

async def process_server_message(websocket, message):
    try:
        # 尝试将接收到的消息解析为 JSON 对象
        message_data = json.loads(message)
        
        message_type = message_data.get('type')
        data = message_data.get('data', {})

        if message_type == 'pong':
            print("连接正常")

        elif message_type == 'generate_process':
            print("收到生图消息",data)
            deal_recv_generate_data(data)

    except json.JSONDecodeError:
        print("Received non-JSON message from server.")
    except Exception as e:
        print(f"An error occurred while processing the message: {e}")

async def on_websocket_disconnection(websocket):
    if websocket is not None:
        await websocket.close()
        print("WebSocket connection has been closed.")

def start_websocket_thread():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(handle_websocket())

async def get_wss_server_url():
    async with aiohttp.ClientSession() as session:
        async with session.post(BASE_URL + END_POINT_URL2,json={}) as response:
            try:
                res = await response.json()
                wss_server_url = res.get('data')
                if not wss_server_url:
                    raise Exception("Failed to retrieve WebSocket server URL")
                return wss_server_url
            except json.JSONDecodeError:
                    return web.Response(status=response.status, text="Invalid JSON response2")   

@server.PromptServer.instance.routes.post(END_POINT_URL1)
async def kaji_r(req):
    jsonData = await req.json()
    async with aiohttp.ClientSession() as session:
        oldData = jsonData.get('uploadData')
        newData = reformat(oldData)
        if newData:
            uniqueid = newData.get('uniqueid')  # 从上传数据中提取uniqueid
            if uniqueid:
                # 保存工作流数据
                save_workflow(uniqueid, newData)
            async with session.post(BASE_URL + END_POINT_URL1, json=newData) as response:
                try:
                    res = await response.text()
                    res_js = json.loads(res)
                    if DEBUG:
                        print("res_js", res_js)      
                    thread_exe()
                    return web.json_response(res_js)
                except json.JSONDecodeError:
                    return web.Response(status=response.status, text="Invalid JSON response1")
        else:
            return web.Response(status=400, text="uploadData is missing")
        
def save_workflow(uniqueid, data):
    base_path = find_project_root() + 'custom_nodes/ComfyUI_Bxj/config/json/workflow/'
    if not os.path.exists(base_path):
        os.makedirs(base_path)
    
    file_path = os.path.join(base_path, f"{uniqueid}.json")
    
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
    
    print(f"工作流数据已保存到: {file_path}")

def thread_exe():
    threading.Thread(target=start_websocket_thread, args=(), daemon=True).start()
    executor.submit(run_task_with_loop, task_generate)

def run_task_with_loop(task, *args, **kwargs):
     while True:
        task(*args, **kwargs)

def task_generate():
    try:
        # 从队列中取任务，设置超时5秒
        cur_gc_task = gc_task_queue.get(timeout=10)
        if 'prompt_id' in cur_gc_task:
            task_status.pop(cur_gc_task['prompt_id'], None)
            executor.submit(run_gc_task, cur_gc_task['prompt_id'])
            gc_task_queue.task_done()
    except queue.Empty:
        # 队列5秒内没有任务，继续等待
        print("No tasks available, continuing...")
    except Exception as e:
        print(f"An error occurred: {e}")
        traceback.print_exc()  

async def send_prompt_to_comfyui(api_data):
    async with aiohttp.ClientSession() as session:
        comfyui_address = get_comfyui_address()
        async with session.post(f'{comfyui_address}/prompt', json=api_data) as response:
            if response.status == 200:
                result = await response.json()
                prompt_id = result.get('prompt_id')
                # 等待图像生成完成
                await wait_for_generation(prompt_id)
                # 获取生成的图像
                image_data = await get_generated_image(prompt_id)
                if image_data:
                    # 这里可以添加将图像保存到文件或发送到其他服务的逻辑
                    print(f"图像生成成功,prompt_id: {prompt_id}")
                    # 例如: await save_image(image_data, f"generated_{prompt_id}.png")
                else:
                    print("图像生成失败或未找到")
            else:
                print(f"API请求失败,状态码: {response.status}")

async def wait_for_generation(session, prompt_id):
    comfyui_address = get_comfyui_address()
    while True:
        async with session.get(f'{comfyui_address}/history/{prompt_id}') as response:
            if response.status == 200:
                history = await response.json()
                if history[prompt_id]['status']['status'] == 'completed':
                    break
        await asyncio.sleep(1)

async def get_generated_image(session, prompt_id):
    comfyui_address = get_comfyui_address()
    async with session.get(f'{comfyui_address}/history/{prompt_id}') as response:
        if response.status == 200:
            history = await response.json()
            outputs = history[prompt_id]['outputs']
            if outputs:
                # 假设我们只关心第一个输出的第一张图片
                first_output = outputs[0]
                if 'images' in first_output and first_output['images']:
                    image_filename = first_output['images'][0]['filename']
                    # 获取图像数据
                    async with session.get(f'{comfyui_address}/view?filename={image_filename}') as img_response:
                        if img_response.status == 200:
                            return await img_response.read()

def run_gc_task():
    asyncio.run(run_gc_task_async())

async def run_gc_task_async():
    try:
        task = gc_task_queue.get(timeout=10)
        if task['type'] == 'prompt_queue':
            prompt = task['data']['prompt']
            client_id = task['data']['client_id']
            
            api_data = {
                "prompt": prompt,
                "client_id": client_id
            }
            
            result = await send_prompt_to_comfyui(api_data)
            if result:
                print("prompt任务成功完成")
            else:
                print("prompt任务执行失败")
        
        gc_task_queue.task_done()
        
    except queue.Empty:
        print("队列中没有任务")
    except Exception as e:
        print(f"执行任务时发生错误: {e}")
   
# 任务添加函数（生产者）
def add_task_to_queue(task_data):
    # 将任务放入队列
    gc_task_queue.put(task_data)
    print(f"Task added to queue: {task_data}")

def deal_recv_generate_data(recv_data):
    uniqueid = recv_data['uniqueid']
    output = get_output(uniqueid + '.json')
    workflow = get_workflow(uniqueid + '.json')
    if output:
            executor.submit(run_prompt_task, output, workflow)
    else:
        add_task_to_queue({
            "type": "prompt_error",
            "data": {
                'uniqueid': uniqueid,
                'msg': '作品工作流找不到了',
                'error_code':1
            }
        })

def run_prompt_task(output,workflow):
    return asyncio.run(pre_process_data(output,workflow))

async def pre_process_data(output,workflow):
   try:
        # 合并输出和工作流数据
        prompt = {**output, **workflow}
        # 生成唯一的客户端ID
        client_id = str(uuid.uuid4())
        # 准备任务数据
        task_data = {
            "type": "prpmpt_queue",
            "data": {
                "client_id": client_id,
                "prompt": prompt 
            }
        }
        # 将任务添加到队列
        add_task_to_queue(task_data)
        print(f"任务已添加到队列,client_id: {client_id}")
        
   except Exception as e:
        print(f"处理数据时发生错误: {e}")
        
def get_output(uniqueid, path='json/api/'):
    output = read_json_from_file(uniqueid, path,'json')
    if output is not None:
        return output
    return None

def get_workflow(uniqueid, path='json/workflow/'):
    workflow = read_json_from_file(uniqueid, path,'json')
    if workflow is not None:
        return {
            'extra_data': {
                'extra_pnginfo': {
                    'workflow': workflow
                }
            }
        }
    return None
   
def read_json_from_file(name, path='json/', type_1='json'):
    base_url = find_project_root()+'custom_nodes/ComfyUI_Bxj/config/' + path
    if not os.path.exists(base_url + name):
        return None
    with open(base_url + name, 'r') as f:
        data = f.read()
        if data == '':
            return None
        if type_1 == 'json':
            try:
                data = json.loads(data)
                return data
            except ValueError as e:
                return None
        if type_1 == 'str':
            return data
        
def find_project_root():
    script_directory = os.path.dirname(os.path.abspath(__file__))
    relative_path = script_directory + '../../../'
    absolute_path = os.path.abspath(relative_path)
    if not absolute_path.endswith(os.sep):
        absolute_path += os.sep
    return absolute_path



    