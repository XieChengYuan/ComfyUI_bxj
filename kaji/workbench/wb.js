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
    <button id="app-params-tab" class="active">应用参数</button>
    <button id="complete-wrap-tab">完成封装</button>
    <button id="work-management-tab">作品管理</button>
`;

// 创建面板容器
const panelsContainer = document.createElement('div');
panelsContainer.className = 'panels-container';

// 创建作品参数、用户输入表单、模拟用户生成面板
const productInfo = document.createElement('div');
productInfo.className = 'panel';
productInfo.innerHTML = `
    <h3>应用输入信息</h3>
    <p>支持将工作流中的文本、图像、视频、节点信息封装为应用的输入信息。你也可以在此自定义应用输入显示的标题信息。</p>
    <input type="text" placeholder="这里支持节点搜索" />
    <p>目前仅支持图片、视频作为输出结果</p>
`;

const userInput = document.createElement('div');
userInput.className = 'panel';
userInput.style.position = 'relative'; // 为底部按钮定位
userInput.innerHTML = `
    <h3>用户输入表单</h3>
    <p>暂无用户自定义输入</p>
    <button class="panel-button">应用生成测试</button>
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

// 创建“完成封装”视图容器
const completeWrapContainer = document.createElement('div');
completeWrapContainer.className = 'complete-wrap-container';
completeWrapContainer.style.display = 'none'; 

// 创建预览区域和设置参数区域
const previewSection = document.createElement('div');
previewSection.className = 'preview-section';
previewSection.innerHTML = `
    <h3>预览效果</h3>
    <p>这里显示应用封装后的预览效果。</p>
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

// 添加样式
const themeColor = '#0F1114';
const accentColor = '#21A1C9';
const secondaryColor = '#1D1E1F';
const style = document.createElement('style');
style.textContent = `
    /* 按钮样式 */
    #workbench-button {
        position: fixed;
        top: 40px;
        right: 10px;
        width: 160px;
        height: 40px;
        padding: 8px 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        z-index: 99999998;
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
        background-color: #21A1C9;
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
        background-color: #21A1C9;
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
        background-color: #21A1C9;
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

//---------------- 添加功能逻辑------------------------//

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
    panelsContainer.style.display = 'none'; // 隐藏应用参数面板
    completeWrapContainer.style.display = 'none'; // 隐藏封装面板
    workManagementContainer.style.display = 'flex'; // 显示作品管理面板

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
    panelsContainer.style.display = 'none'; // 隐藏应用参数面板
    completeWrapContainer.style.display = 'flex'; // 显示封装面板
    workManagementContainer.style.display = 'none'; // 隐藏作品管理面板

    // 更新底部按钮显示
    updateFooterButtons();
});

// 应用参数tab切换逻辑
appParamsTab.addEventListener('click', () => {
    // 移除其他tab的active状态，给当前tab添加active状态
    appParamsTab.classList.add('active');
    completeWrapTab.classList.remove('active');
    workManagementTab.classList.remove('active');

    // 切换视图的显示和隐藏
    panelsContainer.style.display = 'flex'; // 显示应用参数面板
    completeWrapContainer.style.display = 'none'; // 隐藏封装面板
    workManagementContainer.style.display = 'none'; // 隐藏作品管理面板

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
