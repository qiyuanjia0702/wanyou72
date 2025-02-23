// 生成随机星辰
function createStars(container) {
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(star);
    }
}

// 创建双层星辰背景
document.querySelectorAll('.stars').forEach(createStars);

// 加载API图片
const apiUrl = 'https://api.t1qq.com/api/sky/sc/scfk?key=luF8owK4UYIjENYbUmtKvRx2Zi';
const imgContainer = document.getElementById('prophecyImg');
const loading = document.getElementById('loading');

imgContainer.onload = () => {
    loading.style.display = 'none';
    imgContainer.style.display = 'block';
};

imgContainer.onerror = () => {
    loading.innerHTML = '⚠️ 未能获取先祖的讯息，请稍后重试';
};

// 设置图片来源
imgContainer.src = apiUrl;