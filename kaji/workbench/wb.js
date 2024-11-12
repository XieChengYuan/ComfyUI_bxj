/*咔叽工作台UI内容都放这一个文件里，后面发布时会对这个文件做代码混淆，由于这样会导致文件过长，为方便后期维护用regin/endregin对逻辑分块，可折叠*/


// #region UI组件及样式

// #region svg代码统一存放
//空页面的
const noneSvgCode = `
<svg t="1731335677949" class="icon" viewBox="0 0 1346 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1926" width="200" height="200">
    <defs>
        <filter id="brightnessFilter">
            <feComponentTransfer>
                <feFuncR type="linear" slope="0.2"/>
                <feFuncG type="linear" slope="0.2"/>
                <feFuncB type="linear" slope="0.2"/>
            </feComponentTransfer>
        </filter>
    </defs>
    <path d="M1248.171319 574.30012a21.809034 21.809034 0 1 0 21.795727-21.809034 19.959457 19.959457 0 0 0-10.897864 2.727792c-6.905972 3.459639-10.897864 10.951089-10.897863 19.081242" fill="#8DDBB8" filter="url(#brightnessFilter)" p-id="1927"></path>
    <path d="M16.353449 400.612922H0.039919a16.579656 16.579656 0 0 0 16.353449 16.353448 16.353449 16.353449 0 0 0 0-32.693591 18.109881 18.109881 0 0 0-8.170072 2.049171c-5.522117 2.714486-8.183378 8.170071-8.183377 14.290972" fill="#C8E6C9" filter="url(#brightnessFilter)" p-id="1928"></path>
    <path d="M1159.551328 386.308644a34.064141 34.064141 0 1 0-34.064141 34.06414 35.581059 35.581059 0 0 0 34.064141-34.06414z m-87.888144 0c0-29.273871 24.52352-53.824003 53.824003-53.824003s53.824003 24.52352 53.824004 53.824003-24.52352 53.824003-53.824004 53.824003-53.824003-25.202141-53.824003-53.824003z m0 0" fill="#8DDBB8" filter="url(#brightnessFilter)" p-id="1929"></path>
    <path d="M1162.265814 34.064141a34.064141 34.064141 0 1 0-34.06414 34.06414c18.389313 0 33.385519-14.982899 34.06414-34.06414z m-49.04704 0a14.384116 14.384116 0 0 1 14.304278-14.304278 14.304278 14.304278 0 1 1 0 28.608555 14.384116 14.384116 0 0 1-14.304278-14.304277z m183.946359 247.337595h-16.353448a10.897864 10.897864 0 1 0 0 21.795727h16.353448v16.353449a10.897864 10.897864 0 0 0 21.795728 0v-16.353449h16.353448a10.897864 10.897864 0 1 0 0-21.795727h-16.353448v-16.353449a10.897864 10.897864 0 0 0-21.795728 0z m0 0" fill="#C8E6C9" filter="url(#brightnessFilter)" p-id="1930"></path>
    <path d="M113.782213 743.98212H86.530901a9.021675 9.021675 0 0 0-8.861999 8.861999c0 5.442279 3.406414 8.848693 8.861999 8.848692h27.251312v27.251313a9.021675 9.021675 0 0 0 8.848693 8.901918c5.455585 0 8.861999-3.406414 8.861999-8.861999v-27.291232h27.251312a9.021675 9.021675 0 0 0 8.862-8.848692c0-5.455585-3.406414-8.861999-8.862-8.861999H131.492905v-27.304538a9.021675 9.021675 0 0 0-8.861999-8.861999c-5.455585 0-8.861999 3.406414-8.861999 8.861999z m0 0" fill="#8DDBB8" filter="url(#brightnessFilter)" p-id="1931"></path>
    <path d="M436.020999 982.431103c0 23.166277 94.02235 41.55559 209.1485 41.555591s209.135194-18.389313 209.135195-41.555591-94.02235-41.568897-209.148501-41.568896-209.1485 19.081241-209.1485 41.568896z m0 0" fill="#E8F5E9" filter="url(#brightnessFilter)" p-id="1932"></path>
    <path d="M297.715266 220.764905h-77.655596a10.897864 10.897864 0 0 1 0-21.795728h77.668902a10.897864 10.897864 0 1 1 0 21.795728z m100.835178-127.394564a10.764801 10.764801 0 0 1-10.897863-10.897863V10.924476a10.897864 10.897864 0 0 1 21.795727 0v71.534695c-0.678622 6.812828-5.442279 10.897864-10.897864 10.897864z m-58.547741 51.096211a10.937783 10.937783 0 0 1-7.49145-3.406414L271.1958 79.066064a10.645044 10.645044 0 1 1 14.929674-14.996206l61.994075 61.994075a10.645044 10.645044 0 0 1 0 14.996205c-2.661261 2.049171-5.455585 3.406414-8.183378 3.406414z m0 0" fill="#8DDBB8" filter="url(#brightnessFilter)" p-id="1933"></path>
    <path d="M916.325381 810.753158a56.125994 56.125994 0 0 1-55.886481 55.88648H419.66755a56.125994 56.125994 0 0 1-55.88648-55.88648V292.2996a56.125994 56.125994 0 0 1 55.88648-55.886481h440.797963a56.125994 56.125994 0 0 1 55.88648 55.886481z m0 0" fill="#C8E6C9" filter="url(#brightnessFilter)" p-id="1934"></path>
    <path d="M859.786891 877.524196H418.988929a66.877488 66.877488 0 0 1-66.771038-66.771038V292.2996a66.877488 66.877488 0 0 1 66.771038-66.757732h440.797962a66.877488 66.877488 0 0 1 66.757732 66.757732v518.453558c0 36.100005-29.979105 66.771038-66.757732 66.771038zM418.988929 246.645668a44.922085 44.922085 0 0 0-44.962005 44.962004v518.466864a44.922085 44.922085 0 0 0 44.962005 44.988617h440.797962a44.922085 44.922085 0 0 0 44.962004-44.962004V292.2996a44.922085 44.922085 0 0 0-44.962004-44.962004c0-0.678622-440.797962-0.678622-440.797962-0.678622z m0 0" fill="#8DDBB8" filter="url(#brightnessFilter)" p-id="1935"></path>
    <path d="M994.672904 737.169292a56.125994 56.125994 0 0 1-55.886481 55.88648H497.336452a56.112688 56.112688 0 0 1-55.886481-55.88648V219.394355a56.112688 56.112688 0 0 1 55.886481-55.88648h440.797962a56.125994 56.125994 0 0 1 55.886481 55.88648v517.774937z m0 0" fill="#FFFFFF" filter="url(#brightnessFilter)" p-id="1936"></path>
    <path d="M938.134414 162.855866H497.336452a56.112688 56.112688 0 0 0-55.886481 55.88648v51.096211a56.112688 56.112688 0 0 1 55.886481-55.88648h440.797962a56.112688 56.112688 0 0 1 55.886481 55.88648v-51.096211c0.678622-30.604501-24.52352-55.886481-55.886481-55.88648z m0 0" fill="#E8F5E9" filter="url(#brightnessFilter)" p-id="1937"></path>
    <path d="M938.134414 804.618951H497.336452a66.877488 66.877488 0 0 1-66.771038-66.771038V219.394355a66.877488 66.877488 0 0 1 66.771038-66.771038h440.797962a66.877488 66.877488 0 0 1 66.771038 66.771038v518.453558c0 36.113312-29.979105 66.771038-66.771038 66.771038zM497.336452 173.780342a44.922085 44.922085 0 0 0-44.962004 44.962004v518.426946a44.922085 44.922085 0 0 0 44.962004 44.962004h440.797962a44.922085 44.922085 0 0 0 44.962005-44.962004V219.394355a44.922085 44.922085 0 0 0-44.962005-44.962004z m0 0" fill="#8DDBB8" filter="url(#brightnessFilter)" p-id="1938"></path>
    <path d="M894.529653 295.706014h-369.915276a10.645044 10.645044 0 0 1-10.897864-10.219242 11.203909 11.203909 0 0 1 10.897864-10.897864h369.915276a10.764801 10.764801 0 0 1 10.897864 10.897864c0 6.134207-5.455585 10.219242-10.897864 10.219242z m-129.443734 401.956858H525.958314a10.904517 10.904517 0 1 1 0-21.809033h239.806227a10.764801 10.764801 0 0 1 10.897863 10.91117c-1.33063 6.134207-5.442279 10.897864-11.576485 10.897863z m0 0" fill="#E8F5E9" filter="url(#brightnessFilter)" p-id="1939"></path>
    <path d="M534.128385 463.298924a19.759863 19.759863 0 1 0 19.759863-19.759863 19.773169 19.773169 0 0 0-19.759863 19.759863z m328.372992-2.102396a19.759863 19.759863 0 1 0 19.746557-19.693331 20.225583 20.225583 0 0 0-19.746557 19.693331z m-66.07911 111.107646H636.999428a10.897864 10.897864 0 1 1 0-21.795728h159.422839a10.897864 10.897864 0 1 1 0 21.795728z m0 0" fill="#A5D6A7" filter="url(#brightnessFilter)" p-id="1940"></path>
</svg>
`;

const noneSvgCode2 = `
<svg t="1731390596900" class="icon" viewBox="0 0 1402 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11984" width="200" height="200">
    <defs>
        <filter id="darkenFilter">
            <feComponentTransfer>
                <feFuncR type="linear" slope="0.1"/>
                <feFuncG type="linear" slope="0.1"/>
                <feFuncB type="linear" slope="0.1"/>
            </feComponentTransfer>
        </filter>
    </defs>

    <path d="M873.346 126.233l401.1 231.41a46.29 46.29 0 0 1 16.972 63.25L988.216 946.217a46.318 46.318 0 0 1-63.263 16.973L523.839 731.767a46.29 46.29 0 0 1-16.973-63.25l303.216-525.34a46.318 46.318 0 0 1 63.264-16.944z" fill="#FAFAFA" filter="url(#darkenFilter)" p-id="11985"></path>
    <path d="M1037.705 549.495a133.569 133.569 0 0 1-148.073-9.707 133.499 133.499 0 0 1 63.866-238.283 133.54 133.54 0 0 1 133.092 65.606c36.864 63.867 14.982 145.52-48.885 182.384z m-153.502-65.55a100.1 100.1 0 0 0 121.603 43.696l-98.654-170.854a100.057 100.057 0 0 0-22.949 127.158z m51.86-143.837l98.654 170.854a100.015 100.015 0 0 0-98.655-170.854z" fill="#F0F1F2" filter="url(#darkenFilter)" p-id="11986"></path>
    <path d="M108.053 286.622L589.908 8.459a55.647 55.647 0 0 1 76.029 20.367l364.445 631.121a55.619 55.619 0 0 1-20.367 76l-481.87 278.15a55.647 55.647 0 0 1-76-20.368L87.671 362.609a55.619 55.619 0 0 1 20.368-75.987z" fill="#FDFDFD" filter="url(#darkenFilter)" p-id="11987"></path>
    <path d="M1205.22 151.608a33.049 33.049 0 0 0-27.732-27.914c-15.388-3.199-15.374-6.355 0.028-9.455a33.049 33.049 0 0 0 27.914-27.718c3.213-15.374 6.369-15.36 9.469 0.042a33.049 33.049 0 0 0 27.732 27.915c15.374 3.198 15.36 6.34-0.042 9.44a33.049 33.049 0 0 0-27.915 27.732c-3.198 15.374-6.354 15.36-9.454-0.042zM52.645 748.18c6.452-33.694-4.503-60.135-32.894-79.31-28.378-19.19-25.755-25.559 7.869-19.092 33.624 6.453 60.01-4.517 79.157-32.964 19.147-28.434 25.501-25.81 19.049 7.883-6.453 33.694 4.517 60.136 32.908 79.311 28.377 19.19 25.754 25.544-7.87 19.077-33.623-6.452-60.009 4.531-79.156 32.965-19.147 28.433-25.502 25.81-19.063-7.87z m1302.29 9.02a47.3 47.3 0 0 0-52.225-21.266c-22.079 4.419-23.846 0.253-5.274-12.512a47.483 47.483 0 0 0 21.224-52.322c-4.42-22.121-0.253-23.889 12.484-5.289a47.3 47.3 0 0 0 52.238 21.266c22.079-4.419 23.832-0.253 5.26 12.512a47.483 47.483 0 0 0-21.223 52.323c4.418 22.12 0.252 23.888-12.485 5.288z m-919.468-69.45l183.646-104.462c5.443-3.142 13.186 0.084 17.31 7.21 4.11 7.126 3.03 15.459-2.413 18.6L450.364 713.547c-5.443 3.142-13.186-0.085-17.31-7.21-4.11-7.126-3.03-15.445 2.413-18.587z m48.254 78.89l335.086-193.451c5.443-3.143 13.354 0.35 17.647 7.799 4.306 7.448 3.38 16.047-2.062 19.19L499.305 793.641c-5.442 3.142-13.34-0.365-17.646-7.813-4.307-7.449-3.367-16.048 2.062-19.19zM704.582 414.383L399.5 590.511c-11.123 6.425-24.576 3.928-30.032-5.526L253.475 384.098c-5.513-9.468-0.898-22.36 10.24-28.784L568.77 179.186c11.138-6.425 24.576-3.928 30.033 5.527l115.992 200.9c5.47 9.455 0.898 22.346-10.24 28.77z" fill="#F0F1F2" filter="url(#darkenFilter)" p-id="11988"></path>
    <path d="M499.502 296.708a35.812 35.812 0 0 0 30.551 18.025 34.24 34.24 0 0 0 30.215-17.436c6.172-10.928 6.032-24.45-0.336-35.49-9.848-17.043-31.366-23.06-48.044-13.424-16.693 9.637-22.234 31.281-12.386 48.325z m97.518 37.663c-13.242-7.729-26.33-2.062-28.546 12.344l-17.38 113.524-145.071-85.118c-13.845-7.07-26.596 0.28-27.381 15.809l5.288 175.679 307.2-177.363-94.096-54.875z" fill="#FFFFFF" filter="url(#darkenFilter)" p-id="11989"></path>
</svg>
`;
// #endregion UI组件及样式

// #region 所有样式
const themeColor = '#0F1114';
const accentColor = '#5CB85C';
const secondaryColor = '#1D1E1F';
const style = document.createElement('style');

//倾向型点击按钮特效
style.textContent =  `
   .glow-button {
        background-color: ${accentColor};
        border: none;
        padding: 10px 20px;
        color: white;
        cursor: pointer;
        border-radius: 4px;
        transition: box-shadow 0.3s ease, transform 0.3s ease;
    }

    .glow-button:hover {
        box-shadow: 0 0 15px rgba(92, 184, 92, 0.7), 0 0 30px rgba(92, 184, 92, 0.5);
        transform: scale(1.05); /* 仅放大效果，不影响位置 */
    }
`;

style.textContent += `
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
        left: calc(50% - 50px); 
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
    .header-image-section, .preview-section, .settings-section {
        flex: 1;
        background: #1D1E1F;
        border-radius: 8px;
        margin: 10px;
        padding: 20px;
        color: #aaa;
        overflow-y: auto;
        max-height: calc(100vh - 220px);
    }
    .header-image-section h3, .preview-section h3, .settings-section h3 {
        color: #f3f3f3;
        margin-top: 5px; /* 让标题更靠近顶部 */
        font-size: 1.2rem;
        font-weight: bold;
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4), 0px 0px 8px rgba(92, 184, 92, 0.6); /* 增加质感和光效 */
    }
    .header-image-content label {
        display: block;
        margin-top: 10px;
        font-size: 0.85rem;
    }
    #header-image-input {
        margin-top: 10px;
    }
    .phone-png {
        display: block;
        width: 140%; /* 放大至140%，不建议使用 max-width */
        max-width: none; /* 取消 max-width 限制 */
        margin: 0 auto;
        position: relative;
        left: -20%; /* 左偏移调整以确保居中 */
        filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5));
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
    right: -4px; /* 向右移动 */
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

// #region comfyui前后端通信接口
const gctest = {
    type: 'generate_submit',
    data: {
        sub_type:"plugin",
        medias: [{
            "url_temp": "https://env-00jxh693vso2.normal.cloudstatic.cn/1730723029103.jpg?expire_at=1730723630&er_sign=6d24ee45e1ec23df910f710fad3b2002",
            "index": "10"
        }],
        texts: [{
            "input_des": "测试",
            "index": "16"
        }]
    }
}

async function request(url, data = null, method = 'POST') {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };


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
// #endregion comfyui前后端通信接口

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

function createUserInputFormComponent(title, inputField) {
    const userInputFormContainer = document.querySelector('.user-input-form-container');
    
    // 创建新的表单组件
    const formComponent = document.createElement('div');
    formComponent.className = 'user-form-component';
    formComponent.style.padding = '10px';
    formComponent.style.borderRadius = '4px';
    formComponent.style.backgroundColor = '#2E2E2E';
    formComponent.style.marginTop = '10px';
    formComponent.dataset.componentName = title; 

    // 创建标题栏
    const formTitle = document.createElement('p');
    formTitle.textContent = inputField.value || inputField.placeholder;
    formTitle.style.fontWeight = 'bold';

    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.value = '';
    userInput.style.width = '80%';
    userInput.style.padding = '10px';
    userInput.style.borderRadius = '6px';
    userInput.style.border = '1px solid #555';
    userInput.style.backgroundColor = '#2E2E2E';
    userInput.style.color = '#FFFFFF';
    userInput.style.fontSize = '1rem';
    userInput.style.fontWeight = 'bold';
    userInput.style.boxShadow = 'inset 2px 2px 5px rgba(0, 0, 0, 0.3), 2px 2px 5px rgba(0, 0, 0, 0.2)';
    userInput.style.outline = 'none';
    userInput.style.transition = 'all 0.3s ease';
    
    userInput.addEventListener('focus', () => {
        userInput.style.borderColor = '#5CB85C'; // 绿色边框
        userInput.style.boxShadow = 'inset 2px 2px 5px rgba(0, 0, 0, 0.3), 3px 3px 8px rgba(92, 184, 92, 0.5)';
    });
    
    userInput.addEventListener('blur', () => {
        userInput.style.borderColor = '#555'; // 恢复原边框颜色
        userInput.style.boxShadow = 'inset 2px 2px 5px rgba(0, 0, 0, 0.3), 2px 2px 5px rgba(0, 0, 0, 0.2)';
    });

    // 添加表单组件到用户输入表单容器
    formComponent.appendChild(formTitle);
    formComponent.appendChild(userInput);
    userInputFormContainer.appendChild(formComponent);

    // 实时更新标题
    inputField.addEventListener('input', () => {
        formTitle.textContent = inputField.value || inputField.placeholder; 
    });
}
// #endregion 公共组件

// #region 工作台主按钮及主容器
// 创建工作台按钮
const workbenchButton = document.createElement('button');
workbenchButton.innerText = '咔叽工作台';
workbenchButton.id = 'workbench-button';
workbenchButton.classList.add('glow-button'); 

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
// 创建作品参数模块容器
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
        // 创建作品输入信息面板内的节点组件
        const nodeComponent = document.createElement('div');
        nodeComponent.className = 'node-component';
        nodeComponent.style.border = '1px solid #444';
        nodeComponent.style.padding = '10px';
        nodeComponent.style.marginTop = '10px';
        nodeComponent.style.borderRadius = '4px';
        nodeComponent.style.backgroundColor = '#333';

        // 创建输入框并添加到nodeComponent
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = `请输入${selectedNode.name}`;
        inputField.style.width = '80%';
        inputField.style.padding = '10px';
        inputField.style.borderRadius = '6px';
        inputField.style.border = '1px solid #555';
        inputField.style.backgroundColor = '#2E2E2E';
        inputField.style.color = '#FFFFFF';
        inputField.style.fontSize = '1rem';
        inputField.style.fontWeight = 'bold';
        inputField.style.boxShadow = 'inset 2px 2px 5px rgba(0, 0, 0, 0.3), 2px 2px 5px rgba(0, 0, 0, 0.2)';
        inputField.style.outline = 'none';
        inputField.style.transition = 'all 0.3s ease';
        
        inputField.addEventListener('focus', () => {
            inputField.style.borderColor = '#5CB85C'; // 绿色边框
            inputField.style.boxShadow = 'inset 2px 2px 5px rgba(0, 0, 0, 0.3), 3px 3px 8px rgba(92, 184, 92, 0.5)';
        });
        
        inputField.addEventListener('blur', () => {
            inputField.style.borderColor = '#555'; // 恢复原边框颜色
            inputField.style.boxShadow = 'inset 2px 2px 5px rgba(0, 0, 0, 0.3), 2px 2px 5px rgba(0, 0, 0, 0.2)';
        });

        nodeComponent.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 5px 0; color: #EAEAEA; font-weight: bold;">
                <span>${selectedNode.name}</span>
                <button class="delete-button" style="background: none; border: none; color: #E74C3C; cursor: pointer; font-size: 0.9rem;">🗑️</button>
            </div>
            <p style="margin: 8px 0 4px; font-size: 0.85rem; color: #CCCCCC;">设置用户输入的提示性标题</p>
        `;
        nodeComponent.appendChild(inputField); // 添加输入框到组件中
        nodeComponent.dataset.componentName = selectedNode.name; // 为组件添加标识

        // 添加到动态容器
        dynamicContainer.appendChild(nodeComponent);

        // 动态生成用户输入表单中的同步组件
        createUserInputFormComponent(selectedNode.name, inputField);

        // 隐藏提示文本
        svgContains.style.display = 'none';
    }
});

// 使用事件委托方式添加删除按钮的点击事件
dynamicContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        const nodeComponent = event.target.closest('.node-component');
        
        // 获取组件名称并删除对应的用户输入表单组件
        const componentName = nodeComponent.dataset.componentName;
        removeUserInputFormComponent(componentName);

        // 删除作品输入信息中的组件
        nodeComponent.remove();

        // 如果动态容器为空时显示SVG
        if (dynamicContainer.children.length === 0) {
            svgContains.style.display = 'flex'; // 确保居中显示
        }
    }
});

// 删除用户输入表单中的同步组件
function removeUserInputFormComponent(title) {
    const userInputFormContainer = document.querySelector('.user-input-form-container');
    const formComponent = userInputFormContainer.querySelector(`.user-form-component[data-component-name="${title}"]`);
    
    if (formComponent) {
        formComponent.remove();
    }
}
// #endregion 创建作品参数面板

// #region 创建用户输入表单面板
const userInput = document.createElement('div');
userInput.className = 'panel';
userInput.style.position = 'relative';
userInput.innerHTML = `
    <h3>用户输入表单</h3>
    <p>此处模拟用户输入</p>
    <button class="panel-button glow-button">作品生成测试</button>
`;
const userTips = userInput.querySelector('h3');
userTips.appendChild(createTooltip('可以模拟用户输入，并测试生成'));

const mockUser = document.createElement('div');
mockUser.className = 'panel';
mockUser.innerHTML = `
    <h3>模拟用户生成</h3>
     <div id="moc-svg-contains" style="display: flex; justify-content: center; align-items: center; margin-top: 170px;">
         ${noneSvgCode2}
    </div>
`;

const generaateTips = mockUser.querySelector('h3');
generaateTips.appendChild(createTooltip('此处可以预览用户生成的内容'));

// 创建用户输入表单容器
const userInputFormContainer = document.createElement('div');
userInputFormContainer.className = 'user-input-form-container';
userInputFormContainer.style.padding = '10px';
userInputFormContainer.style.marginTop = '20px';
userInputFormContainer.style.maxHeight = '450px'; // 限制高度
userInputFormContainer.style.overflowY = 'auto'; // 启用垂直滚动
userInput.appendChild(userInputFormContainer);

// 添加内容到 panelsContainer
panelsContainer.appendChild(productInfo);
panelsContainer.appendChild(userInput);
panelsContainer.appendChild(mockUser);
// #endregion 创建用户输入表单面板

// #region 创建“作品发布”视图容器
const completeWrapContainer = document.createElement('div');
completeWrapContainer.className = 'complete-wrap-container';
completeWrapContainer.style.display = 'none';

// 创建头图设置区域
const headerImageSection = document.createElement('div');
headerImageSection.className = 'header-image-section';
headerImageSection.innerHTML = `
    <h3>头图设置</h3>
    <p>在此设置作品的头图。</p>
`;

// 创建预览区域
const previewSection = document.createElement('div');
previewSection.className = 'preview-section';
previewSection.innerHTML = `
    <h3>预览效果</h3>
    <div class="preview-content">
        <img src="kaji/workbench/phone.png" class="phone-png"/>
    </div>
`;

// 创建设置参数区域
const settingsSection = document.createElement('div');
settingsSection.className = 'settings-section';
settingsSection.innerHTML = `
    <h3>详情设置</h3>
`;

// 将三个区域添加到 completeWrapContainer
completeWrapContainer.appendChild(headerImageSection);
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
    <button id="next-button" class="glow-button">下一步</button>
    <button id="prev-button" style="display: none;">上一步</button>
    <button id="publish-button" class="glow-button" style="display: none;">发布作品</button>
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

// #region 功能逻辑
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
