let canvas = document.getElementById('snake-game-canvas');
let canvasContext;

window.onload = () => {
    console.log('hello');
    drawCanvas();
    drawSnake();
}

function drawCanvas() {
    console.log('sup');
    canvasContext = canvas.getContext('2d');
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    canvasContext.fillStyle = 'green';
    canvasContext.fillRect(100, 100, 20, 20);
}