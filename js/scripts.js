// 滚动动画
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255,255,255,0.98)';
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 滑动到现代设计卡片
document.querySelector('.btn.btn-primary').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.card-container .card').scrollIntoView({
        behavior: 'smooth'
    });
});

// 禁止右键菜单和复制
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showTooltip('右键菜单已禁用');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'F12') {
        e.preventDefault();
        showTooltip('开发者工具已禁用');
    }
});

let tooltipTimeout;
let tooltipElement;

// 显示提示信息
function showTooltip(message) {
    if (tooltipElement) {
        clearTimeout(tooltipTimeout);
        tooltipElement.textContent = message;
    } else {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'tooltip';
        tooltipElement.textContent = message;
        document.body.appendChild(tooltipElement);
    }

    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    tooltipElement.style.top = `${navbarHeight + 10}px`; // 设置提示信息在导航栏下方

    setTimeout(() => {
        tooltipElement.style.opacity = '1';
    }, 100);

    tooltipTimeout = setTimeout(() => {
        tooltipElement.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(tooltipElement);
            tooltipElement = null;
        }, 500);
    }, 3000);
};

