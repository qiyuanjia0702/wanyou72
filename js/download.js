const resources = [
    {
        name: '资源1',
        version: '1.0.0',
        size: '50MB',
        icon: 'https://example.com/icon1.png',
        link: 'https://example.com/resource1.zip'
    },
    {
        name: '资源2',
        version: '2.1.0',
        size: '75MB',
        icon: 'https://example.com/icon2.png',
        link: 'https://example.com/resource2.zip'
    },
    {
        name: '资源3',
        version: '3.0.5',
        size: '120MB',
        icon: 'https://example.com/icon3.png',
        link: 'https://example.com/resource3.zip'
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
