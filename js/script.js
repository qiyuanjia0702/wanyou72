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
        statusIcon.innerHTML = '<i class="fas fa-exclamation-triangle text-white"></i>';

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

// 页面加载时获取服务器状态
document.addEventListener('DOMContentLoaded', function () {
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
});