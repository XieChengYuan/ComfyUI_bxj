/*咔叽工作台UI内容都放这一个文件里，后面发布时会对这个文件做代码混淆，由于这样会导致文件过长，为方便后期维护用regin/endregin对逻辑分块，可折叠*/


// #region UI组件及样式

// #region svg代码统一存放
//空页面的
const noneSvgCode = `
<svg t="1731335677949" class="icon" viewBox="0 0 1346 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1926" width="200" height="200">
    <path d="M1248.171319 574.30012a21.809034 21.809034 0 1 0 21.795727-21.809034 19.959457 19.959457 0 0 0-10.897864 2.727792c-6.905972 3.459639-10.897864 10.951089-10.897863 19.081242" fill="#8DDBB8" p-id="1927"></path>
    <path d="M16.353449 400.612922H0.039919a16.579656 16.579656 0 0 0 16.353449 16.353448 16.353449 16.353449 0 0 0 0-32.693591 18.109881 18.109881 0 0 0-8.170072 2.049171c-5.522117 2.714486-8.183378 8.170071-8.183377 14.290972" fill="#C8E6C9" p-id="1928"></path>
    <path d="M1159.551328 386.308644a34.064141 34.064141 0 1 0-34.064141 34.06414 35.581059 35.581059 0 0 0 34.064141-34.06414z m-87.888144 0c0-29.273871 24.52352-53.824003 53.824003-53.824003s53.824003 24.52352 53.824004 53.824003-24.52352 53.824003-53.824004 53.824003-53.824003-25.202141-53.824003-53.824003z m0 0" fill="#8DDBB8" p-id="1929"></path>
    <path d="M1162.265814 34.064141a34.064141 34.064141 0 1 0-34.06414 34.06414c18.389313 0 33.385519-14.982899 34.06414-34.06414z m-49.04704 0a14.384116 14.384116 0 0 1 14.304278-14.304278 14.304278 14.304278 0 1 1 0 28.608555 14.384116 14.384116 0 0 1-14.304278-14.304277z m183.946359 247.337595h-16.353448a10.897864 10.897864 0 1 0 0 21.795727h16.353448v16.353449a10.897864 10.897864 0 0 0 21.795728 0v-16.353449h16.353448a10.897864 10.897864 0 0 0 0-21.795727h-16.353448v-16.353449a10.897864 10.897864 0 1 0-21.795728 0z m0 0" fill="#C8E6C9" p-id="1930"></path>
    <path d="M113.782213 743.98212H86.530901a9.021675 9.021675 0 0 0-8.861999 8.861999c0 5.442279 3.406414 8.848693 8.861999 8.848692h27.251312v27.251313a9.021675 9.021675 0 0 0 8.848693 8.901918c5.455585 0 8.861999-3.406414 8.861999-8.861999v-27.291232h27.251312a9.021675 9.021675 0 0 0 8.862-8.848692c0-5.455585-3.406414-8.861999-8.862-8.861999H131.492905v-27.304538a9.021675 9.021675 0 0 0-8.861999-8.861999c-5.455585 0-8.861999 3.406414-8.861999 8.861999z m0 0" fill="#8DDBB8" p-id="1931"></path>
    <path d="M436.020999 982.431103c0 23.166277 94.02235 41.55559 209.1485 41.555591s209.135194-18.389313 209.135195-41.555591-94.02235-41.568897-209.148501-41.568896-209.1485 19.081241-209.1485 41.568896z m0 0" fill="#E8F5E9" p-id="1932"></path>
    <path d="M297.715266 220.764905h-77.655596a10.897864 10.897864 0 0 1 0-21.795728h77.668902a10.897864 10.897864 0 1 1 0 21.795728z m100.835178-127.394564a10.764801 10.764801 0 0 1-10.897863-10.897863V10.924476a10.897864 10.897864 0 0 1 21.795727 0v71.534695c-0.678622 6.812828-5.442279 10.897864-10.897864 10.897864z m-58.547741 51.096211a10.937783 10.937783 0 0 1-7.49145-3.406414L271.1958 79.066064a10.645044 10.645044 0 1 1 14.929674-14.996206l61.994075 61.994075a10.645044 10.645044 0 0 1 0 14.996205c-2.661261 2.049171-5.455585 3.406414-8.183378 3.406414z m0 0" fill="#8DDBB8" p-id="1933"></path>
    <path d="M916.325381 810.753158a56.125994 56.125994 0 0 1-55.886481 55.88648H419.66755a56.125994 56.125994 0 0 1-55.88648-55.88648V292.2996a56.125994 56.125994 0 0 1 55.88648-55.886481h440.797963a56.125994 56.125994 0 0 1 55.88648 55.886481z m0 0" fill="#C8E6C9" p-id="1934"></path>
    <path d="M859.786891 877.524196H418.988929a66.877488 66.877488 0 0 1-66.771038-66.771038V292.2996a66.877488 66.877488 0 0 1 66.771038-66.757732h440.797962a66.877488 66.877488 0 0 1 66.757732 66.757732v518.453558c0 36.100005-29.979105 66.771038-66.757732 66.771038zM418.988929 246.645668a44.922085 44.922085 0 0 0-44.962005 44.962004v518.466864a44.922085 44.922085 0 0 0 44.962005 44.988617h440.797962a44.922085 44.922085 0 0 0 44.962004-44.962004V292.2996a44.922085 44.922085 0 0 0-44.962004-44.962004c0-0.678622-440.797962-0.678622-440.797962-0.678622z m0 0" fill="#8DDBB8" p-id="1935"></path>
    <path d="M994.672904 737.169292a56.125994 56.125994 0 0 1-55.886481 55.88648H497.336452a56.112688 56.112688 0 0 1-55.886481-55.88648V219.394355a56.112688 56.112688 0 0 1 55.886481-55.88648h440.797962a56.125994 56.125994 0 0 1 55.886481 55.88648v517.774937z m0 0" fill="#FFFFFF" p-id="1936"></path>
    <path d="M938.134414 162.855866H497.336452a56.112688 56.112688 0 0 0-55.886481 55.88648v51.096211a56.112688 56.112688 0 0 1 55.886481-55.88648h440.797962a56.112688 56.112688 0 0 1 55.886481 55.88648v-51.096211c0.678622-30.604501-24.52352-55.886481-55.886481-55.88648z m0 0" fill="#E8F5E9" p-id="1937"></path>
    <path d="M938.134414 804.618951H497.336452a66.877488 66.877488 0 0 1-66.771038-66.771038V219.394355a66.877488 66.877488 0 0 1 66.771038-66.771038h440.797962a66.877488 66.877488 0 0 1 66.771038 66.771038v518.453558c0 36.113312-29.979105 66.771038-66.771038 66.771038zM497.336452 173.780342a44.922085 44.922085 0 0 0-44.962004 44.962004v518.426946a44.922085 44.922085 0 0 0 44.962004 44.962004h440.797962a44.922085 44.922085 0 0 0 44.962005-44.962004V219.394355a44.922085 44.922085 0 0 0-44.962005-44.962004z m0 0" fill="#8DDBB8" p-id="1938"></path>
    <path d="M894.529653 295.706014h-369.915276a10.645044 10.645044 0 0 1-10.897864-10.219242 11.203909 11.203909 0 0 1 10.897864-10.897864h369.915276a10.764801 10.764801 0 0 1 10.897864 10.897864c0 6.134207-5.455585 10.219242-10.897864 10.219242z m-129.443734 401.956858H525.958314a10.904517 10.904517 0 1 1 0-21.809033h239.806227a10.764801 10.764801 0 0 1 10.897863 10.91117c-1.33063 6.134207-5.442279 10.897864-11.576485 10.897863z m0 0" fill="#E8F5E9" p-id="1939"></path>
    <path d="M534.128385 463.298924a19.759863 19.759863 0 1 0 19.759863-19.759863 19.773169 19.773169 0 0 0-19.759863 19.759863z m328.372992-2.102396a19.759863 19.759863 0 1 0 19.746557-19.693331 20.225583 20.225583 0 0 0-19.746557 19.693331z m-66.07911 111.107646H636.999428a10.897864 10.897864 0 1 1 0-21.795728h159.422839a10.897864 10.897864 0 1 1 0 21.795728z m0 0" fill="#A5D6A7" p-id="1940"></path>
</svg>
`;
// #endregion UI组件及样式

// #region 所有样式
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
        z-index: 99999991;
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
        z-index: 99999990;
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
        z-index: 99999991;
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
        max-height: calc(100vh - 220px);
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
        max-height: calc(100vh - 220px);
    }
    .work-management-content h3 {
        color: #f3f3f3;
    }
`;

// 帮助提示组件样式
style.textContent += `
.tooltip-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.tooltip-icon {
    font-size: 14px; /* 增大问号的字体 */
    color: #333;
    background-color: #e0e0e0; /* 更亮的背景颜色 */
    border-radius: 50%;
    text-align: center;
    width: 16px; /* 图标宽度 */
    height: 16px; /* 图标高度 */
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    position: relative; /* 使其可偏移位置 */
    top: -2px; /* 向上移动 */
    right: -2px; /* 向右移动 */
}

.tooltip-text {
    visibility: hidden;
    display: inline-block;
    background-color: #FFFFFF;
    color: #333333;
    text-align: center;
    padding: 6px 12px;
    font-size: 0.85rem;
    border-radius: 5px;
    border: 1px solid #DDDDDD;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    position: absolute;
    z-index: 99999994; /* 增加层级以防止被遮挡 */
    top: 125%; /* 放在图标下方 */
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap; /* 始终保持单行 */
    line-height: 1.4;
}

.tooltip-text::after {
    content: "";
    position: absolute;
    bottom: 100%; /* 箭头位置在提示框的顶部 */
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px; /* 加长箭头 */
    border-style: solid;
    border-color: transparent transparent #FFFFFF transparent; /* 向下的箭头 */
    filter: drop-shadow(0px -1px 1px rgba(0, 0, 0, 0.1)); /* 为箭头添加轻微阴影 */
}

.tooltip-container:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
}
`;

document.head.appendChild(style);
// #endregion 所有样式

// #region 公共组件
function createTooltip(text) {
    const tooltipContainer = document.createElement('span');
    tooltipContainer.className = 'tooltip-container';

    const tooltipIcon = document.createElement('span');
    tooltipIcon.className = 'tooltip-icon';
    tooltipIcon.innerText = 'i';

    const tooltipText = document.createElement('span');
    tooltipText.className = 'tooltip-text';
    tooltipText.innerText = text;

    tooltipContainer.appendChild(tooltipIcon);
    document.body.appendChild(tooltipText); // 将提示框直接添加到 body

    // 设置事件监听器，使提示框跟随图标位置
    tooltipIcon.addEventListener('mouseenter', (event) => {
        const rect = tooltipIcon.getBoundingClientRect();
        tooltipText.style.visibility = 'visible';
        tooltipText.style.opacity = '1';
        tooltipText.style.top = `${rect.bottom + window.scrollY + 8}px`; // 8px 偏移量
        tooltipText.style.left = `${rect.left + window.scrollX}px`;
    });

    tooltipIcon.addEventListener('mouseleave', () => {
        tooltipText.style.visibility = 'hidden';
        tooltipText.style.opacity = '0';
    });

    return tooltipContainer;
}
// #endregion 公共组件

// #region 工作台主按钮及主容器
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
// #endregion 工作台主按钮及主容器

// #region 创建作品参数面板
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
    <div id="svg-contains" style="display: flex; justify-content: center; align-items: center; margin-top: 130px;">
         ${noneSvgCode}
    </div>
    <p style="font-size: 0.8rem; color: #666; position: absolute; bottom: 10px; left: 0; width: 100%; text-align: center;">
        右侧实时预览用户输入表单
    </p>
`;

const title = productInfo.querySelector('h3');
title.appendChild(createTooltip('可将工作流中的节点参数封装为作品的输入信息，包括文本、图片、视频等'));

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
const svgContains = productInfo.querySelector('#svg-contains');

// 监听选择框的change事件
nodeSelect.addEventListener('change', (event) => {
    const selectedNodeId = event.target.value;
    const selectedNode = nodes.find(node => node.id === selectedNodeId);

    if (selectedNode) {
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

        // 隐藏提示文本
        svgContains.style.display = 'none';
    }
});

// 删除组件的函数
function removeComponent(element) {
    element.parentElement.parentElement.remove();

    // 如果动态容器为空时显示SVG
    if (dynamicContainer.children.length === 0) {
        svgContains.style.display = 'flex'; // 确保居中显示
    }
}

// #endregion 创建作品参数面板

// #region 创建用户输入表单面板
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
// #endregion 创建用户输入表单面板

// #region 创建“作品发布”视图容器
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
// #endregion 创建“作品发布”视图容器

// #region 创建作品管理视图容器
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
// #endregion 创建作品管理视图容器

// #region 主UI其余内容
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
// #endregion 主UI其余内容

// #endregion UI组件及样式

// #region 功能逻辑部分
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

// #endregion 功能逻辑部分
