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
    let html = `
        <div class="status-card">
            <img src="${data.logo}" alt="${title} 图标" class="status-card-logo">
            <div class="status-card-content">
                <h3>${title}</h3>
                <p id="ping-${title}">加载中...</p>
                <p id="online-${title}">在线人数：${data.p}/${data.mp}</p>
                <p id="city-${title}">城市：${data.city}</p> <!-- 移动城市信息 -->
                <p id="motd-${title}">MOTD：${data.motd}</p>
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
    document.getElementById(`ping-${title}`).innerText = `延迟：${ping} ms`;
}

// 定义一个函数，用于更新在线人数和MOTD
async function updateOnline(ip, title) {
    const data = await fetchData(ip);
    if (data) {
        document.getElementById(`online-${title}`).innerText = `在线人数：${data.p}/${data.mp}`;
        document.getElementById(`city-${title}`).innerText = `城市：${data.city}`; // 更新城市信息
        document.getElementById(`motd-${title}`).innerText = `MOTD：${data.motd}`;
    }
}

// 页面加载时自动调用fetchData函数，获取数据并显示在页面上
document.addEventListener('DOMContentLoaded', async function() {
    const servers = [
        { ip: 'neo.candycake.cloud:30475', title: '乌托邦' },
        { ip: 'neo.candycake.cloud:31320', title: '雾中人' },
        { ip: 'aito.candycake.cloud:28793', title: 'YYZ' } 
    ];

    let html = '';
    for (const server of servers) {
        const data = await fetchData(server.ip);
        if (data) {
            html += displayData(data, server.title);
        }
    }
    dataDiv.innerHTML = html;

    // 实时更新ping延迟和在线人数及MOTD
    setInterval(() => {
        servers.forEach(server => {
            updatePing(server.ip, server.title);
            updateOnline(server.ip, server.title);
        });
    }, 3000); // 每3秒更新一次
});


