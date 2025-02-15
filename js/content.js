document.addEventListener('DOMContentLoaded', () => {
    // 设置主页标题和按钮文本
    document.querySelector('.hero h1').textContent = '打造卓越的游戏体验';
    document.querySelector('.hero .lead').textContent = '专业级服务器';
    document.querySelector('.btn.btn-primary').innerHTML = '开始探索 <i class="fas fa-arrow-right"></i>';

    // 设置导航栏标题图片
    const navbarTitle = document.querySelector('.navbar h2');
    navbarTitle.textContent = ''; // 清空原有文本
    const img = document.createElement('img');
    img.src = 'icon/logo.png'; 
    img.style.width = '120px'; // 设置图片宽度
    img.style.height = 'aotu'; // 保持图片比例
    navbarTitle.appendChild(img);

    // 设置导航栏链接文本
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks[0].textContent = '首页';
    navLinks[1].textContent = '产品';
    navLinks[2].textContent = '服务';
    navLinks[3].textContent = '关于';

    // 设置功能卡片文本
    const cards = document.querySelectorAll('.card');
    cards[0].querySelector('h3').textContent = '现代设计';
    cards[0].querySelector('p').textContent = '融合最新设计趋势，打造令人愉悦的用户界面';
    cards[1].querySelector('h3').textContent = '响应式布局';
    cards[1].querySelector('p').textContent = '完美适配各种设备尺寸，提供一致体验';
    cards[2].querySelector('h3').textContent = '极速性能';
    cards[2].querySelector('p').textContent = '优化后的代码保证最佳的运行效率';

    // 设置功能卡片服务器信息
    const servers = [
        { title: '乌托邦', ping: '加载中...', online: '加载中...', city: '加载中...', motd: '加载中...' },
        { title: '雾中人', ping: '加载中...', online: '加载中...', city: '加载中...', motd: '加载中...' },
        { title: 'YYZ', ping: '加载中...', online: '加载中...', city: '加载中...', motd: '加载中...' }
    ];

    for (let i = 0; i < servers.length; i++) {
        cards[i].querySelector('h3').textContent = servers[i].title;
        cards[i].querySelector('#ping-' + servers[i].title).textContent = servers[i].ping;
        cards[i].querySelector('#online-' + servers[i].title).textContent = servers[i].online;
        cards[i].querySelector('#city-' + servers[i].title).textContent = servers[i].city;
        cards[i].querySelector('#motd-' + servers[i].title).textContent = servers[i].motd;
    }
});
