// 创建星空背景
function createStars() {
    const stars = document.getElementById('stars');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = star.style.height = `${Math.random() * 3}px`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        stars.appendChild(star);
    }
}

// 图片加载
let retryCount = 0;
function loadImage() {
    const img = document.getElementById('taskImage');
    const loader = document.querySelector('.loader');

    img.style.opacity = '0';
    loader.style.display = 'block';

    const newImg = new Image();
    newImg.crossOrigin = 'anonymous';
    newImg.onload = () => {
        img.src = newImg.src;
        setTimeout(() => {
            img.style.opacity = '1';
            loader.style.display = 'none';
            // 绑定点击事件
            img.onclick = () => openModal(newImg.src);
        }, 300);
        retryCount = 0;
    }
    newImg.onerror = () => {
        if (retryCount < 3) {
            setTimeout(loadImage, 1000);
            retryCount++;
        } else {
            loader.innerHTML = '🚫 加载失败，请稍后再试';
        }
    }
    newImg.src = `https://api.t1qq.com/api/sky/sc/scrw?key=luF8owK4UYIjENYbUmtKvRx2Zi&t=${Date.now()}`;
}

// 图片放大功能
function openModal(src) {
    const modal = document.querySelector('.modal-overlay');
    const modalImg = document.querySelector('.modal-image');

    modalImg.src = src;
    modal.classList.add('active');

    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// 事件监听
document.querySelector('.modal-overlay').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay') ||
        e.target.classList.contains('close-btn')) {
        closeModal();
    }
});

// 键盘支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    createStars();
    loadImage();

    window.addEventListener('resize', () => {
        document.getElementById('stars').innerHTML = '';
        createStars();
    });
});

// 移动端触摸处理
let touchStartY = 0;
document.querySelector('.modal-content').addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.querySelector('.modal-content').addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const diff = touch.clientY - touchStartY;

    if (Math.abs(diff) > 50) {
        closeModal();
    }
});