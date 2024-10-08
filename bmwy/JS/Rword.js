fetch('https://api.imlcd.cn/yy/api.php')
    .then(response => response.json())
    .then(data => {
        const quote = data.content;
        document.getElementById('random-quote').textContent = quote;
    })
    .catch(error => {
        console.error('Error fetching quote:', error);
    });