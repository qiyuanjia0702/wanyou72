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
    },
    {
        name: 'YYZ-V2',
        version: '2.0',
        size: '1.1GB',
        icon: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_cc6945fe591d092854a951e677db269c~c5_300x300.jpeg?from=2956013662',
        link: 'https://ipv4wp.axzzz.top:9503/f/87E2tq/YYZ%E9%9A%94%E7%A6%BB%E5%AE%A2%E6%88%B7%E7%AB%AF.zip'
    },
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

function showDownloadModal(resource) {
    const modal = document.createElement('div');
    modal.className = `download-modal ${document.body.className}`;
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <p>您即将下载: <strong>${resource.name}</strong></p>
            <p>版本: ${resource.version}</p>
            <p>大小: ${resource.size}</p>
            <a href="${resource.link}" class="confirm-download-button" target="_blank">确认下载</a>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-button').addEventListener('click', function () {
        document.body.removeChild(modal);
    });

    modal.querySelector('.confirm-download-button').addEventListener('click', function () {
        document.body.removeChild(modal);
    });
}

document.querySelectorAll('.download-button').forEach((button, index) => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        showDownloadModal(resources[index]);
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
    document.querySelectorAll('.download-modal').forEach(modal => {
        modal.className = `download-modal ${theme}`;
    });
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
setInterval(updateThemeBasedOnTime, 30000); // 每半分钟检查一次
