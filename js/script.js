const app = Vue.createApp({
    data() {
        return {
            isDarkMode: false,
            announcements: [{
                    title: '服务器更新',
                    text: '我们已经完成了最新的更新，加入了更多有趣的内容！',
                    img: 'https://via.placeholder.com/500x200.png?text=公告图片1'
                },
                {
                    title: '活动开始',
                    text: '新的活动已经开始，快来参加吧！',
                    img: 'https://via.placeholder.com/500x200.png?text=公告图片2'
                }
            ],
            exhibitionImages: [
                'https://ipv4wp.axzzz.top:9503/f/kJO7T0/2024.11.23_05.30_qkhaDxuZ.png',
                'https://ipv4wp.axzzz.top:9503/f/JA5Zfw/2024.11.23_05.30_sYtiAKzc.png',
                'https://ipv4wp.axzzz.top:9503/f/y3qecg/2024.11.23_05.30_kKjmYbfG.png'
            ],
            servers: [{
                    name: '生存服务器',
                    description: '这是一个纯净生存服务器，适合喜欢自由建造的玩家。',
                    ip: '192.168.0.1',
                    img: 'https://ipv4wp.axzzz.top:9503/f/e0OahQ/2024.11.23_05.30_xIYhCaEh.png'
                },
                {
                    name: 'PVP服务器',
                    description: '如果你喜欢战斗，这里是你的天堂！',
                    ip: '192.168.0.2',
                    img: 'https://ipv4wp.axzzz.top:9503/f/M95Xhj/2024.11.23_05.30_MpxGfrex.png'
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
            alert('服务器地址已复制：' + ip);
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

app.mount('#app');