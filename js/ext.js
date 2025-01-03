import { app } from '../../../scripts/app.js'
import { api } from '../../../scripts/api.js'
import { $el } from '../../../scripts/ui.js'

let isLoading = false;
const TEST_UID = "66c981879d9f915ad268680a";
const END_POITN_URL = "/kaji-upload-file/uploadProduct";
function createButtonWithClickHandler(buttonClass, buttonText, clickHandler) {
    return $el(`button.${buttonClass}`, {
        textContent: buttonText,
        onclick: clickHandler
    });
}

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function formatPostData(graphPrompt) {
    const pp = graphPrompt.output;
    let pd = {};
    let cpm_input_info = {}
    console.log("graphPrompt", graphPrompt);
    for (const value of Object.values(pp)) {
        if (value.class_type === 'sdCpm') {
            cpm_input_info = value.inputs;
        }
    }
    console.log("cpm_input_info:", cpm_input_info);
    if (cpm_input_info) {
        pd.imageBase = pp[cpm_input_info['product_img1(optional)'][0]].inputs.image;
        pd.title = cpm_input_info['product-title'];
        pd.description = cpm_input_info['product-desc'];
        pd.user_id = TEST_UID;
        pd.price = cpm_input_info['product-prices'];
        pd.free_times = cpm_input_info['free-times'];
    }
    console.log("pd:", pd);
    return pd;
}

async function handleDeployButtonClick(app) {
    if (isLoading) return;
    const graphPrompt = await app.graphToPrompt();
    const workflow = graphPrompt.workflow; // 获取工作流数据
    const output = graphPrompt.output; // 获取输出数据
    const uniqueid = generateUniqueId();
    const uploadData = {
        ...formatPostData(graphPrompt),
        uniqueid,
        workflow,
        output
    };
    if (uploadData) {
        try {
            console.log("body:", uploadData)
            const res = await request(END_POITN_URL, uploadData);
            console.log("response:", res)
            if (res && res.data && res.data._id) {
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

async function request(path, uploadData) {
    try {
        const response = await api.fetchApi(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uploadData
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const resdata = await response.json();
        return resdata;

    } catch (error) {
        console.error('Request failed:', error);
        return null;
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

// 延迟一会导入咔叽入口
setTimeout(() => {
    console.log("工作台入口执行");
    import("/kaji/index.js")
        .then((module) => {
            console.log("模块已加载");
        })
        .catch((error) => {
            console.error("模块加载失败", error);
        });
}, 500);
