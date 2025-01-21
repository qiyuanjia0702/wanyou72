const resources = [
    {
        name: '空中厕所',
        version: '1.0',
        size: '14.2MB',
        icon: 'https://square.candycake.cloud/uploads/1719063350_7949_P_Cvj_ccae162118.jpg',
        link: 'https://ipv4wp.axzzz.top:9503/f/RBOlsn/PoopSky-1.0.zip'
    },
    {
        name: '乌托邦探险之旅',
        version: '3.2',
        size: '2.1GB',
        icon: 'https://square.candycake.cloud/uploads/E5_F1_D3_C8932_B77_AACB_2_D0_BDD_25_E57_B17_038e19428f.png',
        link: 'https://ipv4wp.axzzz.top:9503/f/y3g1ug/Utopian3.2.zip'
    },
    {
        name: '雾中人',
        version: '1.3',
        size: '47.2MB',
        icon: 'https://square.candycake.cloud/uploads/638365568867248442_90b7f71694.jpeg',
        link: 'https://ipv4wp.axzzz.top:9503/f/D8E7Fo/Maninthefog-1.3.zip'
    }
    // 添加更多资源项
];

const resourceList = document.getElementById('resourceList');

resources.forEach(resource => {
    const listItem = document.createElement('li');
    listItem.className = 'resource-item';

    listItem.innerHTML = `
        <div class="resource-info">
            <img src="${resource.icon}" alt="${resource.name}图标" class="resource-icon">
            <div class="resource-details">
                <span class="resource-name">${resource.name}</span>
                <span class="resource-version-size">版本: ${resource.version} | 大小: ${resource.size}</span>
            </div>
        </div>
        <a href="${resource.link}" class="download-button" target="_blank">下载</a>
    `;

    resourceList.appendChild(listItem);
});

document.querySelectorAll('.download-button').forEach(button => {
    button.addEventListener('click', function () {
        alert('下载即将开始，请稍候...');
    });
});

function setTheme(theme) {
    document.body.className = theme;
    const themeToggle = document.getElementById('themeToggle');
    if (theme === 'day-theme') {
        themeToggle.innerHTML = '🌜';
        themeToggle.style.cursor = 'pointer';
    } else {
        themeToggle.innerHTML = '🌞';
        themeToggle.style.cursor = 'pointer';
    }
}

function updateThemeBasedOnTime() {
    const hour = new Date().getHours();
    if (hour >= 8 && hour < 18) {
        setTheme('day-theme');
    } else {
        setTheme('night-theme');
    }
}

document.getElementById('themeToggle').addEventListener('click', function () {
    if (document.body.className === 'day-theme') {
        setTheme('night-theme');
    } else {
        setTheme('day-theme');
    }
});

// 初始化按钮图标和鼠标样式
updateThemeBasedOnTime();
setInterval(updateThemeBasedOnTime, 30000); // 每分钟检查一次
