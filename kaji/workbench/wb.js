/*咔叽工作台UI内容都放这一个文件里，后面发布时会对这个文件做代码混淆，由于这样会导致文件过长，为方便后期维护用regin/endregin对逻辑分块，可折叠*/
import { api } from '../../../scripts/api.js'
import { app } from '../../../scripts/app.js'

// #region UI组件及样式

// #region svg代码统一存放
//空表单页面
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
//空图页面
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
//删除图
const deleteSvgCode = `
<svg t="1731562937821" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2642" width="20" height="20">
    <defs>
        <filter id="darkenFilter1">
            <feComponentTransfer>
                <feFuncR type="linear" slope="0.5"/>
                <feFuncG type="linear" slope="0.5"/>
                <feFuncB type="linear" slope="0.5"/>
            </feComponentTransfer>
        </filter>
    </defs>

    <path d="M690.7392 937.4208H319.8464c-85.5552 0-155.136-69.5808-155.136-155.136V293.2224c0-19.8144 16.0256-35.84 35.84-35.84h609.4848c19.8144 0 35.84 16.0256 35.84 35.84v489.0624c0.0512 85.5552-69.5808 155.136-155.136 155.136zM236.3904 329.0624v453.2224c0 46.0288 37.4272 83.456 83.456 83.456h370.8928c46.0288 0 83.456-37.4272 83.456-83.456V329.0624H236.3904z" fill="#DCDCDC" filter="url(#darkenFilter1)" p-id="2643"></path>
    <path d="M903.3728 329.0624H107.264c-19.8144 0-35.84-16.0256-35.84-35.84s16.0256-35.84 35.84-35.84h796.0576c19.8144 0 35.84 16.0256 35.84 35.84s-16.0256 35.84-35.7888 35.84z" fill="#DCDCDC" filter="url(#darkenFilter1)" p-id="2644"></path>
    <path d="M358.0928 744.2432c-19.8144 0-35.84-16.0256-35.84-35.84V453.2224c0-19.8144 16.0256-35.84 35.84-35.84s35.84 16.0256 35.84 35.84v255.1808c0 19.8144-16.0256 35.84-35.84 35.84zM506.1632 744.2432c-19.8144 0-35.84-16.0256-35.84-35.84V453.2224c0-19.8144 16.0256-35.84 35.84-35.84s35.84 16.0256 35.84 35.84v255.1808c0 19.8144-16.0256 35.84-35.84 35.84zM657.7664 744.2432c-19.8144 0-35.84-16.0256-35.84-35.84V453.2224c0-19.8144 16.0256-35.84 35.84-35.84s35.84 16.0256 35.84 35.84v255.1808c0 19.8144-16.0768 35.84-35.84 35.84z" fill="#98E593" filter="url(#darkenFilter1)" p-id="2645"></path>
    <path d="M734.8736 329.0624H266.8544c-11.6736 0-22.5792-5.6832-29.2864-15.2064s-8.3968-21.7088-4.4544-32.6656c22.2208-62.4128 92.416-207.5648 263.4752-207.5648 122.9824 0 216.8832 71.2704 271.5136 206.1312 4.4544 11.0592 3.1744 23.6032-3.4816 33.4848a35.95264 35.95264 0 0 1-29.7472 15.8208z m-412.928-71.68h355.7888c-43.2128-74.4448-103.9872-112.0768-181.1968-112.0768-91.9552 0-145.1008 58.0096-174.592 112.0768z" fill="#DCDCDC" filter="url(#darkenFilter1)" p-id="2646"></path>
</svg>
`;
//节点图
const nodeSvgCode = `
<svg t="1731563064157" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9808" width="24" height="24">
    <defs>
        <filter id="darkenFilter2">
            <feComponentTransfer>
                <feFuncR type="linear" slope="0.7"/>
                <feFuncG type="linear" slope="0.7"/>
                <feFuncB type="linear" slope="0.7"/>
            </feComponentTransfer>
        </filter>
    </defs>

    <path d="M512 780.52376322C363.70327653 780.52376322 243.47623678 660.29672347 243.47623678 512 243.47623678 363.70327653 363.70327653 243.47623678 512 243.47623678c148.29672347 0 268.52376322 120.22703976 268.52376322 268.52376322 0 148.29672347-120.22703976 268.52376322-268.52376322 268.52376322z m0-161.11425794a107.40950529 107.40950529 0 1 0 0-214.81901057 107.40950529 107.40950529 0 0 0 0 214.81901057z" fill="#67C23A" filter="url(#darkenFilter2)" p-id="9809"></path>
</svg>
`;
//标题标识
const titleSvgCode = `
<svg t="1731566258336" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22103" width="40" height="40">
    <defs>
        <filter id="darkenFilter3">
            <feComponentTransfer>
                <feFuncR type="linear" slope="0.7"/>
                <feFuncG type="linear" slope="0.7"/>
                <feFuncB type="linear" slope="0.7"/>
            </feComponentTransfer>
        </filter>
    </defs>

    <path d="M537.6 332.8l153.6 153.6-153.6 153.6-153.6-153.6 153.6-153.6z" fill="#98E593" filter="url(#darkenFilter3)" p-id="22104"></path>
</svg>
`;

//提示icon
const tipSvgCode = `
<svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
    <!-- 添加滤镜 -->
    <defs>
        <filter id="darkenFilter4">
            <feComponentTransfer>
                <feFuncR type="linear" slope="0.7"/>
                <feFuncG type="linear" slope="0.7"/>
                <feFuncB type="linear" slope="0.7"/>
            </feComponentTransfer>
        </filter>
    </defs>

    <path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="#7ed321" stroke="#9b9b9b" stroke-width="4" stroke-linejoin="round" filter="url(#darkenFilter4)"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 11C25.3807 11 26.5 12.1193 26.5 13.5C26.5 14.8807 25.3807 16 24 16C22.6193 16 21.5 14.8807 21.5 13.5C21.5 12.1193 22.6193 11 24 11Z" fill="#ffffff" filter="url(#darkenFilter4)"/>
    <path d="M24.5 34V20H23.5H22.5" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#darkenFilter4)"/>
    <path d="M21 34H28" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#darkenFilter4)"/>
</svg>
`;

// #endregion UI组件及样式

// #region 所有样式
const themeColor = '#0F1114';
const accentColor = '#5CB85C';
const secondaryColor = '#1D1E1F';
const style = document.createElement('style');

//倾向型点击按钮特效
style.textContent = `
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
    /* 作品发布视图样式 */
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
    .image-thumbnail {
        width: 70px;
        height: 70px;
        background-size: cover;
        background-position: center;
        border-radius: 12px;
        position: relative;
        cursor: grab;
        border: 2px solid #5CB85C;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);
        transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
    }

    /* 鼠标悬停时，增加微光和放大效果 */
    .image-thumbnail:hover {
        transform: scale(1.05);
        box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3), inset 0px 4px 10px rgba(255, 255, 255, 0.05);
        filter: brightness(1.1) blur(2px); /* 微光效果 */
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
    /* Switch 样式 */
    .switch {
        position: relative;
        display: inline-block;
        width: 50px; 
        height: 30px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 22px; 
        width: 22px;  
        border-radius: 50%;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: #5CB85C;
    }

    input:checked + .slider:before {
        transform: translateX(20px);
    }

    #search-input::placeholder {
        color: #CCCCCC; 
        opacity: 1;
    }

    /* 悬停和聚焦时的样式 */
    #search-input:hover {
        background-color: #555;
        border-color: #67D67D;
    }

    #search-input:focus {
        background-color: #555; 
        border-color: #67D67D;
        box-shadow: 0 0 8px rgba(92, 184, 92, 0.6);
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

// #region 前后端通信接口

// 请求url
//生成一个全局的客户端标识，客户端自己生图用，不用关心百分百的唯一性
function generateClientId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

const clientId = generateClientId();
const hostname = window.location.hostname; // 获取主机名
const port = window.location.port;         // 获取端口号
const protocol = window.location.protocol; // 获取协议
const baseUrl = port ? `${protocol}//${hostname}:${port}` : `${protocol}//${hostname}`;
const wsBaseUrl = port ? `ws://${hostname}:${port}` : `ws://${hostname}`;


console.log(`Hostname: ${hostname}`);
console.log(`Port: ${port}`);
console.log("baseUrl:", baseUrl);

const END_POINT_URL_FOR_PRODUCT_1 = "/plugin/getProducts";      //获取作品
const END_POINT_URL1 = "/kaji-upload-file/uploadProduct"        //上传作品
const END_POINT_URL_FOR_PRODUCT_3 = "/plugin/deleteProduct";    //删除作品

//临时测试数据
const TEST_UID = "66c981879d9f915ad268680a"
// 动态处理 HTTP 和 WebSocket 请求
async function request(endpoint, data = {}, method = 'POST', token = '') {
    // WebSocket 请求特殊处理
    if (endpoint === '/ws') {
        return connectWebSocket(endpoint, data);
    }

    // 处理普通 HTTP 请求
    let url = `${baseUrl}${endpoint}`;
    if (method === 'GET' || method === 'HEAD') {
        if (token) {
            data.token = token;
        }
        const queryParams = new URLSearchParams(data).toString();
        if (queryParams) {
            url += `?${queryParams}`;
        }
    }

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...(method !== 'GET' && method !== 'HEAD' && { body: JSON.stringify(data) }),
    };
    console.log("请求url和options: ", url, options);
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 处理 `/view` 返回的 HTML 格式数据
        if (endpoint === '/view') {
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        }

        // 对于其他请求，继续返回 JSON 数据
        return await response.json();
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
}



// WebSocket
function connectWebSocket(endpoint, data) {
    const wsUrl = `${wsBaseUrl}${endpoint}?${new URLSearchParams(data).toString()}`;
    console.log("Connecting to WebSocket:", wsUrl);

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
        console.log("WebSocket connected");
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    ws.onclose = (event) => {
        console.warn(`WebSocket closed: code=${event.code}, reason=${event.reason}`);
    };

    return ws; 
}



//请求获取系统中所有节点信息及其可用参数
async function getObjectInfo() {
    const res = await request("/object_info", null, 'GET');
    if (res) {
        console.log('请求 Comfyui 获取的object_info: ', res);
        return res;
    } else {
        console.error('请求 Comfyui object_info信息失败: ', res);
    }
}

//请求获取所有作品
async function getProduct(data) {
    const res = await request(END_POINT_URL_FOR_PRODUCT_1, data);
    if (res?.data?._id) {
        console.log('请求获取作品: ', res.data);
    } else {
        console.error('请求获取作品失败: ', res);
    }
}

//请求删除作品
async function deleteProduct(data) {
    const res = await request(END_POINT_URL_FOR_PRODUCT_3, data);
    if (res?.data?._id) {
        console.log('请求删除作品 ', res.data);
    } else {
        console.error('请求删除作品失败: ', res);
    }
}

//请求发布作品
async function uploadProduct(data) {
    const res = await request(END_POINT_URL1, data);
    if (res) {
        return res;
        console.log('请求发布作品 ', res.data);
    } else {
        console.error('请求发布作品失败: ', res);
    }
}

//请求建立websocket连接
async function getWss() {
    try {
        let data = {
            "clientId": clientId
        }
        const res = await request("/ws", data, 'GET'); // 请求 WebSocket 连接信息
        if (!res?.url) {
            console.error("WebSocket URL 未获取到:", res);
            return;
        }

        // 创建 WebSocket 实例
        const ws = new WebSocket(res.url);

        // 监听 WebSocket 事件
        ws.onopen = () => {
            console.log("WebSocket 连接成功");
        };

        ws.onerror = (error) => {
            console.error("WebSocket 错误:", error);
        };

        ws.onclose = (event) => {
            console.warn(`WebSocket 连接关闭: code=${event.code}, reason=${event.reason}`);
        };

        return ws; // 返回 WebSocket 实例以便后续使用
    } catch (error) {
        console.error("建立 WebSocket 连接失败:", error);
    }
}
const ws = await getWss();

//请求生图
async function postPrompt(output) {
    // 找到 `KSampler` 节点，随机生成一个新的 seed 值，不然第二次生图缓存直接跳过了
    for (const item of Object.values(output)) {
        if (item.class_type === "KSampler" && item.inputs) {
            item.inputs.seed = Math.floor(10 ** 14 + Math.random() * 9 * 10 ** 14);
            console.log("Updated seed:", item.inputs.seed);
        }
    }
    let data = {
        "client_id": clientId,
        "prompt": output,
        "workflow":workflow,
    }
    const res = await request("/prompt", data,'POST');
    if (res) {
        console.log('请求 Comfyui 生图: ', res);
        return res;
    } else {
        console.error('请求 Comfyui 生图失败: ', res);
    }
}

//预览生成结果
async function getView(data) {
    const res = await request("/view", data, 'GET');
    if (res) {
        console.log('请求 Comfyui view: ', res.data);
        return res;
    } else {
        console.error('请求 Comfyui view信息失败: ', res);
    }
}


//前端直传。MD有跨域问题，暂时不知道咋搞跨域，先传到python端吧。
//下面是直传的接口，等接了扩展存储，用下面的方法直传试一下。
//采用文件流的方式传输，base64数据太大，请求不了
async function uploadSingleImage(file) {
    const endpoint = '/kaji-upload-file/uploadFile';
    const formData = new FormData();
    formData.append('file', file);

    console.log('开始上传文件...');

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('文件上传成功，返回数据：', result);
        return result;
    } catch (error) {
        console.error('文件上传失败:', error.message);
        throw error;
    }
}


// #endregion comfyui前后端通信接口

// #region 公共组件/函数
//UUID v4版全球每秒生成10的9次方个UUID，持续生成30亿年，碰撞的概率仍然接近0，远远小于2的122次方的的uuid的理论总数
function generateUUIDv4() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);

    // 设置版本号（第6位）为 4
    array[6] = (array[6] & 0x0f) | 0x40;

    // 设置变体号（第8位的高两位）为 10
    array[8] = (array[8] & 0x3f) | 0x80;

    // 转换为 UUID 字符串
    return [...array]
        .map((b, i) =>
            (b.toString(16).padStart(2, '0') + ((i === 3 || i === 5 || i === 7 || i === 9) ? '-' : ''))
        )
        .join('');
}

//通用loading框
function showLoading(message = "加载中...") {
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '99999999';
    overlay.id = 'loading-overlay';

    // 创建加载框容器
    const loadingContainer = document.createElement('div');
    loadingContainer.style.backgroundColor = '#333';
    loadingContainer.style.borderRadius = '8px';
    loadingContainer.style.padding = '20px';
    loadingContainer.style.width = '260px';
    loadingContainer.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.5), 0px 0px 20px rgba(92, 184, 92, 0.2)';
    loadingContainer.style.textAlign = 'center';
    loadingContainer.style.color = '#dcdcdc';
    loadingContainer.style.position = 'relative';

    // 添加加载动画
    const spinner = document.createElement('div');
    spinner.style.border = '4px solid #444';
    spinner.style.borderTop = '4px solid #5CB85C';
    spinner.style.borderRadius = '50%';
    spinner.style.width = '40px';
    spinner.style.height = '40px';
    spinner.style.margin = '0 auto 20px';
    spinner.style.animation = 'spin 1s linear infinite';

    // 添加加载文本
    const loadingText = document.createElement('p');
    loadingText.textContent = message;
    loadingText.style.fontSize = '1rem';
    loadingText.style.margin = '0';
    loadingText.style.lineHeight = '1.4';

    // 添加样式到页面
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // 组装加载框
    loadingContainer.appendChild(spinner);
    loadingContainer.appendChild(loadingText);
    overlay.appendChild(loadingContainer);

    // 将加载框添加到页面
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
}

//提示框
function createTooltip(text) {
    const tooltipContainer = document.createElement('span');
    tooltipContainer.className = 'tooltip-container';

    // 创建一个包含 SVG 图标的元素，直接使用 $(tipSvgCode)
    const tooltipIcon = document.createElement('span');
    tooltipIcon.className = 'tooltip-icon';
    tooltipIcon.innerHTML = `${tipSvgCode}`;
    tooltipIcon.style.transform = 'translateY(5px)';  

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

//通用的dialog对话框。支持单按钮和双按钮
function confirmDialog(message, onConfirm, singleButton = false) {
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '99999999';

    // 创建对话框容器
    const dialog = document.createElement('div');
    dialog.style.backgroundColor = '#333';
    dialog.style.borderRadius = '8px';
    dialog.style.padding = '20px';
    dialog.style.width = '320px';
    dialog.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.5), 0px 0px 20px rgba(92, 184, 92, 0.2)';
    dialog.style.textAlign = 'center';
    dialog.style.color = '#dcdcdc';
    dialog.style.position = 'relative';

    // 添加对话框标题和内容
    const dialogText = document.createElement('p');
    dialogText.textContent = message;
    dialogText.style.fontSize = '1rem';
    dialogText.style.marginBottom = '20px';
    dialogText.style.lineHeight = '1.4';

    // 创建按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = singleButton ? 'center' : 'space-between';
    buttonContainer.style.marginTop = '20px';
    buttonContainer.style.gap = '10px';

    // 确认按钮
    const confirmButton = document.createElement('button');
    confirmButton.textContent = singleButton ? '关闭' : '确认';
    confirmButton.style.width = '48%'; // 设置宽度和双按钮一致
    confirmButton.style.padding = '10px 0';
    confirmButton.style.backgroundColor = '#5CB85C';
    confirmButton.style.color = '#fff';
    confirmButton.style.border = 'none';
    confirmButton.style.borderRadius = '5px';
    confirmButton.style.cursor = 'pointer';
    confirmButton.style.fontWeight = 'bold';
    confirmButton.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
    confirmButton.style.transition = 'all 0.3s ease';
    confirmButton.addEventListener('mouseenter', () => {
        confirmButton.style.backgroundColor = '#4cae4c';
    });
    confirmButton.addEventListener('mouseleave', () => {
        confirmButton.style.backgroundColor = '#5CB85C';
    });

    // 取消按钮
    let cancelButton;
    if (!singleButton) {
        cancelButton = document.createElement('button');
        cancelButton.textContent = '取消';
        cancelButton.style.width = '48%';
        cancelButton.style.padding = '10px 0';
        cancelButton.style.backgroundColor = '#444';
        cancelButton.style.color = '#fff';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '5px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.fontWeight = 'bold';
        cancelButton.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
        cancelButton.style.transition = 'all 0.3s ease';
        cancelButton.addEventListener('mouseenter', () => {
            cancelButton.style.backgroundColor = '#555';
        });
        cancelButton.addEventListener('mouseleave', () => {
            cancelButton.style.backgroundColor = '#444';
        });

        // 取消按钮点击事件
        cancelButton.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
    }

    // 关闭对话框功能
    const closeDialog = () => {
        document.body.removeChild(overlay);
    };

    // 确认按钮点击事件
    confirmButton.addEventListener('click', () => {
        closeDialog();
        if (!singleButton && typeof onConfirm === 'function') {
            onConfirm();
        }
    });

    // 组装对话框
    buttonContainer.appendChild(confirmButton);
    if (!singleButton) {
        buttonContainer.appendChild(cancelButton);
    }
    dialog.appendChild(dialogText);
    dialog.appendChild(buttonContainer);
    overlay.appendChild(dialog);

    // 将对话框添加到页面
    document.body.appendChild(overlay);
}


//全局来记录用户输入
const userInputData = {}

//TODO 1.构建表单元数据同作品一块上传

function createUserInputFormComponent(title, detail, inputField) {
    const userInputFormContainer = document.querySelector('.user-input-form-container');

    // 创建表单组件容器
    const formComponent = createFormComponent(title);
    const formHeader = createFormHeader(title, inputField);

    // 创建输入框
    let { userInput, previewContainer } = createUserInput(detail,title);

    // 添加标题栏、预览容器（如果存在）和输入框到表单组件
    formComponent.appendChild(formHeader);
    if (previewContainer) formComponent.appendChild(previewContainer);
    formComponent.appendChild(userInput);

    // 添加到用户输入表单容器
    userInputFormContainer.appendChild(formComponent);

    // 实时更新标题
    inputField.addEventListener('input', () => {
        formHeader.querySelector('#form-title').textContent = inputField.value || inputField.placeholder;
    });
}

// 创建表单组件容器
function createFormComponent(title) {
    const formComponent = document.createElement('div');
    formComponent.className = 'user-form-component';
    formComponent.style.padding = '12px 8px';
    formComponent.style.borderRadius = '6px';
    formComponent.style.backgroundColor = '#2E2E2E';
    formComponent.style.marginTop = '8px';
    formComponent.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.2), inset 2px 2px 6px rgba(0, 0, 0, 0.3)';
    formComponent.style.display = 'flex';
    formComponent.style.flexDirection = 'column';
    formComponent.style.justifyContent = 'space-between';
    formComponent.dataset.componentName = title;

    return formComponent;
}

// 创建标题栏
function createFormHeader(title, inputField) {
    const formHeader = document.createElement('div');
    formHeader.style.display = 'flex';
    formHeader.style.justifyContent = 'flex-start';
    formHeader.style.alignItems = 'center';

    // 创建 SVG 图标容器
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = `${titleSvgCode}`;
    svgContainer.style.marginRight = '-5px';

    // 创建标题
    const formTitle = document.createElement('p');
    formTitle.textContent = inputField.value || inputField.placeholder;
    formTitle.id = 'form-title'; 
    formTitle.style.fontWeight = '500';
    formTitle.style.fontSize = '1.0rem';
    formTitle.style.color = '#dcdcdc';
    formTitle.style.margin = '0';
    formTitle.style.paddingBottom = '5px';

    // 添加 SVG 图标和标题到标题栏
    formHeader.appendChild(svgContainer);
    formHeader.appendChild(formTitle);

    return formHeader;
}

// 创建用户输入框（根据 detail 判断类型）
function createUserInput(detail, title) {
    let userInput, previewContainer;

    // 解析标题，分离 key 和子项
    const [parentKey, subKey] = title.split(':');
    if (!userInputData[parentKey]) {
        userInputData[parentKey] = {};
    }

    if (Array.isArray(detail) && detail.length > 1 && detail[1].image_upload) {
        userInput = document.createElement('input');
        userInput.type = 'file';
        userInput.accept = 'image/*';
        userInput.multiple = true;

        // 创建预览容器
        previewContainer = createImagePreviewContainer(userInput);

        // 监听文件输入框的变化
        userInput.addEventListener('change', () => {
            const files = Array.from(userInput.files).map(file => file.name);
            userInputData[parentKey][subKey] = files;
            console.log('User input data updated:', userInputData);
        });
    } else if (Array.isArray(detail) && Array.isArray(detail[0]) && detail[0].length > 0) {
        // 下拉框输入框
        userInput = document.createElement('select');

        // 添加选项
        detail[0].forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            userInput.appendChild(optionElement);
        });

        // 监听下拉框的变化
        userInput.addEventListener('change', () => {
            userInputData[parentKey][subKey] = userInput.value;
            console.log('User input data updated:', userInputData);
        });
    } else {
        const [inputType, inputParams] = detail;
        userInput = document.createElement('input');

        if (inputType === 'INT' || inputType === 'FLOAT') {
            userInput.type = 'number';
            userInput.value = inputParams.default || '';
            userInput.min = inputParams.min !== undefined ? inputParams.min : '';
            userInput.max = inputParams.max !== undefined ? inputParams.max : '';
            userInput.step = inputType === 'FLOAT' ? '0.01' : '1';
        } else if (inputType === 'STRING') {
            userInput.type = 'text';
            userInput.value = inputParams.default || '';
        } else {
            userInput.type = 'text';
            userInput.value = '';
        }

        // 监听输入框的变化
        userInput.addEventListener('input', () => {
            userInputData[parentKey][subKey] = userInput.value;
            console.log('User input data updated:', userInputData);
        });
    }

    // 设置输入框样式
    setUserInputStyle(userInput);

    return { userInput, previewContainer };
}

// 设置用户输入框的样式
function setUserInputStyle(userInput) {
    userInput.style.width = '90%';
    userInput.style.padding = '10px';
    userInput.style.borderRadius = '6px';
    userInput.style.border = '1px solid #555';
    userInput.style.backgroundColor = '#2E2E2E';
    userInput.style.color = '#FFFFFF';
    userInput.style.fontSize = '0.9rem';
    userInput.style.fontWeight = 'bold';
    userInput.style.boxShadow = 'inset 2px 2px 5px rgba(0, 0, 0, 0.3), 2px 2px 5px rgba(0, 0, 0, 0.2)';
    userInput.style.outline = 'none';
    userInput.style.transition = 'all 0.3s ease';

    addFocusBlurListener(userInput);
}

// 创建图像预览容器，支持删除图像
function createImagePreviewContainer(userInput) {
    const previewContainer = document.createElement('div');
    previewContainer.style.display = 'flex';
    previewContainer.style.flexWrap = 'wrap';
    previewContainer.style.gap = '10px';
    previewContainer.style.marginTop = '10px';

    userInput.addEventListener('change', () => {
        previewContainer.innerHTML = ''; // 清空之前的预览

        Array.from(userInput.files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imgContainer = document.createElement('div');
                    imgContainer.style.position = 'relative';
                    imgContainer.style.display = 'inline-block';

                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '80px';
                    img.style.height = '80px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '6px';
                    img.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
                    img.alt = file.name;

                    const deleteButton = createDeleteButton(imgContainer, userInput);

                    imgContainer.appendChild(img);
                    imgContainer.appendChild(deleteButton);
                    previewContainer.appendChild(imgContainer);
                };
                reader.readAsDataURL(file);
            }
        });
    });

    return previewContainer;
}

// 创建删除按钮，点击后删除图像并清空文件输入框内容
function createDeleteButton(imgContainer, userInput) {
    const deleteButton = document.createElement('span');
    deleteButton.textContent = '×';
    deleteButton.style.position = 'absolute';
    deleteButton.style.top = '-5px';
    deleteButton.style.right = '-5px';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.color = 'white';
    deleteButton.style.backgroundColor = 'red';
    deleteButton.style.borderRadius = '50%';
    deleteButton.style.padding = '2px 5px';
    deleteButton.style.fontSize = '12px';
    deleteButton.style.lineHeight = '1';

    deleteButton.addEventListener('click', () => {
        imgContainer.remove();   // 移除图像预览
        userInput.value = '';    // 清空输入框内容
    });

    return deleteButton;
}

// 通用的焦点和失焦处理函数
function addFocusBlurListener(inputElement) {
    inputElement.addEventListener('focus', () => {
        inputElement.style.borderColor = '#5CB85C'; // 绿色边框
        inputElement.style.boxShadow = 'inset 2px 2px 5px rgba(0, 0, 0, 0.3), 3px 3px 8px rgba(92, 184, 92, 0.5)';
    });

    inputElement.addEventListener('blur', () => {
        inputElement.style.borderColor = '#555'; 
        inputElement.style.boxShadow = 'inset 2px 2px 5px rgba(0, 0, 0, 0.3), 2px 2px 5px rgba(0, 0, 0, 0.2)';
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
//---------------------------------------数据处理-----------------------------------------------
//获取当前工作流output信息
const graphPrompt = await app.graphToPrompt();
const output = graphPrompt.output; 
console.log("graphToPrompt output:",output)
const workflow = graphPrompt.workflow; 
//格式化，当过滤数据用，这些项在可选节点中显示
function restructureData(inputData) {
    const result = new Map();

    for (let key in inputData) {
        const node = inputData[key];
        const classType = node.class_type;
        const inputs = node.inputs;
        // 创建一个 class_type 的条目，如果不存在则初始化为一个空对象
        if (!result.has(classType)) {
            result.set(classType, {});
        }
        for (let inputKey in inputs) {
            const inputValue = inputs[inputKey];

            // 只记录不是数组的项，包含数组的项是link数据
            if (!Array.isArray(inputValue)) {
                result.get(classType)[inputKey] = inputValue;
            }
        }
    }

    return result;
}
const fliterData = restructureData(output)
console.log("节点过滤数据：",fliterData)
//获取系统中所有节点对应参数，供表单使用，上面工作流信息只包含当前已选参数，手动过滤
const allObjectInfo = await getObjectInfo()
//重构数据对应表单输入,只考虑可交互数据，link数据不考虑（这里将input内包含二项数组的视为连接数据）
function filterObjectInfo(allObjectInfo, filterData) {
    const nodes = [];

    // 遍历所有的 filterData 中的 class_type
    console.log("filterData", filterData);
    filterData.forEach((requiredFields, classType) => {
        // 检查 allObjectInfo 中是否包含该 classType
        if (allObjectInfo[classType] && allObjectInfo[classType].input) {
            const requiredInputs = allObjectInfo[classType].input.required || {};
            const optionalInputs = allObjectInfo[classType].input.optional || {};

            // 合并 required 和 optional inputs
            const allInputs = { ...requiredInputs, ...optionalInputs };

            // 遍历 requiredFields 中的 key
            Object.keys(requiredFields).forEach((key) => {
                // 检查 allInputs 中是否存在该 key
                if (allInputs[key]) {
                    // 获取详细信息
                    const detailInfo = allInputs[key];
                    const detail = Array.isArray(detailInfo) ? detailInfo : [detailInfo];

                    nodes.push({
                        id: `${classType}_${key}`, // 随便标识一下
                        name: `${classType}:${key}`,
                        detail: detail
                    });
                }
            });
        }
    });

    return nodes;
}

const nodes = filterObjectInfo(allObjectInfo,fliterData)
console.log("获取可控制输入的节点",nodes)

//----------------------------------------------------------------------------------------------
// 创建作品参数模块容器
const productInfo = document.createElement('div');
productInfo.className = 'panel';
productInfo.style.position = 'relative';
productInfo.innerHTML = `
    <h3>作品输入信息</h3>
    <div style="display: flex; align-items: center; margin-top: 20px;">
        <label for="search-input" style="flex-shrink: 0; margin-right: 10px;">选择输入节点</label>
        <div id="custom-select" style="flex-grow: 1; position: relative; width: 145px;">
            <input type="text" id="search-input" placeholder="请选择/搜索节点" style="
                width: 100%; 
                height: 27px; 
                padding: 2px 8px; 
                box-sizing: border-box; 
                background-color: #444; 
                border: 1px solid #5CB85C; 
                color: #FFFFFF;
                font-weight: bold;
                border-radius: 4px;
                outline: none;
                transition: all 0.3s ease;
            ">

            <div id="dropdown" style="position: absolute; top: 100%; left: 0; width: 100%; max-height: 200px; overflow-y: auto; background: #333; color: #fff; border: 1px solid #555; border-radius: 4px; display: none; z-index: 99999;">
                ${nodes.map(node => `<div class="dropdown-item" data-value="${node.id}" style="padding: 8px; cursor: pointer;">${node.name}</div>`).join('')}
            </div>
        </div>
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

// 获取搜索输入框和下拉菜单
const searchInput = productInfo.querySelector('#search-input');
const dropdown = productInfo.querySelector('#dropdown');
const dropdownItems = productInfo.querySelectorAll('.dropdown-item');
const svgContains = productInfo.querySelector('#svg-contains');

// 显示或隐藏下拉菜单
searchInput.addEventListener('focus', () => {
    dropdown.style.display = 'block';
});

searchInput.addEventListener('blur', () => {
    setTimeout(() => {
        dropdown.style.display = 'none';
    }, 200);
});

// 监听输入框的输入事件，进行过滤
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    dropdownItems.forEach(item => {
        const itemName = item.textContent.toLowerCase();
        if (itemName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// 选择下拉项
dropdownItems.forEach(item => {
    item.addEventListener('click', (event) => {
        const selectedNodeId = event.target.dataset.value;
        const selectedNode = nodes.find(node => node.id === selectedNodeId);

        if (selectedNode) {
            searchInput.value = selectedNode.name; // 将选中的节点名称显示在输入框中
            dropdown.style.display = 'none'; // 隐藏下拉菜单

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
            inputField.placeholder = `此处是${selectedNode.name}的提示标题`;
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
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 5px 0px;">
                    <div style="display: flex; align-items: center; gap: 2px;">
                        ${nodeSvgCode}
                        <span style="font-size: 1.0rem; font-weight: 500; color: #dcdcdc;">${selectedNode.name}</span>
                    </div>
                    <button class="delete-button" style="background: none; border: none; cursor: pointer; padding: 0 8px; border-radius: 50%; transition: transform 0.2s ease;">
                        ${deleteSvgCode}
                    </button>
                </div>
                <p style="margin-top: 6px; font-size: 0.8rem; color: #b0b0b0; line-height: 1.4; text-align: left; font-weight: 400;">
                    设置用户输入的提示性标题
                </p>
            `;

            const deleteButton = nodeComponent.querySelector('.delete-button');

            // 添加按钮的 hover 动画效果
            deleteButton.addEventListener('mouseenter', () => {
                deleteButton.style.transform = 'scale(1.1)';
            });
            deleteButton.addEventListener('mouseleave', () => {
                deleteButton.style.transform = 'scale(1)';
            });

            // 删除按钮的点击效果
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();

                confirmDialog('确认删除此节点吗？', () => {
                    const nodeComponent = event.target.closest('.node-component');
                    const componentName = nodeComponent.dataset.componentName;

                // 从 userInputData 中移除对应的参数
                const [parentKey, subKey] = componentName.split(':');
                if (userInputData[parentKey]) {
                    delete userInputData[parentKey][subKey]; // 删除对应的子键
                    // 如果主键下没有子项，则删除主键
                    if (Object.keys(userInputData[parentKey]).length === 0) {
                        delete userInputData[parentKey];
                    }
                }

                console.log('Updated userInputData after deletion:', userInputData);

                    // 删除用户输入表单组件
                    removeUserInputFormComponent(componentName);

                    // 删除作品输入信息中的组件
                    nodeComponent.remove();

                    // 如果动态容器为空时显示SVG
                    if (dynamicContainer.children.length === 0) {
                        svgContains.style.display = 'flex'; // 确保居中显示
                    }
                });
            });

            nodeComponent.appendChild(inputField); // 添加输入框到组件中
            nodeComponent.dataset.componentName = selectedNode.name; // 为组件添加标识

            // 添加到动态容器
            dynamicContainer.appendChild(nodeComponent);

            // 动态生成用户输入表单中的同步组件
            createUserInputFormComponent(selectedNode.name, selectedNode.detail, inputField);

            // 隐藏提示文本
            svgContains.style.display = 'none';
        }
    });
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
    <button class="panel-button glow-button" id="generate-test-button">作品生成测试</button>
`;
const userTips = userInput.querySelector('h3');
userTips.appendChild(createTooltip('可以模拟用户输入，并测试生成'));

// 调用生图接口
const generateTestButton = userInput.querySelector('#generate-test-button');
generateTestButton.addEventListener('click', async () => {
    try {
        // 调用 postPrompt 之前，先用用户输入表单的值来更新 output 的值
        const updatedOutput = updateOutputWithUserInput(output, userInputData);

        console.log("更新后的 output 数据:", JSON.stringify(updatedOutput, null, 2));

        // 发起生图请求
        const result = await postPrompt(updatedOutput);
    } catch (error) {
        console.error("生成失败:", error);
    }
});

//用用户输入更新生图prompt
function updateOutputWithUserInput(output, userInputData) {
    const updatedOutput = JSON.parse(JSON.stringify(output)); // 深拷贝 output

    // 遍历 output 的每个节点
    Object.keys(updatedOutput).forEach(nodeId => {
        const node = updatedOutput[nodeId];
        const classType = node.class_type;

        // 如果 userInputData 中有对应的 classType
        if (userInputData[classType]) {
            const inputs = node.inputs || {};
            const optional = node.optional || {};

            // 更新 inputs 字段
            Object.keys(inputs).forEach(inputKey => {
                if (userInputData[classType][inputKey] !== undefined) {
                    inputs[inputKey] = userInputData[classType][inputKey];
                    console.log(`更新节点 ${nodeId} 的 inputs.${inputKey} 为:`, userInputData[classType][inputKey]);
                }
            });

            // 更新 optional 字段
            Object.keys(optional).forEach(optionalKey => {
                if (userInputData[classType][optionalKey] !== undefined) {
                    optional[optionalKey] = userInputData[classType][optionalKey];
                    console.log(`更新节点 ${nodeId} 的 optional.${optionalKey} 为:`, userInputData[classType][optionalKey]);
                }
            });
        }
    });

    return updatedOutput;
}

// #region 模拟用户生成面板
const mockUser = document.createElement('div');
mockUser.className = 'panel';
mockUser.innerHTML = `
    <h3>模拟用户生成</h3>
    <div id="moc-svg-contains" style="display: flex; justify-content: center; align-items: center; margin-top: 170px;">
        ${noneSvgCode2}
    </div>
    <div id="progress-container" style="width: 100%; text-align: center; display: none; flex-direction: column; align-items: center; margin-top: 20px;">
        <progress id="generation-progress" value="0" max="100" style="width: 80%; height: 15px; appearance: none; border-radius: 12px; overflow: hidden; background-color: #333;"></progress>
        <p id="progress-text" style="margin-top: 10px; font-size: 0.9rem; color: #aaa; font-weight: bold; animation: breathe 1.5s infinite;">生成中...</p>
    </div>
`;

const generateTips = mockUser.querySelector('h3');
generateTips.appendChild(createTooltip('此处可以预览用户生成的内容'));

// 将面板添加到页面
document.body.appendChild(mockUser);

// 获取进度条容器和元素
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('generation-progress');
const progressText = document.getElementById('progress-text');

// 添加进度条自定义样式和呼吸动画
const progressStyle = document.createElement('style');
progressStyle.innerHTML = `
    /* 进度条样式 */
    #generation-progress::-webkit-progress-bar {
        background-color: #333;
    }
    #generation-progress::-webkit-progress-value {
        background-color: #5CB85C; /* 绿色进度条颜色 */
        transition: width 0.4s ease;
    }
    #generation-progress::-moz-progress-bar {
        background-color: #5CB85C; /* 兼容 Firefox 的进度条颜色 */
    }

    /* 呼吸动画 */
    @keyframes breathe {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
`;

// 全局标识是否测试过数据
let isExecutedComplete = false;
document.head.appendChild(progressStyle); // 修复了变量名错误
ws.onmessage = (event) => {
    // 包个异步，方便调用getview
    (async () => {
        const message = JSON.parse(event.data);
        console.log("收到的 WebSocket 消息：", message);
        
        if (message.type === 'execution_start') {
            // 显示进度条容器并初始化进度为0
            progressContainer.style.display = 'flex';
            progressBar.value = 0;
            progressText.textContent = "生成中...";
            progressText.style.animation = 'breathe 1.5s infinite'; // 添加呼吸动画
        }

        if (message.type === 'progress' && message.data) {
            const { value, max } = message.data;
            const progressPercentage = (value / max) * 100;
            
            // 更新进度条和文字
            progressBar.value = progressPercentage;
            progressText.textContent = `生成中... ${Math.round(progressPercentage)}%`;
        }

        if (message.type === 'executed' && message.data?.output?.images?.length > 0) {
            // 设置标识为 true
            isExecutedComplete = true;
            // 获取生成的图像文件名
            const imageFilename = message.data.output.images[0].filename;
            let data = {
                "filename": imageFilename,
                "type": "output",
            };
            
            // 使用 await 调用异步函数获取图像 URL
            const imageUrl = await getView(data);
            console.log("imageUrl",imageUrl)
            if (imageUrl) {
                // 创建图片元素
                const imageElement = new Image();
                imageElement.src = imageUrl;
                imageElement.style.maxWidth = "100%";
                imageElement.style.borderRadius = "8px";
                imageElement.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, 0.3)";
                imageElement.style.margin = "auto"; 
                imageElement.style.display = "block"; 

                // 替换 SVG 显示生成的图像
                const svgContainer = document.getElementById("moc-svg-contains");
                svgContainer.innerHTML = ""; // 清空 SVG 容器
                svgContainer.style.marginTop = "100px"; // 设置图像的 margin-top
                svgContainer.appendChild(imageElement);
            } else {
                console.error("未能提取图像 URL");
            }

            // 隐藏进度条容器
            setTimeout(() => {
                progressContainer.style.display = 'none';
            }, 200); // 可根据需求调整延迟时间
        }
    })(); // 立即调用这个 async 函数
};
//#endregion
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

// #region 创建头图设置区域
const headerImageSection = document.createElement('div');
headerImageSection.className = 'header-image-section';
headerImageSection.innerHTML = `
    <h3 style="margin-top: -2px; color: #f3f3f3; font-weight: bold; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);">设置作品头图</h3>
    
    <div class="header-image-content">
        <div id="thumbnail-display-area" style="
            width: 100%;
            height: 270px; 
            border: 1px solid #444;
            border-radius: 16px;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.1));
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.6), inset 0px 4px 8px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #bbb;
            text-align: center;
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
            transition: background-image 1s ease-in-out, box-shadow 0.3s ease;
        ">
            <p id="preview-text" style="margin: 0; font-size: 0.95rem; font-weight: bold; display: block; color:#666;">此处显示选择的媒体</p>
           
            <div id="carousel-controls" style="display: none; position: absolute; bottom: 15px; display: flex; gap: 5px;"></div>
        </div>

        <div class="image-selection-container" style="display: flex; gap: 10px; justify-content: center; margin-top: 12px;">
            <div class="add-image-area" style="
                width: 70px;
                height: 70px;
                background-color: #333;
                color: #5CB85C;
                font-size: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 12px;
                border: 2px solid #5CB85C;
                cursor: pointer;
                transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
                box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25), inset 0px 4px 10px rgba(255, 255, 255, 0.05);
            ">
                <span style="font-size: 2rem; font-weight: bold; text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);">+</span>
            </div>
        </div>
         <p style="text-align: center; color: #aaa; font-size: 0.85rem; margin-top: 10px; color:#666;">最多选择三张图片</p>
    </div>
    
    <div id="delete-area" style="
        width: 100%;
        height: 50px;
        background-color: rgba(255, 59, 48, 0.4);
        border-radius: 8px;
        color: white;
        text-align: center;
        line-height: 50px;
        margin-top: 100px;
        display: none;
        box-shadow: 0px 4px 15px rgba(255, 59, 48, 0.5); 、
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
        position: relative;
    ">
        拖动图片至此处删除
    </div>
`;

const headerImageSectionTips = headerImageSection.querySelector('h3');
headerImageSectionTips.appendChild(createTooltip('最多可选择三张图片/视频作为作品头图，拖拽可调整删除'));
// #endregion 创建头图设置区域

//#region 创建预览区域
const previewSection = document.createElement('div');
previewSection.className = 'preview-section';
previewSection.innerHTML += `
    <h3 style="margin-top: -2px; color: #f3f3f3; font-weight: bold; font-size: 1.2rem; text-align: left; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);">作品展示预览</h3>
    <div class="preview-content">
        <div class="phone-contains" style="position: relative; height:650px; margin: 0 auto; max-width: 375px;">
            <!-- 父容器，将头图和标题区域包裹 -->
            <div class="content-wrapper" style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                padding: 20px;
                box-sizing: border-box;
            ">

                <!-- 头图区 -->
                <div id="real-time-header-image" style="
                    width: 100%;
                    height: 200px;
                    margin-top:23px;
                    background: linear-gradient(-45deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.3));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color:#666;
                    font-size: 0.9rem;
                    font-weight: bold;
                    text-align: center;
                    overflow: hidden;
                    border-radius: 10px;
                    /* 仅保留下边框的阴影 */
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6); /* 下边框阴影 */
                ">此处是作品头图区</div>
                <div id="carousel-controls" style="display: flex; position: absolute; left: 50%; transform: translate(-50%, -190%); gap: 5px;"></div>

                <!-- 标题和描述卡片 -->
                <div id="title-description-card" class="card" style="
                    margin-top: 10px;
                    padding: 15px;
                    background-color: #333;
                    border-radius: 8px;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
                ">
                    <p id="real-time-title" style="font-weight: bold; color: #f3f3f3; font-size: 1rem; margin: 0;">
                        此处是作品标题
                    </p>
                    <p id="real-time-description" class="description" style="
                        color: #ccc;
                        font-size: 0.9rem;
                        margin: 4px 0 0;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    ">
                        此处是作品描述
                    </p>
                </div>

                <!-- 提示性文本卡片 -->
                <div id="info-card" style="
                    margin-top: 10px;
                    padding: 15px;
                    background-color: #333;
                    color: #777;
                    font-size: 0.85rem;
                    text-align: center;
                    border-radius: 8px;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
                ">
                    其他内容应用内查看
                </div>
            </div>

            <!-- 手机边框 -->
            <img id="phone-id" src="kaji/workbench/phone.jpg" alt="手机边框" class="phone-png" style="
                width: 100%;
                height: auto;
                position: relative;
                pointer-events: none;
                filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5));
            "/>
        </div>

    </div>
`;


document.body.appendChild(previewSection);

const previewSectionTitle = previewSection.querySelector('h3');
previewSectionTitle.appendChild(createTooltip('实时预览展示给用户的作品效果，具体效果以客户端应用内为准'));
const realTimeHeaderImage = previewSection.querySelector('#real-time-header-image');
// 动态计算 info-card 高度
function adjustInfoCardHeight() {
    const phoneContains = previewSection.querySelector('.phone-contains');
    const headerImage = previewSection.querySelector('#real-time-header-image');
    const titleDescriptionCard = previewSection.querySelector('#title-description-card');
    const infoCard = previewSection.querySelector('#info-card');

    // 检查元素是否存在，防止报错

        // 获取各个部分的高度
        const phoneHeight = phoneContains.offsetHeight;
        const headerHeight = headerImage.offsetHeight;
        const titleDescriptionHeight = titleDescriptionCard.offsetHeight;

        // 计算 info-card 的高度
        const remainingHeight = phoneHeight - headerHeight - titleDescriptionHeight - 83; // 额外的间距修正
        // 设置 info-card 的高度
        infoCard.style.height = `${remainingHeight}px`;
 
}

// 调用调整函数
adjustInfoCardHeight();
window.addEventListener('resize', adjustInfoCardHeight);
//#endregion 

// #region 创建设置参数区域
const settingsSection = document.createElement('div');
settingsSection.className = 'settings-section';
settingsSection.innerHTML += `
    <h3 style="margin-top: -2px; color: #f3f3f3; font-weight: bold;">设置作品详情</h3>
    <div class="settings-content">
        <label for="title-input" style="display: block; margin-bottom: 6px; color: #ccc;">设置标题</label>
        <input type="text" id="title-input" placeholder="输入标题" maxlength="30" style="
            width: 90%;
            padding: 10px;
            margin-bottom: 16px;
            border: 1px solid #444;
            border-radius: 6px;
            background-color: #2E2E2E;
            color: #FFF;
            box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
            outline: none;
        ">
        
        <label id="description-input-text" for="description-input" style="display: block; margin-bottom: 6px; color: #ccc;">设置描述</label>
        <input type="text" id="description-input" placeholder="输入描述" maxlength="80" style="
            width: 90%;
            padding: 10px;
            margin-bottom: 16px;
            border: 1px solid #444;
            border-radius: 6px;
            background-color: #2E2E2E;
            color: #FFF;
            box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
            outline: none;
        ">

        <!-- 设置作品价格 -->
        <label id="price-input-text" for="price-input" style="display: block; margin-bottom: 6px; color: #ccc;">设置作品价格</label>
        <input type="number" id="price-input" placeholder="输入价格" style="
            width: 90%;
            padding: 10px;
            margin-bottom: 16px;
            border: 1px solid #444;
            border-radius: 6px;
            background-color: #2E2E2E;
            color: #FFF;
            box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
            outline: none;
        " min="0" step="1" max="9999999">

        <!-- 设置作品免费使用次数 -->
        <label id="free-input-text" for="free-input" style="display: block; margin-bottom: 6px; color: #ccc;">设置免费次数</label>
        <input type="number" id="free-input" placeholder="输入免费次数" style="
            width: 90%;
            padding: 10px;
            margin-bottom: 16px;
            border: 1px solid #444;
            border-radius: 6px;
            background-color: #2E2E2E;
            color: #FFF;
            box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
            outline: none;
        " min="0" step="1" max="3">
        
        <label id="switch-text" for="promotion-toggle" style="display: block; margin-bottom: 6px; color: #ccc;">推广分成</label>
        
        <!-- Switch 控件 -->
        <div style="display: flex; align-items: center;">
            <label class="switch" style="display: inline-block; margin-right: 10px;">
                <input type="checkbox" id="promotion-toggle" style="display: none;">
                <span class="slider"></span>
            </label>
            <span id="promotion-status" style="color: #fff; font-size: 16px;">关闭</span>
        </div>
    </div>
`;

// 获取切换开关元素
const promotionToggle = settingsSection.querySelector('#promotion-toggle');
const promotionStatus = settingsSection.querySelector('#promotion-status');
const productTitleInput = settingsSection.querySelector('#title-input');
const productDesInput = settingsSection.querySelector('#description-input');
const priceInput = settingsSection.querySelector('#price-input'); 
const freeInput = settingsSection.querySelector('#free-input'); 
const priceInputText = settingsSection.querySelector('#price-input-text'); 
const freeInputText = settingsSection.querySelector('#free-input-text'); 
const switchText = settingsSection.querySelector('#switch-text'); 

// 为每个输入框添加焦点和失焦事件监听器
addFocusBlurListener(productTitleInput);
addFocusBlurListener(productDesInput);
addFocusBlurListener(priceInput);
addFocusBlurListener(freeInput);

priceInputText.appendChild(createTooltip('单位为分'));
freeInputText.appendChild(createTooltip('设置作品可被免费的使用次数，最多三次'));
switchText.appendChild(createTooltip('开启后，作品被分享后付费，会从此次收益中分出10%给分享者'));

// 默认状态
let promotionEnabled = false;

// 切换开关状态
promotionToggle.addEventListener('change', () => {
    promotionEnabled = promotionToggle.checked;

    // 根据开关状态更新文本和样式
    if (promotionEnabled) {
        promotionStatus.textContent = "开启";
        promotionStatus.style.color = '#5CB85C';
    } else {
        promotionStatus.textContent = "关闭";
        promotionStatus.style.color = '#FFFFFF';
    }
});

// 获取用户输入数据函数
function getUserInputData() {
    return {
        // 获取头图数据（多张）
        headerImages: selectedImages,
        // 获取标题
        title: document.getElementById('title-input').value.trim(),
        // 获取描述
        description: document.getElementById('description-input').value.trim(),
        // 获取价格
        price: parseFloat(document.getElementById('price-input').value) || 0,
        // 获取免费次数
        freeTimes: parseInt(document.getElementById('free-input').value) || 0,
        // 获取推广状态
        promotionEnabled: promotionToggle.checked
    };
}

// #region 创建设置参数区域
// 详情设置区域的 MutationObserver
const settingsObserver = new MutationObserver(() => {
    const inputTitle = document.getElementById('title-input');
    const inputDescription = document.getElementById('description-input');
    const promotionToggle = document.getElementById('promotion-toggle');


    // 确保所有元素存在后再绑定事件
    if (inputTitle && inputDescription && promotionToggle) {
        // 监听标题和描述输入框的变化，实时更新预览区
        inputTitle.addEventListener('input', (event) => {
            document.getElementById('real-time-title').innerText = event.target.value;
        });
        inputDescription.addEventListener('input', (event) => {
            document.getElementById('real-time-description').innerText = event.target.value;
        });

        // 监听推广分成开关按钮
        promotionToggle.addEventListener('click', (event) => {
            if (promotionToggle.innerText === '此处是一个开关') {
                promotionToggle.innerText = '开关已开启';
                promotionToggle.style.backgroundColor = '#5CB85C';
            } else {
                promotionToggle.innerText = '此处是一个开关';
                promotionToggle.style.backgroundColor = '#444';
            }
        });

        // 绑定完成后停止观察
        settingsObserver.disconnect();
    }
});

// 开始观察 settingsSection 的子元素变化
settingsObserver.observe(settingsSection, { childList: true, subtree: true });
// #endregion 创建设置参数区域

// 将三个区域添加到 completeWrapContainer
completeWrapContainer.appendChild(headerImageSection);
completeWrapContainer.appendChild(previewSection);
completeWrapContainer.appendChild(settingsSection);

// #endregion 创建预览区域

// #region 发布作品面板逻辑
// 获取预览区域的标题和描述元素
const previewTitle = previewSection.querySelector('#real-time-title');
const previewDescription = previewSection.querySelector('#real-time-description');


// 监听标题输入框的变化，实时同步到预览区域的标题
productTitleInput.addEventListener('input', (event) => {
    previewTitle.textContent = event.target.value;  // 同步输入框内容到预览区标题
    adjustInfoCardHeight();
});

// 监听描述输入框的变化，实时同步到预览区域的描述
productDesInput.addEventListener('input', (event) => {
    previewDescription.textContent = event.target.value;  // 同步输入框内容到预览区描述
    adjustInfoCardHeight();
});

const addImageArea = headerImageSection.querySelector('.add-image-area');
const thumbnailDisplayArea = headerImageSection.querySelector('#thumbnail-display-area');
const imageSelectionContainer = headerImageSection.querySelector('.image-selection-container');
const deleteArea = headerImageSection.querySelector('#delete-area');
const previewText = headerImageSection.querySelector('#preview-text');
const carouselControls = headerImageSection.querySelector('#carousel-controls');
const carouselControls2 = previewSection.querySelector('#carousel-controls');

// 数组用于存储选择的图片
let selectedImages = []; 
let currentIndex = 0;

// 更新预览区的文本提示状态
const updatePreviewText = () => {
    if (selectedImages.length === 0) {
        previewText.style.display = 'block';
    } else {
        previewText.style.display = 'none';
    }
};

// 更新预览区的显示
const updateThumbnailDisplay = () => {
    if (selectedImages.length === 0) {
        thumbnailDisplayArea.style.backgroundImage = 'none';
        previewText.style.display = 'block';
        realTimeHeaderImage.style.backgroundImage = 'none';  // 同步更新作品头图区域
    } else if (selectedImages.length === 1) {
        // 只有一张图片时，直接显示该图片
        thumbnailDisplayArea.style.backgroundImage = `url(${selectedImages[0]})`;
        thumbnailDisplayArea.style.backgroundSize = 'cover';
        thumbnailDisplayArea.style.backgroundPosition = 'center';
        realTimeHeaderImage.style.backgroundImage = `url(${selectedImages[0]})`;  // 同步更新作品头图区域
        realTimeHeaderImage.style.backgroundSize = 'cover';
        realTimeHeaderImage.style.backgroundPosition = 'center';
    } else {
        // 多张图片时显示轮播图
        thumbnailDisplayArea.style.backgroundImage = `url(${selectedImages[currentIndex]})`;
        thumbnailDisplayArea.style.backgroundSize = 'cover';
        thumbnailDisplayArea.style.backgroundPosition = 'center';
        realTimeHeaderImage.style.backgroundImage = `url(${selectedImages[currentIndex]})`;  // 同步更新作品头图区域
        realTimeHeaderImage.style.backgroundSize = 'cover';
        realTimeHeaderImage.style.backgroundPosition = 'center';
    }
    updatePreviewText();
    updateCarouselControls();
};

// 更新作品头图区域的显示
const updateRealTimeHeaderImage = () => {
    console.log("selectedImages.length",selectedImages.length)
    const realTimeHeaderImage = previewSection.querySelector('#real-time-header-image'); // 作品头图区域

    console.log("selectedImages.length",selectedImages.length)
    if (selectedImages.length === 0) {
        // 如果没有图片，显示文本
        realTimeHeaderImage.textContent = '此处是作品头图区'; // 显示文本
        realTimeHeaderImage.style.backgroundImage = 'none'; // 不显示背景图片
    } else {
        // 如果有图片，隐藏文本
        console.log("wenbenneirong",realTimeHeaderImage.textContent)
        realTimeHeaderImage.textContent = ''; // 清空文本
        if (selectedImages.length === 1) {
            // 如果只有一张图片，显示该图片
            realTimeHeaderImage.style.backgroundImage = `url(${selectedImages[0]})`;
        } else {
            // 如果有多张图片，显示轮播图
            realTimeHeaderImage.style.backgroundImage = `url(${selectedImages[currentIndex]})`;
        }
        realTimeHeaderImage.style.backgroundSize = 'cover';
        realTimeHeaderImage.style.backgroundPosition = 'center';
    }
};

// 自动轮播功能
const startAutoSlide = () => {
    setInterval(() => {
        if (selectedImages.length > 1) {
            currentIndex = (currentIndex + 1) % selectedImages.length;
            updateThumbnailDisplay();
            updateRealTimeHeaderImage();
        }
    }, 3000); // 每3秒自动切换
};

// 更新轮播控制点
const updateCarouselControls = () => {
    carouselControls.innerHTML = ''; // 清空控制点
    carouselControls2.innerHTML = ''; // 清空控制点

    if (selectedImages.length > 1) {
        // 如果图片数量大于1，显示轮播控制点
        selectedImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.style.cssText = `
                width: 10px;
                height: 10px;
                background-color: ${index === currentIndex ? '#5CB85C' : '#888'};
                border-radius: 50%;
                cursor: pointer;
                margin: 0 5px;
            `;
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateThumbnailDisplay();
                updateRealTimeHeaderImage(); // 更新头图区域
            });
            carouselControls.appendChild(dot);
            carouselControls2.appendChild(dot);
        });
        carouselControls.style.display = 'flex'; // 显示控制点
        carouselControls2.style.display = 'flex'; 
    } else {
        // 如果只有一张图片，隐藏控制点
        carouselControls.style.display = 'none';
        carouselControls2.style.display = 'none';
    }
};
// 给未选择图片的“+”号区域添加悬停效果
addImageArea.addEventListener('mouseenter', () => {
    if (selectedImages.length === 0) {
        addImageArea.style.boxShadow = '0px 6px 12px rgba(92, 184, 92, 0.5)';
        addImageArea.style.transform = 'scale(1.05)';
    }
});


addImageArea.addEventListener('mouseleave', () => {
    if (selectedImages.length === 0) {
        addImageArea.style.boxShadow = '0px 6px 12px rgba(0, 0, 0, 0.25)';
        addImageArea.style.transform = 'scale(1)';
    }
});
// 图片选择逻辑
const selectImage = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                selectedImages.push(imageUrl);

                // 创建缩略图方块
                const imageThumbnail = document.createElement('div');
                imageThumbnail.className = 'image-thumbnail';
                imageThumbnail.dataset.imageId = imageUrl;
                imageThumbnail.style.cssText = `
                    width: 70px;
                    height: 70px;
                    background-image: url(${imageUrl});
                    background-size: cover;
                    background-position: center;
                    border-radius: 12px;
                    position: relative;
                    cursor: grab;
                    border: 2px solid #5CB85C;
                    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                `;

                // 悬停效果
                imageThumbnail.addEventListener('mouseenter', () => {
                    imageThumbnail.style.transform = 'scale(1.1)'; // 稍微放大
                    imageThumbnail.style.boxShadow = '0px 10px 18px rgba(0, 0, 0, 0.3)';
                    imageThumbnail.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'; // 平滑过渡
                });
                imageThumbnail.addEventListener('mouseleave', () => {
                    imageThumbnail.style.transform = 'scale(1)'; // 恢复大小
                    imageThumbnail.style.boxShadow = '0px 6px 12px rgba(0, 0, 0, 0.25)';
                });

                // 添加拖拽事件
                imageThumbnail.draggable = true;
                imageThumbnail.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', imageUrl);
                    deleteArea.style.display = 'block';
                });

                imageThumbnail.addEventListener('dragend', () => {
                    deleteArea.style.display = 'none';
                });
                deleteArea.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    deleteArea.style.backgroundColor = 'rgba(255, 59, 48, 0.6)';
                    deleteArea.style.boxShadow = '0px 6px 20px rgba(255, 59, 48, 0.7)'; 
                });

                deleteArea.addEventListener('dragleave', () => {
                    deleteArea.style.backgroundColor = 'rgba(255, 59, 48, 0.4)';
                    deleteArea.style.boxShadow = '0px 4px 15px rgba(255, 59, 48, 0.5)';
                });

                deleteArea.addEventListener('drop', (e) => {
                    e.preventDefault();
                    const imageToDelete = e.dataTransfer.getData('text/plain');
                
                    // 删除 selectedImages 数组中的特定图片
                    selectedImages = selectedImages.filter(img => img !== imageToDelete);
                
                    // 删除对应的缩略图
                    const imageThumbnails = imageSelectionContainer.querySelectorAll('.image-thumbnail');
                    imageThumbnails.forEach(thumbnail => {
                        if (thumbnail.dataset.imageId === imageToDelete) {
                            thumbnail.remove(); // 删除该缩略图
                        }
                    });
                
                    // 更新预览区显示
                    updateThumbnailDisplay();
                    updateRealTimeHeaderImage(); // 同步更新作品头图区域
                
                    // 更新轮播图控制点
                    updateCarouselControls();
                
                    // 恢复删除区域样式
                    deleteArea.style.backgroundColor = 'rgba(255, 59, 48, 0.4)';
                    deleteArea.style.boxShadow = '0px 4px 15px rgba(255, 59, 48, 0.5)';
                
                    // 如果图片数量小于3，显示“+”按钮
                    if (selectedImages.length < 3) {
                        addImageArea.style.display = 'flex';
                    }
                });

                // 添加缩略图到容器
                imageSelectionContainer.insertBefore(imageThumbnail, addImageArea);
                updateThumbnailDisplay();
                updateRealTimeHeaderImage(); // 同步更新作品头图区域

                // 如果图片数量小于3，添加新的“+”号选择按钮
                if (selectedImages.length < 3) {
                    addImageArea.style.display = 'flex';
                } else {
                    addImageArea.style.display = 'none';
                }
            };
            reader.readAsDataURL(file);
        }
    });

    fileInput.click();
};

// 初始“+”按钮点击事件
addImageArea.addEventListener('click', selectImage);

// 初始化
updatePreviewText();
updateThumbnailDisplay();
updateRealTimeHeaderImage();
startAutoSlide();
// #endregion 设置同步到预览区域

// #endregion 创建“作品发布”视图容器

// #region 创建作品管理视图容器
const workManagementContainer = document.createElement('div');
workManagementContainer.className = 'work-management-container';
workManagementContainer.style.display = 'none';

const workManagementContent = document.createElement('div');
workManagementContent.className = 'work-management-content';
workManagementContent.innerHTML = `
    <h3  style="margin-top: -2px; color: #f3f3f3; font-weight: bold; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);">作品管理</h3>
    <div class="empty-content">
        <p style="color: #888; font-size: 0.85rem; text-align: center;">
            这里显示当前管理的作品列表，暂时没有任何内容。
        </p>
    </div>
`;

workManagementContainer.appendChild(workManagementContent);

// 给提示性文本容器添加样式
const emptyContent = workManagementContainer.querySelector('.empty-content');
emptyContent.style.display = 'flex';
emptyContent.style.alignItems = 'center'; 
emptyContent.style.justifyContent = 'center';
emptyContent.style.height = '85%'; 
emptyContent.style.textAlign = 'center'; 
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
    isExecutedComplete = false;
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
    if (!isExecutedComplete) {
        // 弹出确认对话框
        confirmDialog('请先完成作品生成测试', null, true);

    } else {
        // 如果已完成生成，直接执行后续逻辑
        completeWrapTab.click();
    }
});

// 上一步按钮逻辑
document.getElementById('prev-button').addEventListener('click', () => {
    appParamsTab.click();
});

//发布作品
document.getElementById('publish-button').addEventListener('click', async () => {
    try {
        // 显示加载框
        showLoading('正在上传作品，请稍候...');

        // 获取用户输入数据
        const productInputData = getUserInputData();

        // 上传所有图片，获取公网地址
        const mediaUrls = await Promise.all(
            selectedImages.map(async (base64Image, index) => {
                try {
                    console.log(`正在上传第 ${index + 1} 张图片...`);
    
                    // 上传单张图片，直接接收返回的格式化对象
                    const result = await uploadSingleImage(base64Image);
    
                    console.log(`第 ${index + 1} 张图片上传成功，返回数据：`, result);
    
                    // 直接返回后端格式化的对象
                    return result;
                } catch (error) {
                    console.error(`第 ${index + 1} 张图片上传失败:`, error);
                    throw new Error(`图片上传失败，请稍后重试`);
                }
            })
        );
        
        // 上传完成后打印结果
        console.log("所有图片上传完成，媒体 URL 数据：", mediaUrls);

        // 构造上传数据
        const uploadData = {
            title: productInputData['title'] || '', // 从用户输入中获取标题
            description: productInputData['description'] || '', // 获取描述
            price: productInputData['price'] || 0, // 获取价格，默认为0
            freeTimes: productInputData['freeTimes'] || 0, // 获取免费次数，默认为0
            promotionEnabled: productInputData['promotionEnabled'] || false, // 获取推广状态
            images: mediaUrls, // 传入选中的头图地址
            uniqueid: generateUUIDv4(), // 生成唯一标识，保证全球唯一
            workflow: workflow,
            output: output,
        };

        console.log('准备上传的作品数据: ', uploadData);

        // 调用上传接口
        const response = await uploadProduct(uploadData);

        // 处理上传结果
        if (response && response.success) {
            console.log('作品发布成功:', response.data);
            hideLoading(); // 隐藏加载框
            confirmDialog('作品发布成功！', () => {
                pluginUI.classList.remove('show'); // 关闭插件界面
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 300);
            });
        } else {
            console.error('作品发布失败:', response);
            hideLoading(); // 隐藏加载框
            confirmDialog('作品发布失败，请稍后重试。', null, true); // 错误时只显示关闭按钮
        }
    } catch (error) {
        console.error('发布作品过程中出错:', error);
        hideLoading(); // 隐藏加载框
        confirmDialog('发布作品时发生错误，请检查网络或稍后重试。', null, true);
    }
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
