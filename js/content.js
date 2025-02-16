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
    img.src = 'https://ipv4wp.axzzz.top:9503/f/2DWeIZ/Logo.png';
    img.style.width = '120px'; // 设置图片宽度
    img.style.height = 'aotu'; // 保持图片比例
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
        <h2>服务器公告</h2>
    `;

    // 设置功能卡片区文本
    const card = document.querySelector('.card');
    card.innerHTML = `
        <h3>公告（规章制度）</h3>
        <p>
        1.不正当分享:<br>不可以宣群或者链接，如：拼夕夕，未备案网站（非群主允许），带有低俗内容和链接，未经允许的安装包等（第一点想必都知道它的重要性）<br>
        2.遵守法律法规:<br>本群内的所有活动必须遵守国家法律法规，不得发布违法、色情、暴力、赌博等不良信息。<br>
        3.文明用语:<br>群内成员应文明用语，不得发表攻击性、侮辱性、歧视性言论，不得争吵、谩骂或诋毁他人。<br>
        4.禁止广告:<br>群内禁止发布任何形式的广告、推销信息，以及非官方发布的游戏外挂、辅助工具等。<br>
        5.尊重他人隐私:<br>群内成员应尊重他人隐私，不得私自公开或传播他人个人信息，如真实姓名、联系方式等。<br>
        6.禁止刷屏：<br>群内禁止频繁发送无意义的信息、图片、表情等，以免影响其他成员的正常交流。<br>
        7.禁止盗版行为:<br>群内成员应尊重游戏版权，不得分享或讨论盗版游戏资源，以及非官方发布的游戏补丁、模组等。<br>
        8.严禁诈骗行为:<br>群内禁止进行任何形式的诈骗行为，如假冒他人身份、骗取他人财物等。</h4>
        9.禁止恶意破坏:<br>群内成员应遵守游戏规则，不得恶意破坏他人游戏世界、服务器等，以及使用第三方软件进行作弊行为。<br>
        10.鼓励交流合作:<br>群内鼓励成员之间的交流合作，共同探索游戏乐趣，分享游戏经验和技术。<br>
        11.管理员职责:<br>管理员应积极维护群内秩序，及时处理违规行为，保护群内成员的合法权益。同时，管理员应尊重群内成员的言论自由，不得滥用职权。<br>
        12.群主的职责(服主):<br>
        ①维护群内秩序：群主需要负责维护群内的秩序，确保群内成员遵守群规，及时处理违规行为，保持群内的和谐氛围。<br>
        ②发布重要通知：群主需要在必要时发布重要通知，如群活动、群规变更、管理员任命等，确保群内成员及时了解相关信息。<br>
        ③保护群内成员权益：群主需要保护群内成员的合法权益，如防止成员受到诈骗、恶意攻击等，以及在必要时协助成员解决问题。<br>
        ④与管理员协作：群主需要与管理员密切协作，共同维护群内秩序，及时处理违规行为，以及处理群内成员的投诉和建议。<br>
        ⑤遵守法律法规：群主需要遵守国家法律法规，不得在群内发布违法、色情、暴力、赌博等不良信息，以及不得从事其他违法活动。<br>
        ⑥组织群活动：群主可以组织群活动，如线上游戏比赛等，增强群内成员的互动和凝聚力。<br>
        </p>
    `;

    // 设置功能卡片标题居中
    const cardTitles = document.querySelectorAll('.card h3');
    cardTitles.forEach(title => {
        title.style.textAlign = 'center';
    });
});

