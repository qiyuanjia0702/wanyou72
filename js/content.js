// 主页面文本内容
document.addEventListener('DOMContentLoaded', () => {
    // 设置主页标题和按钮文本
    document.querySelector('.hero h1').textContent = '打造卓越的游戏体验';
    document.querySelector('.hero .lead').textContent = '专业级服务器';
    document.querySelector('.btn.btn-primary').innerHTML = '开始探索 <i class="fas fa-arrow-right"></i>';

    // 设置导航栏标题图片
    const navbarTitle = document.querySelector('.navbar h2');
    navbarTitle.textContent = ''; // 清空原有文本
    const img = document.createElement('img');
    img.src = 'https://www.20050702.top/i/2025/04/01/dkk2jh.png';
    img.style.width = '120px'; // 设置图片宽度
    img.style.height = 'auto'; // 保持图片比例
    navbarTitle.appendChild(img);

    // 设置导航栏字体为微软雅黑粗体
    const navbar = document.querySelector('.navbar');
    navbar.style.fontFamily = 'Microsoft YaHei, sans-serif';
    navbar.style.fontWeight = 'bold';

    // 设置导航栏链接文本
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks[0].textContent = '首页';
    navLinks[1].textContent = '服务';
    navLinks[2].textContent = '下载';
    navLinks[3].textContent = '关于';

    // 设置功能卡片服务器信息，仅保留机械殖民地
    const servers = [
        { title: '机械殖民地', ping: '加载中...', online: '加载中...', city: '加载中...', motd: '加载中...' }
    ];

    const card = document.querySelector('.card');
    card.querySelector('h3').textContent = servers[0].title;
    card.querySelector('#ping-' + servers[0].title).textContent = servers[0].ping;
    card.querySelector('#online-' + servers[0].title).textContent = servers[0].online;
    card.querySelector('#city-' + servers[0].title).textContent = servers[0].city;
    card.querySelector('#motd-' + servers[0].title).textContent = servers[0].motd;

    // 更新状态面板内容，仅保留机械殖民地的状态
    document.getElementById('ping-机械殖民地').textContent = 'Ping: 20ms';
    document.getElementById('online-机械殖民地').textContent = '在线人数: 15/100';
    document.getElementById('city-机械殖民地').textContent = '城市: 机械殖民地';
    document.getElementById('motd-机械殖民地').textContent = '欢迎来到机械殖民地服务器！';

    // 设置功能卡片标题居中
    const cardTitles = document.querySelectorAll('.card h3');
    cardTitles.forEach(title => {
        title.style.textAlign = 'center';
    });


});

// 服务页面文本内容
document.addEventListener('DOMContentLoaded', () => {
    // 设置主页标题和按钮文本
    document.querySelector('.hero h1').textContent = '打造卓越的游戏体验';
    document.querySelector('.hero .lead').textContent = '专业级服务器';
    document.querySelector('.btn.btn-primary').innerHTML = '开始探索 <i class="fas fa-arrow-right"></i>';

    // 设置导航栏标题图片
    const navbarTitle = document.querySelector('.navbar h2');
    navbarTitle.textContent = ''; // 清空原有文本
    const img = document.createElement('img');
    img.src = 'https://ipv4wp.axzzz.top:9503/f/2DWeIZ/Logo.png';
    img.style.width = '120px'; // 设置图片宽度
    img.style.height = 'auto'; // 保持图片比例
    navbarTitle.appendChild(img);

    // 设置导航栏字体为微软雅黑粗体
    const navbar = document.querySelector('.navbar');
    navbar.style.fontFamily = 'Microsoft YaHei, sans-serif';
    navbar.style.fontWeight = 'bold';

    // 设置导航栏链接文本
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks[0].textContent = '首页';
    navLinks[1].textContent = '服务';
    navLinks[2].textContent = '下载';
    navLinks[3].textContent = '关于';

    // 设置标签区文本
    const tagSection = document.querySelector('.card1');
    tagSection.innerHTML = `
    <h2>服务信息</h2>
    `;

    // 设置滑块内容
    const slides = document.querySelectorAll('.slide');
    const slideContents = [
        { imgSrc: 'https://example.com/image1.jpg', title: '滑块1', description: '这是滑块1的介绍' },
        { imgSrc: 'https://example.com/image2.jpg', title: '滑块2', description: '这是滑块2的介绍' },
        { imgSrc: 'https://example.com/image3.jpg', title: '滑块3', description: '这是滑块3的介绍' }
    ];

    slides.forEach((slide, index) => {
        const content = slideContents[index];
        slide.innerHTML = `
                <img src="${content.imgSrc}" alt="${content.title}" style="width: 80%; height: auto; display: block; margin: 0 auto;">
                <h3 style="text-align: center;">${content.title}</h3>
                <p style="text-align: center;">${content.description}</p>
            `;
    });
});

