window.addEventListener('load', function() {
    if (sessionStorage.getItem('skipLoading')) {
        document.getElementById('loading').classList.add('hidden');
        document.body.classList.remove('loading');
        sessionStorage.removeItem('skipLoading');
    } else {
        setTimeout(function() {
            document.getElementById('loading').classList.add('hidden');
            document.body.classList.remove('loading');
        }, 1000); // 最少加载1秒
    }
});

document.getElementById('home-link').addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
