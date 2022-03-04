let canvas = document.getElementById('snake-game-canvas');
let canvasContext;
let snakePositionX = 100;
let snakePositionY = 300;
let framesPerSecond = 30;

window.onload = () => {
    console.log('hello');
    drawCanvas();
    drawSnake();
    window.addEventListener('keydown', function (e) {
        switch (e.key) {
            case 'ArrowUp':
                console.log('ArrowUp')
                snakePositionY -= 20;
                break;
            case 'ArrowDown':
                console.log('ArrowDown')
                snakePositionY += 20;
                break;
            case 'ArrowLeft':
                console.log('ArrowLeft')
                snakePositionX -= 20;
                break;
            case 'ArrowRight':
                console.log('ArrowRight')
                snakePositionX += 20;
                break;
        }
    })
}

function drawCanvas() {
    console.log('canvasDraw');
    canvasContext = canvas.getContext('2d');
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    console.log('snakeDraw')
    canvasContext.beginPath();
    canvasContext.fillStyle = 'green';
    canvasContext.fillRect(snakePositionX, snakePositionY, 20, 20);
    canvasContext.fill();
    canvasContext.closePath();
}

function moveSnake() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    drawSnake();
}

setInterval(moveSnake, 500);