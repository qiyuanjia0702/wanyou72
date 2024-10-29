// 设置txt文件的URL
const fileUrl = 'https://ipv4wp.axzzz.top:9503/f/9NPRUk/Panel.txt'; // 将此处替换为实际的txt文件URL
// 自动加载文件内容
function loadTxtFile() {
fetch(fileUrl)
.then(response => {
if (!response.ok) {
throw new Error('无法加载文件: ' + response.statusText);
}
return response.text();
})
.then(data => {
// 判断文件内容是否为空
document.getElementById("content").innerHTML = data.trim() ? data : "无公告";
})
.catch(error => {
document.getElementById("content").textContent = '无公告';
});
}
// 页面加载完成后自动调用
window.onload = loadTxtFile;