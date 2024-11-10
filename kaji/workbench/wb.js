console.log("咔叽wb.js入口");

// 创建工作台按钮
const workbenchButton = document.createElement('button');
workbenchButton.innerText = '咔叽工作台';
workbenchButton.id = 'workbench-button';

// 挂载按钮到 #kaji-plugin-ui 容器内
const kajiPluginUI = document.getElementById('kaji-plugin-ui');
kajiPluginUI.appendChild(workbenchButton);
console.log("挂载按钮到 #kaji-plugin-ui 容器内", kajiPluginUI);

// 创建插件 UI 界面
const pluginUI = document.createElement('div');
pluginUI.id = 'plugin-ui';
console.log("挂载插件 UI 界面", pluginUI);

// 创建插件 UI 内容（避免内嵌 HTML）
const header = document.createElement('h2');
header.textContent = '插件 UI 界面';
pluginUI.appendChild(header);

const paragraph = document.createElement('p');
paragraph.textContent = '这里是插件的内容...';
pluginUI.appendChild(paragraph);

const closeButton = document.createElement('button');
closeButton.id = 'close-ui';
closeButton.textContent = '关闭';
pluginUI.appendChild(closeButton);

pluginUI.style.display = 'none'; // 默认隐藏
kajiPluginUI.appendChild(pluginUI); // 将 pluginUI 挂载到 #kaji-plugin-ui 容器内

// 添加样式
const style = document.createElement('style');
style.textContent = `
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
    #plugin-ui {
        display: flex;
        position: absolute;
        top: 20px;
        left: 20px;
        width: 300px;
        padding: 16px;
        background-color: #fff;
        border: 1px solid #ddd;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 99999999;
    }
`;
document.head.appendChild(style);

// 显示/隐藏插件 UI 界面
workbenchButton.addEventListener('click', () => {
    pluginUI.style.display = pluginUI.style.display === 'none' ? 'block' : 'none';
});

// 关闭按钮
closeButton.addEventListener('click', () => {
    pluginUI.style.display = 'none';
});

// 实现拖动功能
function makeElementDraggable(element) {
    let offsetX, offsetY, isDragging = false;
    
    // 在mousedown事件中计算偏移量并启用拖动
    element.addEventListener('mousedown', (e) => {
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        isDragging = true;
    });

    // 在mousemove事件中更新元素的位置
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    });

    // 在mouseup事件中停止拖动
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// 使按钮可以拖动
makeElementDraggable(workbenchButton);
