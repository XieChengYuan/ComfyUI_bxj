from .sdCpm import *
    
WEB_DIRECTORY = "./js"
NODE_CLASS_MAPPINGS = { 
    "sdCpm": sdCpm,
    "cpm_textInput":cpm_textInput,
    }
NODE_DISPLAY_NAME_MAPPINGS = {
     "sdCpm": "sdCpm",
     "cpm_textInput":"cpm_textInput"
}

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]