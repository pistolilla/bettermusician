// Drawing logic for interactive circle of fifths
const img = document.getElementById('circleImg');
const canvas = document.getElementById('drawCanvas');
const drawBtn = document.getElementById('drawBtn');
const eraseBtn = document.getElementById('eraseBtn');
let drawing = false, isDrawingMode = false, last = null;

function resizeCanvas() {
    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;
    canvas.style.width = img.clientWidth + 'px';
    canvas.style.height = img.clientHeight + 'px';
}
img.onload = resizeCanvas;
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

canvas.addEventListener('mousedown', function(e) {
    if (!isDrawingMode) return;
    drawing = true;
    last = getPos(e);
});
canvas.addEventListener('mousemove', function(e) {
    if (!drawing || !isDrawingMode) return;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    last = pos;
});
canvas.addEventListener('mouseup', function() { drawing = false; });
canvas.addEventListener('mouseleave', function() { drawing = false; });

function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

drawBtn.onclick = function() {
    isDrawingMode = !isDrawingMode;
    canvas.style.pointerEvents = isDrawingMode ? 'auto' : 'none';
    drawBtn.classList.toggle('btn-danger', isDrawingMode);
    drawBtn.classList.toggle('btn-info', !isDrawingMode);
    drawBtn.textContent = isDrawingMode ? 'Drawing...' : 'Draw Line';
};
eraseBtn.onclick = function() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
