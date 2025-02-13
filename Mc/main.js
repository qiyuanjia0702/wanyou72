// 获取页面上的div元素
const dataDiv = document.getElementById('data');

// 定义一个函数，用于从指定API地址获取JSON数据
async function fetchData(ip) {
    const url = 'https://list.mczfw.cn/api/' + encodeURIComponent(ip);
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取数据失败：', error);
        return null;
    }
}

// 定义一个函数，用于在页面上显示数据
function displayData(data, title) {
    let html = `<div class="server-card">
                    <img src="${data.logo}" alt="${title} logo">
                    <div class="info">
                        <h3>${title}</h3>
                        <p class="ping" id="ping-${title}">加载中...</p>
                        <p class="online" id="online-${title}">${data.p}/${data.mp}</p>
                        <p class="city" id="city-${title}">城市: ${data.city}</p> <!-- 添加城市字样 -->
                        <p class="motd" id="motd-${title}">${data.motd}</p>
                    </div>
                </div>`;
    return html;
}

// 定义一个函数，用于测试延迟并更新显示
async function updatePing(ip, title) {
    const start = Date.now();
    try {
        await fetch('https://' + ip);
    } catch (error) {
        console.error('Ping 测试失败：', error);
    }
    const ping = Date.now() - start;
    document.getElementById(`ping-${title}`).innerText = `${ping} ms`;
}

// 定义一个函数，用于更新在线人数
async function updateOnline(ip, title) {
    const data = await fetchData(ip);
    if (data) {
        document.getElementById(`online-${title}`).innerText = `${data.p}/${data.mp}`;
        document.getElementById(`city-${title}`).innerText = data.city;
        document.getElementById(`motd-${title}`).innerText = data.motd;
        document.querySelector(`#ping-${title}`).closest('.server-card').querySelector('img').src = data.logo; // 实时更新图标
    }
}

// 页面加载时自动调用fetchData函数，获取数据并显示在页面上
document.addEventListener('DOMContentLoaded', async function() {
    const servers = [
        { ip: 'ym.huan4.cn', title: '樱梦云海' },
        { ip: 'ip:hb.frp.one:10186', title: '纯生存服务器' },
        { ip: 'neo.candycake.cloud:30475', title: '乌托邦探险之旅' },
        { ip: 'neo.candycake.cloud:31320', title: '雾中人恐怖生存' },
        { ip: 'aito.candycake.cloud:28793', title: 'YYZ休闲服务器' } 
    ];

    let html = '';
    for (const server of servers) {
        const data = await fetchData(server.ip);
        if (data) {
            html += displayData(data, server.title);
        }
    }
    dataDiv.innerHTML = html;

    // 实时更新ping延迟和在线人数
    setInterval(() => {
        servers.forEach(server => {
            updatePing(server.ip, server.title);
            updateOnline(server.ip, server.title);
        });
    }, 3000); // 每3秒更新一次

    // 添加主题切换功能
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerText = '☀️'; // 默认黑夜模式按钮显示太阳图标
    document.body.appendChild(themeToggle);

    // 默认启用黑夜模式
    document.body.classList.add('dark-theme');

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        themeToggle.innerText = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
    });
});


