class bxj:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "product-title": ("STRING", {"multiline": False, "default": "此处设置作品的标题"}),
                "product-desc": ("STRING", {"multiline": False, "default": "此处设置作品的描述简介"}),
            },
            "optional": {
                "product_img1(optional)": ("IMAGE",),
                "product_img2(optional)": ("IMAGE",),
                "product_img3(optional)": ("IMAGE",),
            }
        }

    RETURN_TYPES = ()
    CATEGORY = "bxj"

NODE_CLASS_MAPPINGS = { 
    "bxj": bxj,
    }
NODE_DISPLAY_NAME_MAPPINGS = {
     "bxj": "bxj",
}
