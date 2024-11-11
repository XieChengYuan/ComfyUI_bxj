/*咔叽工作台UI内容都放这一个文件里，后面发布时会对这个文件做代码混淆，由于这样会导致文件过长，为方便后期维护用虚线对逻辑分块*/

//---------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------UI组件及样式--------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------------------------
/*工作台主按钮及主容器*/

// 创建工作台按钮
const workbenchButton = document.createElement('button');
workbenchButton.innerText = '咔叽工作台';
workbenchButton.id = 'workbench-button';

// 创建插件 UI 遮罩层
const overlay = document.createElement('div');
overlay.id = 'overlay';
overlay.style.display = 'none';

// 创建插件 UI 界面
const pluginUI = document.createElement('div');
pluginUI.id = 'plugin-ui';

// 创建顶部导航栏
const navBar = document.createElement('div');
navBar.className = 'nav-bar';
navBar.innerHTML = `
    <button id="app-params-tab" class="active">作品参数</button>
    <button id="complete-wrap-tab">作品发布</button>
    <button id="work-management-tab">作品管理</button>
`;

// 创建面板容器
const panelsContainer = document.createElement('div');
panelsContainer.className = 'panels-container';

//---------------------------------------------------------------------------------------------------------------------------
/*创建作品参数面板*/

//TODO：获取当前工作流可作为输入的节点
const nodes = [
    { id: 'node1', name: '节点1', description: '这是节点1的描述' },
    { id: 'node2', name: '节点2', description: '这是节点2的描述' },
    { id: 'node3', name: '节点3', description: '这是节点3的描述' }
];

// 创建作品参数模块容器
const productInfo = document.createElement('div');
productInfo.className = 'panel';
productInfo.style.position = 'relative';
productInfo.innerHTML = `
    <h3>作品输入信息</h3>
    <div style="display: flex; align-items: center; margin-top: 20px;">
        <label for="node-select" style="flex-shrink: 0; margin-right: 10px;">选择输入节点</label>
        <select id="node-select" style="flex-grow: 1; height: 27px; width: 145px; padding: 2px 8px;">
            <option value="" disabled selected>请选择节点</option>
            ${nodes.map(node => `<option value="${node.id}">${node.name}</option>`).join('')}
        </select>
    </div>
    <p id="hint-text" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80%; text-align: center; font-size: 0.9rem; color: #666; line-height: 1.6;">
        支持将工作流中的文本、图像、视频、节点信息封装为作品的输入信息。你也可以在此自定义作品输入显示的标题信息。
    </p>
    <p style="font-size: 0.8rem; color: #666; position: absolute; bottom: 10px; left: 0; width: 100%; text-align: center;">
        目前仅支持图片、视频作为输出结果
    </p>
`;

// 创建动态内容容器，用来显示选择节点后的组件
const dynamicContainer = document.createElement('div');
dynamicContainer.className = 'dynamic-container';
dynamicContainer.style.marginTop = '20px';
dynamicContainer.style.maxHeight = '450px'; // 限制高度
dynamicContainer.style.overflowY = 'auto'; // 启用垂直滚动

// 将动态内容容器作为子元素添加到productInfo中
productInfo.appendChild(dynamicContainer);
document.body.appendChild(productInfo);

// 获取<select>元素和提示文本元素
const nodeSelect = productInfo.querySelector('#node-select');
const hintText = productInfo.querySelector('#hint-text'); // 提示文本

// 监听选择框的change事件
nodeSelect.addEventListener('change', (event) => {
    console.log("节点选择更改事件触发"); 
    const selectedNodeId = event.target.value; 
    console.log("选中的节点ID:", selectedNodeId); 
    const selectedNode = nodes.find(node => node.id === selectedNodeId); 

    if (selectedNode) {
        console.log("找到对应的节点:", selectedNode); 

        // 创建一个新组件，显示节点信息
        const nodeComponent = document.createElement('div');
        nodeComponent.className = 'node-component';
        nodeComponent.style.border = '1px solid #444';
        nodeComponent.style.padding = '10px';
        nodeComponent.style.marginTop = '10px';
        nodeComponent.style.borderRadius = '4px';
        nodeComponent.style.backgroundColor = '#333';

        nodeComponent.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 5px 0; color: #EAEAEA; font-weight: bold;">
                <span>${selectedNode.name}</span>
                <button style="background: none; border: none; color: #E74C3C; cursor: pointer; font-size: 0.9rem;" onclick="removeComponent(this)">🗑️</button>
            </div>
            <p style="margin: 8px 0 4px; font-size: 0.85rem; color: #CCCCCC;">设置用户输入标题</p>
            <input type="text" placeholder="请输入${selectedNode.name}" style="width: 90%; padding: 6px; border-radius: 4px; border: 1px solid #555; background-color: #1D1D1D; color: #FFFFFF; font-size: 0.85rem;">
        `;
    

        // 添加到动态容器
        dynamicContainer.appendChild(nodeComponent);
        console.log("添加新组件到动态容器", nodeComponent); 

        // 隐藏提示文本
        hintText.style.display = 'none';
    } else {
        console.error("未找到对应的节点"); 
    }
});

// 删除组件的函数
function removeComponent(element) {
    console.log("删除组件"); 
    element.parentElement.parentElement.remove();

    // 如果动态容器为空，显示提示文本
    if (dynamicContainer.children.length === 0) {
        hintText.style.display = 'block';
    }
}



//---------------------------------------------------------------------------------------------------------------------------
// 创建用户输入表单面板

const userInput = document.createElement('div');
userInput.className = 'panel';
userInput.style.position = 'relative'; 
userInput.innerHTML = `
    <h3>用户输入表单</h3>
    <p>暂无用户自定义输入</p>
    <button class="panel-button">作品生成测试</button>
`;

const mockUser = document.createElement('div');
mockUser.className = 'panel';
mockUser.innerHTML = `
    <h3>模拟用户生成</h3>
    <p>这里是模拟用户生成的内容...</p>
`;

// 添加内容到 panelsContainer
panelsContainer.appendChild(productInfo);
panelsContainer.appendChild(userInput);
panelsContainer.appendChild(mockUser);

//---------------------------------------------------------------------------------------------------------------------------
// 创建“作品发布”视图容器

const completeWrapContainer = document.createElement('div');
completeWrapContainer.className = 'complete-wrap-container';
completeWrapContainer.style.display = 'none'; 

// 创建预览区域和设置参数区域
const previewSection = document.createElement('div');
previewSection.className = 'preview-section';
previewSection.innerHTML = `
    <h3>预览效果</h3>
    <p>这里显作品封装后的预览效果。</p>
    <div class="preview-content">
        <!-- 你可以在此添加具体的预览内容结构，例如图片、文本等 -->
    </div>
`;

const settingsSection = document.createElement('div');
settingsSection.className = 'settings-section';
settingsSection.innerHTML = `
    <h3>设置参数</h3>
    <div class="setting-item">
        <label>参数1:</label>
        <input type="text" placeholder="请输入参数1的值" />
    </div>
    <div class="setting-item">
        <label>参数2:</label>
        <input type="text" placeholder="请输入参数2的值" />
    </div>
`;

completeWrapContainer.appendChild(previewSection);
completeWrapContainer.appendChild(settingsSection);

//---------------------------------------------------------------------------------------------------------------------------
// 创建作品管理视图容器

const workManagementContainer = document.createElement('div');
workManagementContainer.className = 'work-management-container';
workManagementContainer.style.display = 'none';

const workManagementContent = document.createElement('div');
workManagementContent.className = 'work-management-content';
workManagementContent.innerHTML = `
    <h3>作品管理</h3>
    <p>这里显示当前管理的作品列表，暂时没有任何内容。</p>
`;

workManagementContainer.appendChild(workManagementContent);

//---------------------------------------------------------------------------------------------------------------------------
//主UI其余内容

// 创建底部按钮
const footer = document.createElement('div');
footer.className = 'footer';
footer.innerHTML = `
    <button id="cancel-button">取消</button>
    <button id="next-button">下一步</button>
    <button id="prev-button" style="display: none;">上一步</button>
    <button id="publish-button" style="display: none;">发布作品</button>
`;

// 挂载所有元素
const kajiPluginUI = document.getElementById('kaji-plugin-ui');
kajiPluginUI.appendChild(workbenchButton);
kajiPluginUI.appendChild(overlay);
kajiPluginUI.appendChild(pluginUI);
pluginUI.appendChild(navBar);
pluginUI.appendChild(panelsContainer);
pluginUI.appendChild(completeWrapContainer);
pluginUI.appendChild(workManagementContainer);
pluginUI.appendChild(footer);

//---------------------------------------------------------------------------------------------------------------------------
// 主UI添加样式

const themeColor = '#0F1114';
const accentColor = '#5CB85C';
const secondaryColor = '#1D1E1F';
const style = document.createElement('style');
style.textContent = `
    /* 按钮样式 */
    #workbench-button {
        position: fixed;
        top: 40px;
        right: 10px;
        width: 150px;
        height: 40px;
        padding: 8px 16px;
        background-color: #5CB85C;
        color: white;
        border: 2px solid #4A9C4A; /* 较深的绿色边框，增加层次感 */
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        text-shadow: 1px 1px 2px black;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2), inset 0px 1px 0px rgba(255, 255, 255, 0.3);
        z-index: 99999998;
        font-size: 14px;
    }
    /* 遮罩层 */
    #overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.3);
        z-index: 99999997;
    }
    /* 插件 UI 样式 */
    #plugin-ui {
        position: fixed;
        top: 0;
        right: 0;
        width: 80vw;
        height: 100vh;
        padding: 16px;
        background-color: ${themeColor};
        font-family: Arial, sans-serif;
        z-index: 99999999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    #plugin-ui.show {
        transform: translateX(0);
    }
    /* 顶部导航栏样式 */
    .nav-bar {
        display: flex;
        border-bottom: 2px solid ${secondaryColor};
        padding-bottom: 10px;
        margin-bottom: 20px;
    }
    .nav-bar button {
        flex: 1;
        background: none;
        border: none;
        color: #aaa;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 1rem;
        transition: color 0.3s;
    }
    .nav-bar button.active, .nav-bar button:hover {
        color: ${accentColor};
        border-bottom: 2px solid ${accentColor};
    }
    /* 内容面板样式 */
    .panels-container {
        display: flex;
        justify-content: space-between;
        height: calc(100% - 140px);
        overflow: hidden;
    }
    .panel {
        flex: 1;
        background: ${secondaryColor};
        border-radius: 8px;
        padding: 20px;
        margin: 10px;
        color: #aaa;
        overflow-y: auto;
        max-height: calc(100vh - 220px);
    }
    .panel h3 {
        margin: 0;
        color: #f3f3f3;
    }
    .panel-button {
        background-color: ${accentColor};
        border: none;
        padding: 10px 20px;
        color: white;
        cursor: pointer;
        border-radius: 4px;
        margin-top: 20px;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
    }
    .footer {
        position: absolute;
        bottom: 50px;
        right: 20px;
        display: flex;
        justify-content: flex-end;
        width: calc(100% - 40px);
    }
    #cancel-button, #next-button, #prev-button, #publish-button {
        padding: 8px 20px;
        border-radius: 4px;
        cursor: pointer;
    }
    #cancel-button {
        background-color: white;
        color: black;
        border: none;
        margin-right: 10px;
    }
    #next-button {
        background-color: ${accentColor};
        color: white;
        border: none;
    }
    #prev-button {
        background-color: white;
        color: black;
        border: none;
        display: none;
        margin-right: 10px;
    }
    #publish-button {
        background-color: ${accentColor};
        color: white;
        border: none;
        display: none;
    }
    /* 完成封装视图样式 */
    .complete-wrap-container {
        display: flex;
        height: calc(100% - 140px);
    }
    .preview-section, .settings-section {
        flex: 1;
        background: #1D1E1F;
        border-radius: 8px;
        margin: 10px;
        padding: 20px;
        color: #aaa;
        overflow-y: auto;
    }
    .preview-section h3, .settings-section h3 {
        color: #f3f3f3;
    }
    .setting-item {
        margin-bottom: 15px;
    }
    .setting-item label {
        display: block;
        margin-bottom: 5px;
        color: #f3f3f3;
    }
    .setting-item input {
        width: 100%;
        padding: 8px;
        border: 1px solid #454545;
        border-radius: 4px;
        background-color: #333;
        color: #f3f3f3;
    }
    /* 作品管理视图样式 */
    .work-management-container {
        display: flex;
        height: calc(100% - 140px);
        overflow: hidden;
    }
    .work-management-content {
        flex: 1;
        background: #1D1E1F;
        border-radius: 8px;
        margin: 10px;
        padding: 20px;
        color: #aaa;
        overflow-y: auto;
    }
    .work-management-content h3 {
        color: #f3f3f3;
    }
`;

document.head.appendChild(style);

//---------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------添加功能逻辑--------------------------------------------------------//


//comfyui前后端通信接口
async function request(url, data = null, method = 'POST') {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // 如果是 POST 或 PUT 请求，加入 body
        if (method === 'POST' || method === 'PUT') {
            options.body = JSON.stringify({ data });
        }

        const response = await api.fetchApi(url, options);

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


// 显示/隐藏插件 UI 界面
workbenchButton.addEventListener('click', () => {
    overlay.style.display = 'block';
    pluginUI.classList.add('show');
});

// 获取顶部导航栏按钮和内容容器
const appParamsTab = document.getElementById('app-params-tab');
const completeWrapTab = document.getElementById('complete-wrap-tab');
const workManagementTab = document.getElementById('work-management-tab');


// 更新底部按钮显示
function updateFooterButtons() {
    if (appParamsTab.classList.contains('active')) {
        document.getElementById('cancel-button').style.display = 'inline-block';
        document.getElementById('next-button').style.display = 'inline-block';
        document.getElementById('prev-button').style.display = 'none';
        document.getElementById('publish-button').style.display = 'none';
    } else if (completeWrapTab.classList.contains('active')) {
        document.getElementById('cancel-button').style.display = 'none';
        document.getElementById('next-button').style.display = 'none';
        document.getElementById('prev-button').style.display = 'inline-block';
        document.getElementById('publish-button').style.display = 'inline-block';
    } else if (workManagementTab.classList.contains('active')) {
        // 显示作品管理页面的按钮
        document.getElementById('cancel-button').style.display = 'inline-block';
        document.getElementById('next-button').style.display = 'none';  
        document.getElementById('prev-button').style.display = 'none'; 
        document.getElementById('publish-button').style.display = 'none'; 
    }
}

// 更新底部按钮显示
function updateFooterForWorkManagement() {
    document.getElementById('cancel-button').style.display = 'inline-block';
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('prev-button').style.display = 'none';
    document.getElementById('publish-button').style.display = 'none';
}

// 作品管理视图切换逻辑
workManagementTab.addEventListener('click', () => {
    // 移除其他tab的active状态，给当前tab添加active状态
    appParamsTab.classList.remove('active');
    completeWrapTab.classList.remove('active');
    workManagementTab.classList.add('active');
    
    // 切换视图的显示和隐藏
    panelsContainer.style.display = 'none'; 
    completeWrapContainer.style.display = 'none'; 
    workManagementContainer.style.display = 'flex'; 

    // 更新底部按钮显示
    updateFooterButtons();
});

// 完成封装tab切换逻辑
completeWrapTab.addEventListener('click', () => {
    // 移除其他tab的active状态，给当前tab添加active状态
    completeWrapTab.classList.add('active');
    appParamsTab.classList.remove('active');
    workManagementTab.classList.remove('active');

    // 切换视图的显示和隐藏
    panelsContainer.style.display = 'none'; 
    completeWrapContainer.style.display = 'flex'; 
    workManagementContainer.style.display = 'none';

    // 更新底部按钮显示
    updateFooterButtons();
});

//作品参数tab切换逻辑
appParamsTab.addEventListener('click', () => {
    // 移除其他tab的active状态，给当前tab添加active状态
    appParamsTab.classList.add('active');
    completeWrapTab.classList.remove('active');
    workManagementTab.classList.remove('active');

    // 切换视图的显示和隐藏
    panelsContainer.style.display = 'flex'; 
    completeWrapContainer.style.display = 'none'; 
    workManagementContainer.style.display = 'none'; 

    // 更新底部按钮显示
    updateFooterButtons();
});

// 取消按钮逻辑
document.getElementById('cancel-button').addEventListener('click', () => {
    pluginUI.classList.remove('show');
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
});

// 下一步按钮逻辑
document.getElementById('next-button').addEventListener('click', () => {
    completeWrapTab.click();
});

// 上一步按钮逻辑
document.getElementById('prev-button').addEventListener('click', () => {
    appParamsTab.click();
});

// 按钮拖动功能
let isDragging = false;
let offsetX, offsetY;

workbenchButton.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - workbenchButton.getBoundingClientRect().left;
    offsetY = e.clientY - workbenchButton.getBoundingClientRect().top;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        workbenchButton.style.left = `${e.clientX - offsetX}px`;
        workbenchButton.style.top = `${e.clientY - offsetY}px`;
        workbenchButton.style.position = 'absolute';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});
