const API_URL = 'https://api.t1qq.com/api/sky/sc/scdl?key=luF8owK4UYIjENYbUmtKvRx2Zi';
const candleImage = document.getElementById('candleImage');
const refreshTime = document.getElementById('refreshTime');
const loading = document.getElementById('loading');
const errorContainer = document.getElementById('errorContainer');
const refreshButton = document.getElementById('refreshButton');
const modalOverlay = document.getElementById('modalOverlay');
const modalImage = document.getElementById('modalImage');
const closeButton = document.getElementById('closeButton');

let lastUpdate = null;

// 初始化加载
fetchData();

async function fetchData() {
    try {
        showLoading();
        const timestamp = Date.now();
        const response = await fetch(`${API_URL}&t=${timestamp}`);

        if (!response.ok) throw new Error(`网络错误 ${response.status}`);
        if (!response.headers.get('Content-Type').includes('image')) {
            throw new Error('接口返回的不是图片格式');
        }

        const blob = await response.blob();
        handleImageUpdate(blob);
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

function handleImageUpdate(blob) {
    const oldUrl = candleImage.src;
    const newUrl = URL.createObjectURL(blob);

    candleImage.onload = () => {
        URL.revokeObjectURL(oldUrl);
        updateTimeStamp();
    }

    candleImage.src = newUrl;
    candleImage.classList.remove('image-loading');
}

function updateTimeStamp() {
    lastUpdate = new Date();
    refreshTime.textContent = `数据更新于：${lastUpdate.toLocaleTimeString()}`;
}

function showLoading() {
    loading.style.display = 'block';
    errorContainer.innerHTML = '';
    candleImage.classList.add('image-loading');
}

function hideLoading() {
    loading.style.display = 'none';
}

function showError(message) {
    errorContainer.innerHTML = `
                <div class="error-message">
                    <p>⚠️ 图片加载失败</p>
                    <p>${message}</p>
                    <p style="margin-top: 10px; font-size: 0.9em">请尝试刷新或稍后重试</p>
                </div>
            `;
    candleImage.classList.add('image-loading');
}

// 事件监听
refreshButton.addEventListener('click', () => {
    fetchData();
    refreshButton.style.transform = 'rotate(360deg)';
    setTimeout(() => refreshButton.style.transform = 'rotate(0deg)', 500);
});

candleImage.addEventListener('click', () => {
    modalImage.src = candleImage.src;
    modalOverlay.classList.add('modal-active');
});

closeButton.addEventListener('click', () => {
    modalOverlay.classList.remove('modal-active');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('modal-active');
    }
});

// 自动刷新
setInterval(fetchData, 15 * 60 * 1000);