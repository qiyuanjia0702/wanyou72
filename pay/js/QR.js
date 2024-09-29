function detectPaymentApp() {
    var ua = navigator.userAgent.toLowerCase();
    var qrcodeElement = document.getElementById('qrcode');
    var loadingElement = document.getElementById('loading');
    var img = document.createElement('img'); // 创建二维码图片元素

    // 显示加载动画
    loadingElement.style.display = 'block';

    // 图片加载完成后隐藏加载动画，显示二维码
    img.onload = function() {
        loadingElement.style.display = 'none'; // 隐藏加载图标
        img.style.display = 'block'; // 显示二维码
    };

    // 根据用户的应用类型设置二维码图片
    if (ua.indexOf('micromessenger') > -1) {
        img.src = 'https://ipv4wp.axzzz.top:9503/f/xWoNiE/%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98.png'; // 微信支付二维码
        img.alt = '微信支付二维码';
    } else if (ua.indexOf('alipay') > -1) {
        img.src = 'https://ipv4wp.axzzz.top:9503/f/N1mgCg/%E6%94%AF%E4%BB%98%E5%AE%9D.png'; // 支付宝支付二维码
        img.alt = '支付宝支付二维码';
    } else if (ua.indexOf('qq') > -1) {
        img.src = 'https://ipv4wp.axzzz.top:9503/f/G0RBuN/QQ%E6%94%AF%E4%BB%98.png'; // QQ支付二维码
        img.alt = 'QQ支付二维码';
    } else {
        // 没有检测到指定应用时显示默认图片
        img.src = 'https://ipv4wp.axzzz.top:9503/f/RAqEUn/%E8%A1%A8%E6%83%85%E5%8C%85.png'; // 默认的图标
        img.alt = '默认图片';
    }

    // 将二维码图片插入到页面中
    qrcodeElement.appendChild(img);
}

// 根据时间自动切换主题
function setThemeBasedOnTime() {
    var hours = new Date().getHours();
    var body = document.body;
    var themeIcon = document.getElementById('theme-icon');

    // 夜间模式时间范围
    if (hours >= 18 || hours < 6) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        themeIcon.textContent = '🌙'; // 使用月亮图标
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        themeIcon.textContent = '🌞'; // 使用太阳图标
    }
}

// 主题切换功能
document.getElementById('theme-toggle').addEventListener('click', function() {
    var body = document.body;
    var themeIcon = document.getElementById('theme-icon');

    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.textContent = '🌙'; // 切换为月亮图标
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.textContent = '🌞'; // 切换为太阳图标
    }
});

// 页面加载完成后自动检测时间并设置主题，检测应用并显示相应的二维码
window.onload = function() {
    setThemeBasedOnTime(); // 根据时间设置主题
    detectPaymentApp(); // 检测支付应用
};
// 禁止右键菜单功能
document.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // 禁用默认右键功能
    alert('禁止使用右键操作！'); // 弹出提示信息
});

// 禁用键盘上的全选快捷键 (Ctrl+A 或 Command+A)
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault(); // 禁止全选操作
        alert('禁止全选！'); // 弹出提示信息
    }
});