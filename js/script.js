const API_URL = 'https://api.mcstatus.io/v2/status/java/neo.candycake.cloud:30475';
let notificationTimeout;

function copyAddress() {
    const address = 'neo.candycake.cloud:30475';
    navigator.clipboard.writeText(address).then(() => {
        showNotification();
    }).catch(err => {
        console.error('复制失败:', err);
    });
}

function showNotification() {
    const notification = document.getElementById('notification');
    notification.innerHTML = '<div class="notification-text">地址已复制！</div>';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    notification.appendChild(progressBar);

    clearTimeout(notificationTimeout);
    notification.classList.remove('show');
    void notification.offsetWidth;
    notification.classList.add('show');

    notificationTimeout = setTimeout(() => {
        notification.classList.remove('show');
    }, 2500);
}

// 安全限制功能
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    showCustomAlert('右键功能已禁用');
    return false;
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.metaKey && e.altKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        showCustomAlert('开发者工具已禁用');
        return false;
    }
});

function showCustomAlert(message) {
    const alert = document.createElement('div');
    alert.style = `position: fixed;
                          top: 20px;
                          left: 50%;
                          transform: translateX(-50%);
                          background: #ff4757;
                          color: white;
                          padding: 16px 24px;
                          border-radius: 8px;
                          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                          z-index: 1000;
                          animation: alertSlide 0.3s ease-out;
                          display: flex;
                          align-items: center;
                          gap: 10px;`;

    alert.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
            `;
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 2000);

    const style = document.createElement('style');
    style.textContent = `
                @keyframes alertSlide {
                    from { transform: translateX(-50%) translateY(-50px); opacity: 0; }
                    to { transform: translateX(-50%) translateY(0); opacity: 1; }
                }
            `;
    document.head.appendChild(style);
}

async function checkStatus() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('网络响应异常');
        const data = await response.json();

        const statusElement = document.querySelector('.status-indicator');
        statusElement.innerHTML = `
                    <div class="status-dot"></div>
                    ${data.online ? '在线' : '离线'}
                `;
        statusElement.classList.remove('loading');
        statusElement.className = `status-indicator ${data.online ? 'online' : 'offline'}`;

        document.getElementById('protocol').textContent = data.version?.name_clean || '-';
        document.getElementById('players').textContent = data.online ?
            `${data.players?.online || 0}/${data.players?.max || 0}` : '-';
        document.getElementById('motd').textContent = data.motd?.clean || '';

        const icon = document.querySelector('.server-icon');
        if (data.online && icon) {
            icon.src = `https://api.mcstatus.io/v2/icon/${data.host}:${data.port}`;
            icon.style.display = 'block';
        }

    } catch (error) {
        console.error('状态查询失败:', error);
        document.querySelector('.status-indicator').innerHTML = `
                    <div class="status-dot"></div>
                    连接异常
                `;
        document.querySelector('.status-indicator').className = 'status-indicator offline';
        ['protocol', 'players', 'motd'].forEach(id => {
            document.getElementById(id).textContent = '-';
        });
    }
}

window.onload = checkStatus;
setInterval(checkStatus, 30000);