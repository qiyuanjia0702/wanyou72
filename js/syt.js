function queryIP() {
    var xhr = new XMLHttpRequest();
    var apiUrl = 'https://qqlykm.cn/api/free/ip/get';
    var loadingText = document.getElementById('loading');
    var ipElement = document.getElementById('ip');
    var locationElement = document.getElementById('location');
    
    ipElement.innerHTML = '';
    locationElement.innerHTML = '';
    loadingText.style.display = 'block';

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            loadingText.style.display = 'none';
            if (xhr.status == 200) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    if (data.success) {
                        ipElement.innerHTML = data.data.ip;
                        locationElement.innerHTML = data.data.location; 
                    } else {
                        ipElement.innerHTML = '查询失败：' + (data.message || '未知错误');
                        locationElement.innerHTML = '';
                    }
                } catch (e) {
                    ipElement.innerHTML = '解析错误：' + e.message;
                    locationElement.innerHTML = '';
                }
            } else {
                ipElement.innerHTML = '请求失败：HTTP状态码 ' + xhr.status;
                locationElement.innerHTML = '';
            }
        }
    };
    xhr.open('GET', apiUrl, true);
    xhr.send();
}

// 页面加载后自动调用查询函数
window.onload = queryIP;
