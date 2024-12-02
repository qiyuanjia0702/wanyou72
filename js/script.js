const app = Vue.createApp({
    data() {
        return {
            isDarkMode: false,
            announcements: [{
                    title: '最新消息',
                    text: '乌托邦探险之旅开始了，祝你们有个愉快的寒假！',
                    img: 'https://ipv4wp.axzzz.top:9503/f/M95Xhj/2024.11.23_05.30_MpxGfrex.png'
                },
                {
                    title: '活动娱乐',
                    text: '招五名服务器管理员，不低于18岁，会基础的指令和Linux常用命令',
                    img: 'https://ipv4wp.axzzz.top:9503/f/4wgPTn/2024.11.23_06.38_JWwLvmEM.png'
                }
            ],
            exhibitionMedia: [{
                    type: 'video',
                    src: 'https://ipv4wp.axzzz.top:9503/f/JAjZTw/2024.11.25_02.30_vRiYHSDF.mp4'
                },
                {
                    type: 'image',
                    src: 'https://ipv4wp.axzzz.top:9503/f/kJO7T0/2024.11.23_05.30_qkhaDxuZ.png'
                },
                {
                    type: 'image',
                    src: 'https://ipv4wp.axzzz.top:9503/f/JA5Zfw/2024.11.23_05.30_sYtiAKzc.png'
                },
                {
                    type: 'image',
                    src: 'https://ipv4wp.axzzz.top:9503/f/y3qecg/2024.11.23_05.30_kKjmYbfG.png'
                },
                {
                    type: 'image',
                    src: 'https://ipv4wp.axzzz.top:9503/f/85Z0Iq/2024.11.24_02.43_VMieDQlz.png'
                },
                {
                    type: 'image',
                    src: 'https://ipv4wp.axzzz.top:9503/f/2AwvuZ/2024.11.24_02.43_ANileASO.png'
                },
                {
                    type: 'image',
                    src: 'https://ipv4wp.axzzz.top:9503/f/v58wTM/2024.11.24_02.43_TbsBowDB.png'
                },
            ],
            servers: [{
                    name: '生存服务器',
                    description: '本服务器是1.21版本，确保你的游戏版本正确，该服务器添加更多插件，玩家可以使用tpa指令进行互相传送',
                    ip: 'su7.candycake.cloud:36472',
                    img: 'https://ipv4wp.axzzz.top:9503/f/e0OahQ/2024.11.23_05.30_xIYhCaEh.png'
                },
                {
                    name: '乌托邦探险之旅',
                    description: '该游戏是由B站limit小火柴制作的大型国创休闲类整合包，更多玩法等着你来探索，所以…赶紧上号！不然刷矿bug就要被修复了！',
                    ip: 'neo.candycake.cloud:30475',
                    img: 'https://ipv4wp.axzzz.top:9503/f/Po5MsR/2024.11.23_05.30_fgfZEkgM.png'
                }
            ],
            lightboxImage: null
        };
    },
    methods: {
        toggleTheme() {
            this.isDarkMode = !this.isDarkMode;
            document.body.classList.toggle('dark-mode', this.isDarkMode);
        },
        copyToClipboard(ip) {
            const tempInput = document.createElement('input');
            tempInput.value = ip;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            alert('服务器地址已复制');
        },
        showImage(image) {
            this.lightboxImage = image;
        },
        closeLightbox() {
            this.lightboxImage = null;
        }
    },
    mounted() {
        setTimeout(() => {
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = 1;
                    card.style.transform = 'translateY(0)';
                }, index * 200); // 每张卡片延时显示
            });
        }, 1000); // 页面加载后1秒开始显示卡片
    }
});

// 显示警告提示
function showAlert(message) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

// 禁用右键菜单
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    showAlert('右键菜单已禁用！');
});

// 禁用键盘快捷键 (如F12, Ctrl+Shift+I, Ctrl+U等)
document.addEventListener('keydown', (event) => {
    if (
        event.key === 'F12' ||
        (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J')) ||
        (event.ctrlKey && event.key === 'U')
    ) {
        event.preventDefault();
        showAlert('开发者工具已禁用！');
    }
});

// 检测录屏或屏幕捕获
let lastStatus = false;
setInterval(() => {
    const isScreenCaptured = navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
    if (isScreenCaptured && !lastStatus) {
        lastStatus = true;
        showAlert('检测到屏幕录制！请立即停止！');
    } else if (!isScreenCaptured) {
        lastStatus = false;
    }
}, 1000);

app.mount('#app');