import { app } from '../../../scripts/app.js'
import { $el } from '../../../scripts/ui.js'

var isLoading = false;
function createButtonWithClickHandler(buttonClass, buttonText, clickHandler) {
    return $el(`button.${buttonClass}`, {
        textContent: buttonText,
        onclick: clickHandler
    });
}

function getPostData(){

}

async function handleDeployButtonClick(app) {
    if (isLoading) return;
    const graphPrompt = await app.graphToPrompt();
    const uploadData = getPostData(graphPrompt);
    if (uploadData.output) {
        try {
            const res = await request('https://env-00jxh693vso2.dev-hz.cloudbasefunction.cn/kaji-upload-file/uploadProduct', uploadData);
            if (res && res.data && res.data.success) {
                showMsgDialog('上传成功');
                console.log('上传返回的数据:', res.data);
            } else {
                showMsgDialog('上传过程中发生错误，请稍后重试。');
                console.error('请求失败:', requestError);
            }
        } catch (requestError) {
            showMsgDialog('上传作品失败，上传取消。');
            console.warn('上传作品失败请求错误:', uploadData);
        }
    } else {
        showMsgDialog('生成上传数据失败，请检查工作流是否正常。');
        console.error('获取上传数据失败:', uploadData);
    }
}

function showMsgDialog(message) {
    app.ui.dialog.close();
    const messageBox = $el('div', { class: 'msgBox' }, [
        $el('div', { class: 'msgContent' }, [message]),
        $el('button', { class: 'msgButton', onclick: () => app.ui.dialog.close() }, ['确定'])
    ]);
    app.ui.dialog.show(messageBox);
}

app.registerExtension({
    name: "sdCpm",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        console.log("11111")
        if (nodeData.name === "sdCpm") {
            console.log("22222")
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                console.log("33333")
                const originalResult = onNodeCreated ? onNodeCreated?.apply(this, arguments) : undefined;
                const deployButton = createButtonWithClickHandler(
                    'deploy_btn',
                    '点此，将工作流部署到小程序/H5',
                    handleDeployButtonClick(app)
                );
                this.addDOMWidget('deployButton', 'btn', deployButton);
                return originalResult;
            }
            nodeType.prototype.onRemoved = function () {
            };
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
