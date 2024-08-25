import os
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

DEBUG = True
BASE_URL = "https://env-00jxh693vso2.dev-hz.cloudbasefunction.cn"
END_POINT_URL = "/kaji-upload-file/uploadProduct"
TEST_UID = "66c1f5419d9f915ad22bf864"
RECONNECT_DELAY = 5  
MAX_RECONNECT_ATTEMPTS = 3 


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
        uploadData['uni_hash'] = generate_unique_hash(get_mac_address(),get_port())
        print("imageBase 已成功替换为文件内容")
    else:
        raise FileNotFoundError(f"图片文件不存在或无效: {image_path}")

    return uploadData

def get_mac_address() -> str:
    mac_uid = uuid.getnode()
    mac_address = ':'.join(('%012X' % mac_uid)[i:i + 2] for i in range(0, 12, 2))
    return mac_address

def get_port(default_port=8188):
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

# 示例：WebSocket 心跳消息发送函数
async def send_heartbeat(websocket):
    while True:
        try:
            heartbeat_message = json.dumps({"type": "ping"})
            await websocket.send(heartbeat_message)
            print("Sent heartbeat")
        except Exception as e:
            print(f"Error sending heartbeat: {e}")
            break
        await asyncio.sleep(60) 

async def handle_websocket(uri, reconnect_attempts=0):
    try:
        async with websockets.connect(uri) as websocket:
            print(f"Connected to WebSocket server at {uri}")
            initial_message = {
            "type": "initial_request",
            "data": {
                "uin_hash": generate_unique_hash(get_mac_address(), get_port()),
                "user_id": TEST_UID,
                "clientType": "plugin"
                }
            }
            # 发送初始化消息
            await websocket.send(json.dumps(initial_message))

            # 开始一个心跳检测的任务
            asyncio.create_task(send_heartbeat(websocket))
            
            # 循环处理接收到的每一条消息
            async for message in websocket:
                print(f"Received message from server: {message}")
                await process_server_message(message)

    except websockets.ConnectionClosed as e:
        print(f"WebSocket connection closed with code {e.code}: {e.reason}")
    except Exception as e:
        print(f"WebSocket error: {e}")
    
    # 执行断开连接后的逻辑，例如资源清理或通知客户端
    await on_websocket_disconnection()

    # 判断是否已达到最大重连次数
    if reconnect_attempts < MAX_RECONNECT_ATTEMPTS:
        print(f"Attempting to reconnect in {RECONNECT_DELAY} seconds... (Attempt {reconnect_attempts + 1}/{MAX_RECONNECT_ATTEMPTS})")
        await asyncio.sleep(RECONNECT_DELAY)
        await handle_websocket(uri, reconnect_attempts + 1)
    else:
        print(f"Max reconnect attempts reached ({MAX_RECONNECT_ATTEMPTS}). Giving up on reconnecting.")

async def process_server_message(message):
    # 在这里处理从服务器接收到的消息
    print(f"Processing server message: {message}")
    try:
        message_data = json.loads(message)
        if message_data.get('type') == 'pong':
            print("连接正常")
        elif message_data.get('type') == 'generate_process':
            print("收到生图消息")
    except json.JSONDecodeError:
        print("Received non-JSON message from server.")

async def on_websocket_disconnection():
    # 在这里处理 WebSocket 断开时的逻辑
    print("WebSocket connection has been closed.")
    # 例如，重连、清理资源、通知客户端等

def start_websocket_thread(uri):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(handle_websocket(uri))

@server.PromptServer.instance.routes.post(END_POINT_URL)
async def kaji_r(req):
    jsonData = await req.json()
    async with aiohttp.ClientSession() as session:
        oldData = jsonData.get('uploadData')
        newData = reformat(oldData)
        if newData:
            async with session.post(BASE_URL + END_POINT_URL, json=newData) as response:
                try:
                    res = await response.text()
                    res_js = json.loads(res)
                    if DEBUG:
                        print("res_js", res_js)
                    wss_server_url = res_js.get('data', {}).get('wss_server_url')          
                    if wss_server_url:
                        threading.Thread(target=start_websocket_thread, args=(wss_server_url,), daemon=True).start()
                    else:
                        print("WebSocket server URL not found in response")
                    
                    return web.json_response(res_js)
                except json.JSONDecodeError:
                    return web.Response(status=response.status, text="Invalid JSON response")
        else:
            return web.Response(status=400, text="uploadData is missing")



    