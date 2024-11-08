from .sdCpm import *
from .setup import *
from .api import *

extension_dirs = [
    "js",
]
# Mount web directory
WEB_DIRECTORY = f"./{extension_dirs[0]}"

# 这个地方会提前执行，comfyUI的8188端口还没启动。（不知道为何 bxb 是在8188进程跑起来后，才执行__init__.py）
thread_run()

NODE_CLASS_MAPPINGS = {
    "sdCpm": sdCpm,
    "cpm_textInput": cpm_textInput,
}
NODE_DISPLAY_NAME_MAPPINGS = {"sdCpm": "sdCpm", "cpm_textInput": "cpm_textInput"}

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
