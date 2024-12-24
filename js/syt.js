function queryLocation() {
    var xhr = new XMLHttpRequest();
    var apiUrl = 'https://qqlykm.cn/api/free/ip/get';
    var loadingText = document.getElementById('loading');
    var locationElement = document.getElementById('location');
    
    locationElement.innerHTML = '';
    loadingText.style.display = 'block';

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            loadingText.style.display = 'none';
            if (xhr.status == 200) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    if (data.success) {
                        locationElement.innerHTML = data.data.location; 
                    } else {
                        locationElement.innerHTML = '查询失败：' + (data.message || '未知错误');
                    }
                } catch (e) {
                    locationElement.innerHTML = '解析错误：' + e.message;
                }
            } else {
                locationElement.innerHTML = '请求失败：HTTP状态码 ' + xhr.status;
            }
        }
    };
    xhr.open('GET', apiUrl, true);
    xhr.send();
}

// 页面加载后自动调用查询函数
window.onload = queryLocation;