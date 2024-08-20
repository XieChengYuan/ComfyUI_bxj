import aiohttp
import server

BASE_URL = "https://env-00jxh693vso2.dev-hz.cloudbasefunction.cn"
END_POITN_URL = "/kaji-upload-file/uploadProduct"
DEBUG = True
@server.PromptServer.instance.routes.post(END_POITN_URL)
async def kaji_r(req):
    jsonData = await req.json()
    if DEBUG:
        print("TEST API KAJI======",jsonData)
    if not ('uploadData' in jsonData and isinstance(jsonData['uploadData'], dict)):
        raise ValueError("Invalid data: 'uploadData' is missing or is not a dictionary.")
    async with aiohttp.ClientSession() as sss:
        pass



    