// 动态加载CSS文件
function loadCSS(stylesheets) {
    stylesheets.forEach((link) => {
        const styleTag = document.createElement("link");
        styleTag.rel = "stylesheet";
        styleTag.href = link.getAttribute("href");
        document.head.appendChild(styleTag);
    });
}

// 动态加载JS脚本
function loadJS(scripts) {
    scripts.forEach((script) => {
        const scriptTag = document.createElement("script");
        const src = script.getAttribute("src");
        if (src) {
            scriptTag.src = src;
            scriptTag.defer = true;
            scriptTag.onload = () => {
                console.log(`Script loaded: ${src}`);
            };
            scriptTag.onerror = (e) => {
                console.error(`Error loading script: ${src}`, e);
            };
            document.body.appendChild(scriptTag);
        }
    });
}

// 插件UI加载函数
async function loadPluginUI() {
    try {
        console.log("Loading plugin UI...");

        // 获取插件的 HTML 文件
        const response = await fetch("/kaji/index.html");
        console.log("获取插件的 HTML 文件", response);
        if (!response.ok) throw new Error("Network response was not ok");

        // 获取 HTML 内容并将其插入页面
        const htmlContent = await response.text();
        const container = document.createElement("div");
        container.innerHTML = htmlContent;

        // 动态加载 CSS 样式
        const stylesheets = container.querySelectorAll('link[rel="stylesheet"]');
        loadCSS(stylesheets);
        console.log("动态加载 CSS 样式", stylesheets);

        // 动态加载 JS 脚本
        const scripts = container.querySelectorAll("script");
        loadJS(scripts);
        console.log("动态加载 JS 脚本", scripts);

        // 将插件内容插入到页面中
        const pluginElement = container.querySelector("#kaji-plugin-ui");
        if (pluginElement) {
            document.body.appendChild(pluginElement);
        }
        console.log("将插件内容插入到页面中", pluginElement);

    } catch (error) {
        console.error("Error loading plugin UI:", error);
    }
}

// 调用函数以加载插件UI
setTimeout(() => {
    console.log("初始化咔叽UI");
    loadPluginUI();
}, 500);
