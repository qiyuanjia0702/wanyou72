// 获取页面上的功能卡片元素
const cards = document.querySelectorAll('.card');

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

// 定义一个函数，用于在卡片上显示数据
function displayData(card, data, title) {
    card.innerHTML = `
        <i class="fas fa-server card-icon"></i>
        <h3>${title}</h3>
        <p id="ping-${title}">加载中...</p>
        <p id="online-${title}">在线人数：${data.p}/${data.mp}</p>
        <p id="city-${title}">城市：${data.city}</p>
        <p id="motd-${title}">MOTD：${data.motd}</p>
    `;
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
        document.getElementById(`city-${title}`).innerText = `城市：${data.city}`;
        document.getElementById(`motd-${title}`).innerText = `MOTD：${data.motd}`;
    }
}

// 页面加载时自动调用fetchData函数，仅获取机械殖民地的数据并显示在卡片上
document.addEventListener('DOMContentLoaded', async function() {
    const server = { ip: 'neo.candycake.cloud:30475', title: '机械殖民地' };

    const data = await fetchData(server.ip);
    if (data) {
        displayData(cards[0], data, server.title);
    }

    // 实时更新ping延迟和在线人数及MOTD，仅针对机械殖民地
    setInterval(() => {
        updatePing(server.ip, server.title);
        updateOnline(server.ip, server.title);
    }, 3000); // 每3秒更新一次
});

// 如果有针对其他状态面板的逻辑，请移除
// 例如：document.getElementById('ping-雾中人').textContent = ...;


