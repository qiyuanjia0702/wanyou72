const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
const themeSwitcher = document.getElementById('themeSwitcher');
const backToTopBtn = document.querySelector('.back-to-top');

function toggleSidebar() {
    sidebar.classList.toggle('open');
    if (sidebar.classList.contains('open')) {
        toggleSidebarBtn.style.display = 'none'; // 打开侧边栏时隐藏按钮
        themeSwitcher.style.display = 'none'; // 打开侧边栏时隐藏主题切换按钮
        backToTopBtn.style.display = 'none'; // 打开侧边栏时隐藏返回顶部按钮
    } else {
        toggleSidebarBtn.style.display = 'flex'; // 关闭侧边栏时显示按钮
        themeSwitcher.style.display = 'flex'; // 关闭侧边栏时显示主题切换按钮
        backToTopBtn.style.display = 'flex'; // 关闭侧边栏时显示返回顶部按钮
    }
}

function closeSidebar() {
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        toggleSidebarBtn.style.display = 'flex';
        themeSwitcher.style.display = 'flex';
        backToTopBtn.style.display = 'flex';
    }
}

function toggleTheme() {
    const body = document.body;
    const buttons = document.querySelectorAll('.button');

    if (body.classList.contains("sunrise-mode")) {
        body.classList.remove("sunrise-mode");
        body.classList.add("night-mode");

        sidebar.classList.remove("sunrise-mode");
        sidebar.classList.add("night-mode");

        buttons.forEach(button => {
            button.classList.remove("sunrise-mode");
            button.classList.add("night-mode");
        });

        themeSwitcher.textContent = "🌙"; // 夜间模式图标
    } else {
        body.classList.remove("night-mode");
        body.classList.add("sunrise-mode");

        sidebar.classList.remove("night-mode");
        sidebar.classList.add("sunrise-mode");

        buttons.forEach(button => {
            button.classList.remove("night-mode");
            button.classList.add("sunrise-mode");
        });

        themeSwitcher.textContent = "🌞"; // 日出模式图标
    }
}

window.onscroll = function() {
    const button = document.querySelector('.back-to-top');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        button.style.display = "flex"; // 滚动超过20px时显示返回顶部) {
        button.style.display = "flex"; // 滚动超过20px时显示返回顶部按钮
    } else {
        button.style.display = "none"; // 否则隐藏
    }
};

function scrollToTop() {
    const scrollStep = -window.scrollY / (300 / 15); // 快速平滑滚动
    if (window.scrollY > 0) {
        window.scrollBy(0, scrollStep); // 向上滚动
        requestAnimationFrame(scrollToTop); // 继续滚动直到到达顶部
    }
}