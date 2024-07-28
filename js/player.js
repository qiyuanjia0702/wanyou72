document.getElementById("player-entirety").outerHTML = '<div id="player-entirety" oc="close">\n\t\t<div id="player-container">\n\t\t\t<span id="close-botton"></span>\n\t\t\t<h1 id="v2">音乐播放器</h1>\n\t\t\t<div id="music-info">\n\t\t\t\t<div id="music-cover" style="background-image: url(&quot;cover1.jpg&quot;);"></div>\n\t\t\t\t<div id="music-details">\n\t\t\t\t\t<div id="music-title">\n\t\t\t\t\t\t歌曲1\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id="music-artist">\n\t\t\t\t\t\t歌手1\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id="music-progress">\n\t\t\t\t\t\t00:00/00:00\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id="controls">\n\t\t\t\t<button id="prev-button"><i id="v3" class="fas fa-backward"></i></button>\n\t\t\t\t<button id="play-button"><i class="fas fa-play"></i></button>\n\t\t\t\t<button id="next-button"><i id="v5" class="fas fa-forward"></i></button>\n\t\t\t</div>\n\t\t\t<div id="progress-bar">\n\t\t\t\t<div id="progress-bar-fill"></div>\n\t\t\t\t<div id="progress-bar-thumb"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div id="playerOpen"></div>\n\t</div>';
// 音乐列表
var playlist = playlist || [{
        title: "Wake",
        artist: "圈圈菌",
        src: "https://ipv4wp.axzzz.top:9503/f/64gmSM/Wake-oao.mp3",
        cover: "https://imgapi.cn/qq.php?qq=3038886380"
    },
    {
        title: "One Last Kiss",
        artist: "宇多田ヒカル",
        src: "https://ipv4wp.axzzz.top:9503/f/1agNFl/One%20Last%20Kiss-%E5%AE%87%E5%A4%9A%E7%94%B0%E3%83%92%E3%82%AB%E3%83%AB.mp3",
        cover: "https://imgapi.cn/qq.php?qq=3038886380"
    },
    {
        title: "What U Do",
        artist: "Wild Culture/Shel Bee",
        src: "https://ipv4wp.axzzz.top:9503/f/bBqPhO/What%20U%20Do-Wild%20Culture&Shel%20Bee.mp3",
        cover: "https://imgapi.cn/qq.php?qq=3038886380"
    },
    // 更多歌曲...
];
//歌曲索引
var currentSong = function() {
    var currentSong_get_cirrentSong_function_var = localStorage.getItem("currentSong");
    if (currentSong_get_cirrentSong_function_var >= playlist.length || currentSong_get_cirrentSong_function_var == undefined || currentSong_get_cirrentSong_function_var == null) {
        return 0;
    } else {
        return localStorage.getItem("currentSong");
    }
}();
var audio = new Audio();
var progressBarFill = document.getElementById("progress-bar-fill");
var progressBar = document.getElementById("progress-bar");
var progressBarThumb = document.getElementById("progress-bar-thumb");
var isDragging = false;

// 初始化音乐信息
function initMusicInfo() {
    var musicCover = document.getElementById("music-cover");
    var musicTitle = document.getElementById("music-title");
    var musicArtist = document.getElementById("music-artist");

    musicCover.style.backgroundImage = "url(" + playlist[currentSong].cover + ")";
    musicTitle.textContent = playlist[currentSong].title;
    musicArtist.textContent = playlist[currentSong].artist;
}

// 播放音乐
function playMusic() {
    var playButton = document.getElementById("play-button");
    playButton.innerHTML = "<i class='fas fa-pause'></i>";
    audio.src = playlist[currentSong].src;
    audio.currentTime = localStorage.getItem("currentProgress") || 0;
    audio.play();
    localStorage.setItem("currentSong", currentSong);
    document.getElementById("music-cover").style.animationPlayState = "";
    if (audio.paused) {
        alert("您的浏览器似乎不支持自动播放，请点击播放按钮手动播放");
        playButton.innerHTML = "<i class='fas fa-play'></i>";
        document.getElementById("music-cover").style.animationPlayState = "paused";
    }
}

// 暂停音乐
function pauseMusic() {
    var playButton = document.getElementById("play-button");
    playButton.innerHTML = "<i class='fas fa-play'></i>";
    audio.pause();
    document.getElementById("music-cover").style.animationPlayState = "paused";
    localStorage.setItem("currentProgress", audio.currentTime);
}

// 上一首
function prevSong() {
    if (currentSong === 0) {
        currentSong = playlist.length - 1;
    } else {
        currentSong--;
    }

    localStorage.setItem("currentProgress", 0);
    initMusicInfo();
    playMusic();
}

// 下一首
function nextSong() {
    if (currentSong === playlist.length - 1) {
        currentSong = 0;
    } else {
        currentSong++;
    }

    localStorage.setItem("currentProgress", 0);
    initMusicInfo();
    playMusic();
}

// 更新进度条
function updateProgressBar() {
    var progress = ((audio.currentTime / audio.duration) * 100) + "%";
    progressBarFill.style.width = progress;
    progressBarThumb.style.left = progress;
    document.getElementById("music-progress").innerText = function() {
        return ((Math.floor(audio.currentTime / 60).toString().padStart(2, '0') + ":" + Math.floor(audio.currentTime % 60).toString().padStart(2, '0')) + "/" + (Math.floor(audio.duration / 60).toString().padStart(2, '0') + ":" + Math.floor(audio.duration % 60).toString().padStart(2, '0')));
    }()
    if (audio.currentTime === audio.duration) {
        nextSong();
    }
}

// 拖动进度条
function dragProgressBar(event) {
    if (isDragging) {
        var position = event.clientX - progressBar.getBoundingClientRect().left;
        var progress = (position / progressBar.offsetWidth) * 100;
        progressBarFill.style.width = progress + "%";
        progressBarThumb.style.left = progress + "%";
    }
}

// 开始拖动
progressBarThumb.addEventListener("mousedown", function(event) {
    isDragging = true;
});

// 停止拖动
window.addEventListener("mouseup", function() {
    if (isDragging) {
        var position = event.clientX - progressBar.getBoundingClientRect().left;
        var progress = (position / progressBar.offsetWidth) * audio.duration;
        audio.currentTime = progress;
        isDragging = false;
    }
});

// 初始化音乐播放器
function initPlayer() {
    // 恢复之前保存的播放歌曲和进度
    currentSong = function() {
        var currentSong_get_cirrentSong_function_var = localStorage.getItem("currentSong");
        if (currentSong_get_cirrentSong_function_var >= playlist.length || currentSong_get_cirrentSong_function_var == undefined || currentSong_get_cirrentSong_function_var == null) {
            return 0;
        } else {
            return parseInt(localStorage.getItem("currentSong"));
        }
    }();
    initMusicInfo();

    // 绑定按钮事件
    var playButton = document.getElementById("play-button");
    playButton.addEventListener("click", function() {
        if (audio.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    });

    var prevButton = document.getElementById("prev-button");
    prevButton.addEventListener("click", prevSong);

    var nextButton = document.getElementById("next-button");
    nextButton.addEventListener("click", nextSong);

    // 更新进度条
    audio.addEventListener("timeupdate", updateProgressBar);

    // 监听拖动事件
    progressBar.addEventListener("mousemove", dragProgressBar);

    document.getElementById("close-botton").addEventListener("click", function() {
        document.getElementById("player-entirety").setAttribute("oc", "close");
    });

    document.getElementById("playerOpen").addEventListener("click", function() {
        document.getElementById("player-entirety").setAttribute("oc", "open");
    });

    localStorage.setItem("currentProgress", 0);
}

// 初始化音乐播放器
initPlayer();
playMusic();