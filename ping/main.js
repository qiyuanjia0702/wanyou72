// 获取页面上的div元素
const dataDiv = document.getElementById('data');

// 定义一个函数，用于从list.mczfw.cn/api获取JSON数据
async function fetchData() {
    try {
        const response = await fetch('https://list.mczfw.cn/api');
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('获取数据失败：', error);
    }
}

// 定义一个函数，用于在页面上显示数据
function displayData(data) {
    let html = '<table><thead><tr><th>图标</th><th>服务器IP地址</th><th>Ping延迟</th><th>MOTD</th></tr></thead>';
    for (let item of data) {
        let motd = window.innerWidth <= 768 && item.motd.length > 15 ? item.motd.substring(0, 15) + '...' : item.motd;
        let ping = getPing(item.ip);
        html += `<tr><td><img width="60" src="${item.logo}" alt="服务器图标"></td><td>${item.ip}</td><td>${ping}ms</td><td>${motd}</td></tr>`;
    }
    html += '</table>';
    dataDiv.innerHTML = html;
}

// 定义一个函数，用于获取ping延迟
function getPing(ip) {
    // 这里可以使用一个实际的ping服务来获取延迟
    // 例如：通过fetch请求一个ping服务API
    // 这里我们使用一个模拟的延迟值
    return Math.floor(Math.random() * 100);
}

// 调用fetchData函数，获取数据并显示在页面上
fetchData();

document.addEventListener('DOMContentLoaded', function() {  
	const form = document.getElementById('myForm');  
	form.addEventListener('submit', function(event) {  
		event.preventDefault(); // 阻止表单的默认提交行为  

		// 从表单中获取用户输入的IP地址  
		const ipInput = document.querySelector('input[name="ip"]');  
		const ip = ipInput.value;  

		// 构建请求的URL  
		const url = 'https://list.mczfw.cn/api/' + encodeURIComponent(ip);  

		// 使用fetch发送GET请求  
		fetch(url)  
		.then(response => {  
		  if (!response.ok) {  
			throw new Error('Network response was not ok.');  
		  }  
		  return response.json(); // 解析JSON响应  
		})  
		.then(data => {  
			let motd = window.innerWidth <= 768 && data.motd.length > 15 ? data.motd.substring(0, 15) + '...' : data.motd;
			let ping = getPing(data.ip);
			dataDiv.innerHTML = `<table><thead><tr><th>图标</th><th>在线人数</th><th>Ping延迟</th><th>MOTD</th></tr></thead><tr><td><img width="60" src="${data.logo}" alt="服务器图标"></td><td>${data.p}/${data.mp}</td><td>${ping}ms</td><td>${motd}</td></tr></table>`; 
		});  
	});    
});


