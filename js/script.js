// 图片资源统一管理
const imageResources = {
    gallery: [
        "https://vip.123pan.cn/1815439627/yk6baz03t0n000d7w33gzhqbcrcxazwfDIYPAIFwBIQvAvxPBIi0Ba==.png",
        "https://vip.123pan.cn/1815439627/ymjew503t0n000d7w32y57xnbfclkfcqDIYPAIFwBIQvAvxPBIi0Ba==.png",
        "https://vip.123pan.cn/1815439627/yk6baz03t0m000d7w33g6k0kqrxawybxDIYPAIFwBIQvAvxPBIi0Ba==.png",
        "https://vip.123pan.cn/1815439627/ymjew503t0m000d7w32xoyy5cfwz6iq8DIYPAIFwBIQvAvxPBIi0Ba==.jpg",
        "https://vip.123pan.cn/1815439627/ymjew503t0l000d7w32x7da03dhcsg2mDIYPAIFwBIQvAvxPBIi0Ba==.png",
        "https://vip.123pan.cn/1815439627/yk6baz03t0l000d7w33fcr8m83hoix8gDIYPAIFwBIQvAvxPBIi0Ba==.png",
        "https://vip.123pan.cn/1815439627/ymjew503t0l000d7w32x7da69qhd69u0DIYPAIFwBIQvAvxPBIi0Ba==.jpg",
        "https://vip.123pan.cn/1815439627/yk6baz03t0n000d7w33gzhqnqlcxn45jDIYPAIFwBIQvAvxPBIi0Ba==.jpg",
        "https://vip.123pan.cn/1815439627/yk6baz03t0m000d7w33g6k0vxqxb9kayDIYPAIFwBIQvAvxPBIi0Ba==.jpg",
        "https://vip.123pan.cn/1815439627/ymjew503t0n000d7w32y57xtm5clxrsmDIYPAIFwBIQvAvxPBIi0Ba==.jpg",
        "https://vip.123pan.cn/1815439627/ymjew503t0m000d7w32xoyybl3wzjojuDIYPAIFwBIQvAvxPBIi0Ba==.jpg"
    ],
    server1: "https://vip.123pan.cn/1815439627/yk6baz03t0l000d7w33fcr8m83hoix8gDIYPAIFwBIQvAvxPBIi0Ba==.png",
    server2: "https://vip.123pan.cn/1815439627/ymjew503t0m000d7w32xoyydjiwzndlhDIYPAIFwBIQvAvxPBIi0Ba==.jpg"
};

// 服务器状态API集成
async function fetchServerStatus() {
    try {
        const response = await fetch('https://list.mczfw.cn/api/qszc.xyz:43943');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const statusIcon = document.getElementById('server-status-icon');
        const statusText = document.getElementById('server-status-text');
        const onlinePlayers = document.getElementById('online-players');
        const maxPlayers = document.getElementById('max-players');
        const statusBadge = document.getElementById('server-status-badge');
        const playerProgress = document.getElementById('player-progress');
        const serverPing = document.getElementById('server-ping');
        const serverMotd = document.getElementById('server-motd');

        if (data && data.p !== undefined) {
            // 服务器在线状态
            statusIcon.className = 'flex-shrink-0 h-10 w-10 rounded-full bg-green-500 flex items-center justify-center';
            statusIcon.innerHTML = '<i class="fas fa-check text-white"></i>';
            statusText.textContent = '服务器在线';

            // 更新玩家数量
            onlinePlayers.textContent = data.p;
            maxPlayers.textContent = data.mp;

            // 更新延迟
            serverPing.textContent = data.ping;

            // 更新服务器信息
            if (data.motd) {
                serverMotd.textContent = data.motd.replace(/→/g, '→ ').replace(/~/g, ' ');
            }

            // 更新状态徽章
            statusBadge.className = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-200';
            statusBadge.innerHTML = `
                <svg class="-ml-1 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                </svg>
                运行中
            `;

            // 计算并更新玩家进度条
            const playerPercentage = (data.p / data.mp) * 100;
            playerProgress.style.width = `${playerPercentage}%`;

            // 根据负载调整进度条颜色
            if (playerPercentage > 80) {
                playerProgress.className = 'bg-red-600 h-2.5 rounded-full';
            } else if (playerPercentage > 60) {
                playerProgress.className = 'bg-yellow-500 h-2.5 rounded-full';
            } else {
                playerProgress.className = 'bg-blue-600 h-2.5 rounded-full';
            }
        } else {
            // 服务器离线状态
            statusIcon.className = 'flex-shrink-0 h-10 w-10 rounded-full bg-red-500 flex items-center justify-center';
            statusIcon.innerHTML = '<i class="fas fa-times text-white"></i>';
            statusText.textContent = '服务器离线';
            onlinePlayers.textContent = '--';
            maxPlayers.textContent = '--';
            serverPing.textContent = '--';
            serverMotd.textContent = '服务器当前不可用';

            statusBadge.className = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-900 text-red-200';
            statusBadge.innerHTML = `
                <svg class="-ml-1 mr-1.5 h-2 w-2 text-red-400" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                </svg>
                离线
            `;

            playerProgress.style.width = '0%';
            playerProgress.className = 'bg-gray-600 h-2.5 rounded-full';
        }
    } catch (error) {
        console.error('获取服务器状态失败:', error);
        const statusText = document.getElementById('server-status-text');
        statusText.textContent = '获取服务器状态失败';

        const statusIcon = document.getElementById('server-status-icon');
        statusIcon.className = 'flex-shrink-0 h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center';
        statusIcon.innerHTML = '<i class="fas fa-exclamation-triangle text-white"></i';

        const statusBadge = document.getElementById('server-status-badge');
        statusBadge.className = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-900 text-gray-200';
        statusBadge.innerHTML = `
            <svg class="-ml-1 mr-1.5 h-2 w-2 text-gray-400" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="3" />
            </svg>
            错误
        `;

        document.getElementById('server-motd').textContent = '无法连接到状态服务器';
    }
}

// 初始化画廊
function initGallery() {
    const galleryContainer = document.getElementById('gallery-container');

    // 清空现有内容
    galleryContainer.innerHTML = '';

    // 动态生成画廊项目
    imageResources.gallery.forEach((imageUrl, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.onclick = () => openModal(index);

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `服务器截图${index + 1}`;

        galleryItem.appendChild(img);
        galleryContainer.appendChild(galleryItem);
    });
}

// 画廊功能
let currentImageIndex = 0;
let galleryExpanded = false;

function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'flex';
    modalImg.src = imageResources.gallery[currentImageIndex];
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(n) {
    currentImageIndex += n;
    if (currentImageIndex >= imageResources.gallery.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = imageResources.gallery.length - 1;
    }
    document.getElementById('modalImage').src = imageResources.gallery[currentImageIndex];
}

function toggleGallery() {
    const gallery = document.querySelector('.gallery');
    galleryExpanded = !galleryExpanded;

    if (galleryExpanded) {
        gallery.classList.add('show-all');
        document.querySelector('.gallery-more-btn button').innerHTML = '收起 <i class="fas fa-chevron-up ml-1"></i>';
    } else {
        gallery.classList.remove('show-all');
        document.querySelector('.gallery-more-btn button').innerHTML = '查看更多 <i class="fas fa-chevron-down ml-1"></i>';
    }
}

// 保护功能
function showProtectionModal() {
    const modal = document.getElementById('protectionModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeProtectionModal() {
    const modal = document.getElementById('protectionModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 禁止右键菜单
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    showProtectionModal();
});

// 禁止F12开发者工具
document.addEventListener('keydown', function (e) {
    // F12键
    if (e.keyCode === 123) {
        e.preventDefault();
        showProtectionModal();
    }
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        showProtectionModal();
    }
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        showProtectionModal();
    }
    // Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        showProtectionModal();
    }
    // Ctrl+U
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        showProtectionModal();
    }
});

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function () {
    // 设置服务器图片
    document.getElementById('server1-image').src = imageResources.server1;
    document.getElementById('server2-image').src = imageResources.server2;

    // 初始化画廊
    initGallery();

    // 获取服务器状态
    fetchServerStatus();
    // 每3秒刷新一次状态
    setInterval(fetchServerStatus, 3000);

    // 复制到剪贴板功能
    window.copyToClipboard = function (text) {
        navigator.clipboard.writeText(text).then(function () {
            alert('已复制: ' + text);
        }, function (err) {
            console.error('复制失败: ', err);
        });
    };

    // 滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.slide-up').forEach(el => {
        observer.observe(el);
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // 关闭手机菜单
            document.getElementById('mobile-menu').classList.remove('active');

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 手机菜单切换
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
    });

    // 点击菜单外区域关闭菜单
    document.addEventListener('click', function (event) {
        if (!mobileMenu.contains(event.target) && event.target !== mobileMenuButton) {
            mobileMenu.classList.remove('active');
        }
    });

    // 点击模态框外部关闭模态框
    const modal = document.getElementById('imageModal');
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // 键盘事件
    document.addEventListener('keydown', function (event) {
        const modal = document.getElementById('imageModal');
        if (modal.style.display === 'flex') {
            if (event.key === 'Escape') {
                closeModal();
            } else if (event.key === 'ArrowRight') {
                changeImage(1);
            } else if (event.key === 'ArrowLeft') {
                changeImage(-1);
            }
        }
    });
});