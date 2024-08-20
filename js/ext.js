import { app } from '../../../scripts/app.js'
import { $el } from '../../../scripts/ui.js'

let isLoading = false;
const TEST_UID = "66c1f5419d9f915ad22bf864";
const UPLOAD_PRODUCT_URL = "https://env-00jxh693vso2.dev-hz.cloudbasefunction.cn/kaji-upload-file/uploadProduct";
function createButtonWithClickHandler(buttonClass, buttonText, clickHandler) {
    return $el(`button.${buttonClass}`, {
        textContent: buttonText,
        onclick: clickHandler
    });
}

function formatPostData(graphPrompt){
    const pp = graphPrompt.output;
    let pd = {};
    let cpm_input_info={}
    console.log("graphPrompt",graphPrompt);
    for (const value of Object.values(pp)) {
        if (value.class_type === 'sdCpm') {
            cpm_input_info = value.inputs;
        }
    }
    console.log("cpm_input_info:",cpm_input_info);
    if(cpm_input_info)
    {
        pd.image = pp[cpm_input_info['product_img1(optional)'][0]].inputs.image;
        pd.title = cpm_input_info['product-title'];
        pd.desc = cpm_input_info['product-desc'];
        pd.uid = TEST_UID;
    }
    console.log("pd:",pd);
    return pd;
}

async function handleDeployButtonClick(app) {
    if (isLoading) return;
    const graphPrompt = await app.graphToPrompt();
    const uploadData = formatPostData(graphPrompt);
    if (uploadData) {
        try {
            const res = await request(UPLOAD_PRODUCT_URL, uploadData);
            if (res && res.data && res.data.success) {
                showMsgDialog('上传成功');
                console.log('上传返回的数据:', res.data);
            } else {
                showMsgDialog('上传过程中发生错误，请稍后重试。');
                console.error('请求失败:', res);
            }
        } catch (requestError) {
            showMsgDialog('上传作品失败，上传取消。');
            console.warn('上传作品失败请求错误:', requestError);
        }
    } else {
        showMsgDialog('生成上传数据失败，请检查工作流是否正常。');
        // console.error('获取上传数据失败:', uploadData);
    }
}

function showMsgDialog(message) {
    app.ui.dialog.close();
    const messageBox = $el('div', { class: 'msgBox' }, [
        $el('div', { class: 'msgContent' }, [message]),
    ]);
    app.ui.dialog.show(messageBox);
}

app.registerExtension({
    name: "sdCpm",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "sdCpm") {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                const originalResult = onNodeCreated ? onNodeCreated?.apply(this, arguments) : undefined;
                const deployButton = createButtonWithClickHandler(
                    'deploy_btn',
                    '点此，将工作流部署到小程序/H5',
                    () => handleDeployButtonClick(app)
                );
                this.addDOMWidget('deployButton', 'btn', deployButton);
                return originalResult;
            }
            this.serialize_widgets = true
        }
    }
})

const stylesheet = document.createElement("style");
const cssStyle = `
    .deploy_btn {
      flex:1;
      font-size:12px;
      background:var(--comfy-input-bg);
      color:var(--error-text);
      border-radius: 10px;
      border: 2px solid var(--border-color);
      cursor:pointer;
      width: 1rem;
      height:2rem;
    }
`
stylesheet.innerHTML = cssStyle
document.head.appendChild(stylesheet);
