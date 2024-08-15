from .cpm import *
    
WEB_DIRECTORY = "./js"
NODE_CLASS_MAPPINGS = { 
    "cpm": cpm,
    "cpm_textInput":cpm_textInput,
    }
NODE_DISPLAY_NAME_MAPPINGS = {
     "cpm": "sd-cpm",
     "cpm_textInput":"cpm_textInput"
}

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]