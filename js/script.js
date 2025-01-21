const app = Vue.createApp({
    data() {
        return {
            isDarkMode: false,
            announcements: [
                {
                    title: '最新消息',
                    text: '乌托邦截至今年的三月份结束该档，进行封存',
                    img: 'https://ipv4wp.axzzz.top:9503/f/M95Xhj/2024.11.23_05.30_MpxGfrex.png'
                },
                {
                    title: '活动娱乐',
                    text: '乌托邦探险之旅开始大量开设现代城市，大批量建造，目前为初期状态',
                    img: 'https://ipv4wp.axzzz.top:9503/f/4wgPTn/2024.11.23_06.38_JWwLvmEM.png'
                }
            ],
            exhibitionMedia: [
                {
                    type: 'video',
                    src: 'https://ipv4wp.axzzz.top:9503/f/76oof7/Publicity.mp4'
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
                }
            ],
            servers: [
                {
                    name: '空中厕所',
                    description: '（暂停开放）',
                    ip: '',
                    img: 'https://square.candycake.cloud/uploads/1719063350_7949_P_Cvj_ccae162118.jpg',
                },
                {
                    name: '乌托邦探险之旅',
                    description: '当你厌倦匆忙的生活时，那里有着宁静的小屋，等待你的归来。耕耘少许时光，垂钓静谧湖畔，沐浴温柔阳光下的田园气息。在这个世界里，你将品味生命的安宁，享受悠然自得的片刻。',
                    ip: 'neo.candycake.cloud:30475',
                    img: 'https://ipv4wp.axzzz.top:9503/f/Po5MsR/2024.11.23_05.30_fgfZEkgM.png',
                }
            ],
            lightboxImage: null,
            guidePanel: {
                img: 'https://ipv4wp.axzzz.top:9503/f/v5ADhM/Boot.jpg',
                title: '下载最新资源',
                description: '点击下面的按钮前往下载页面，获取最新的资源。',
                link: 'download.html'
            }
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
            showAlert('服务器地址已复制');
        },
        copyHello() {
            const tempInput = document.createElement('input');
            tempInput.value = 'yd.mcla.fun:30475';
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            showAlert('服务器地址已复制');
        },
        showImage(image) {
            this.lightboxImage = image;
        },
        closeLightbox() {
            this.lightboxImage = null;
        },
        initializeCarousel() {
            const carousel = document.querySelector('.carousel');
            const items = this.exhibitionMedia.map(media => {
                if (media.type === 'video') {
                    return `<video controls class="video-player" autoplay muted controlsList="nodownload">
                                <source src="${media.src}" type="video/mp4">
                                您的浏览器不支持HTML5视频标签。
                            </video>`;
                } else {
                    return `<img src="${media.src}" alt="图片">`;
                }
            }).join('');
            carousel.innerHTML = items;

            let index = 0;

            function showNextItem() {
                index = (index + 1) % carousel.children.length;
                carousel.style.transform = `translateX(-${index * 100}%)`;
            }

            let isDown = false;
            let startX;
            let scrollLeft;

            carousel.addEventListener('mousedown', (e) => {
                isDown = true;
                carousel.classList.add('active');
                startX = e.pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });

            carousel.addEventListener('mouseleave', () => {
                isDown = false;
                carousel.classList.remove('active');
            });

            carousel.addEventListener('mouseup', () => {
                isDown = false;
                carousel.classList.remove('active');
            });

            carousel.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - carousel.offsetLeft;
                const walk = (x - startX) * 3; // scroll-fast
                carousel.scrollLeft = scrollLeft - walk;
            });
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

        // 禁止滑动
        document.body.style.overflow = 'hidden';

        // 资源加载完成后隐藏加载动画
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingOverlay = document.getElementById('loading-overlay');
                loadingOverlay.classList.add('hidden'); // 添加隐藏类
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                    document.body.style.overflow = 'auto'; // 允许滚动
                }, 500); // 等待过渡效果完成
            }, 1000); // 确保加载动画不少于一秒
        });

        // 每秒重新加载一次动态数据
        setInterval(this.reloadDynamicData, 1000);

        // 初始化轮播图
        this.initializeCarousel();
    }
});

app.mount('#app');

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
