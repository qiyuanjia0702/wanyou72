/* JavaScript文件可托管自己云盘 */
var xhr = new XMLHttpRequest();
xhr.open('GET', '', true);
xhr.responseType = 'text';
xhr.onload = function() {
if (xhr.status === 200) {
document.getElementById('txt-content').innerHTML = xhr.responseText;
}
};
xhr.send();