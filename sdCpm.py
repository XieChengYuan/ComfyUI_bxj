class sdCpm:
    CATEGORY = "sdCpm"
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "product-title": ("STRING", {"multiline": False, "default": "此处设置作品的标题"}),
                "product-desc": ("STRING", {"multiline": False, "default": "此处设置作品的描述简介"}),
                "product-prices": ("FLOAT", {"default": 0.1,"min": 0,"max": 9999,"step": 0.01,"display": "number"}),
                "free-times": ("INT", {"default": 3,"min": 0,"max": 99,"step": 1,"display": "number"}),
            },
            "optional": {
                "product_img1(optional)": ("IMAGE",),
                "product_img2(optional)": ("IMAGE",),
                "product_img3(optional)": ("IMAGE",),
                "input_img1(optional)": ("IMAGE",),
                "input_img2(optional)": ("IMAGE",),
                "input_img3(optional)": ("IMAGE",),
                "input_video1(optional)": ("IMAGE",),
                "input_video2(optional)": ("IMAGE",),
                "input_video3(optional)": ("IMAGE",),
                "input_text1(optional)": ("STRING", {"multiline": False,"forceInput": True,"dynamicPrompts": False}),
                "input_text2(optional)": ("STRING", {"multiline": False,"forceInput": True,"dynamicPrompts": False}),
                "input_text3(optional)": ("STRING", {"multiline": False,"forceInput": True,"dynamicPrompts": False}),
                "img1_tips": ("STRING", {"default": "请上传图片","multiline": False}),
                "img2_tips": ("STRING", {"default": "请上传图片","multiline": False}),
                "img3_tips": ("STRING", {"default": "请上传图片","multiline": False}),
                "video1_tips": ("STRING", {"default": "请上传图片","multiline": False}),
                "video2_tips": ("STRING", {"default": "请上传图片","multiline": False}),
                "video3_tips": ("STRING", {"default": "请上传图片","multiline": False}),
                "text1_tips": ("STRING", {"default": "请上传图片","multiline": False}),
                "text2_tips": ("STRING", {"default": "请上传图片","multiline": False}),
                "text3_tips": ("STRING", {"default": "请上传图片","multiline": False}),
            },
             "hidden": { "node_id": "UNIQUE_ID" }  # Add the hidden key
        }
    RETURN_TYPES = () 

class cpm_textInput:
    CATEGORY = "sdCpm"
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"default": "", "multiline": True, "placeholder": "输入文本"}),
            }
        }
    RETURN_TYPES = ("STRING",)
    FUNCTION = "getText"
   

    @staticmethod
    def getText(text):
        return (text,)