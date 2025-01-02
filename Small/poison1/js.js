let fps = document.getElementById('fps');
let frames = 0;
let lastTime = performance.now();
let intervalId = 0;

function render() {
    // Count frames and calculate the current FPS
    frames++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
        fps.textContent = frames + ' FPS';
        frames = 0;
        lastTime = now;
    }

    // Request the next frame
    intervalId = requestAnimationFrame(render);
}

// Start the rendering loop
intervalId = requestAnimationFrame(render);
