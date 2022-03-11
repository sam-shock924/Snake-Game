let canvas = document.getElementById('snake-game-canvas');
let score = document.getElementById('game-score')
let canvasContext;
let fps = 30;
let snakePositionX = 100;
let snakePositionY = 300;
let applePositionX = Math.floor(Math.random() * (canvas.width - 20));
let applePositionY = Math.floor(Math.random() * (canvas.height - 20));
let snakeDirection = undefined;
let snakeSizeX = 20;
let snakeSizeY = 20;

window.onload = () => {
    console.log('hello');
    drawCanvas();
    drawSnake();
    drawApple();
    window.addEventListener('keydown', function (e) {
        switch (e.key) {
            case 'ArrowUp':
                // console.log('ArrowUp')
                if (e.key ==="ArrowUp" && snakeDirection !=="down") {
                    snakeDirection = "up"
                }
                break;
            case 'ArrowDown':
                // console.log('ArrowDown')
                if (e.key ==="ArrowDown" && snakeDirection !=="up") {
                    snakeDirection = "down"
                }
                break;
            case 'ArrowLeft':
                // console.log('ArrowLeft')
                if (e.key ==="ArrowLeft" && snakeDirection !=="right") {
                    snakeDirection = "left"
                }
                break;
            case 'ArrowRight':
                // console.log('ArrowRight')
                if (e.key ==="ArrowRight" && snakeDirection !=="left") {
                    snakeDirection = "right"
                }
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
    canvasContext.fillRect(snakePositionX, snakePositionY, snakeSizeX, snakeSizeY);
    canvasContext.fill();
    canvasContext.closePath();
}

function drawApple() {
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(applePositionX, applePositionY, 20, 20);
}

function moveSnake() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    drawApple();
    drawSnake();
    if (snakeDirection === "up") {
        snakePositionY -= 5;
    } 

    if (snakeDirection === "down") {
        snakePositionY += 5;
    }

    if (snakeDirection === "left") {
        snakePositionX -= 5;
    }

    if (snakeDirection === "right") {
        snakePositionX += 5;
    }
}

//snake collision
if (snakePositionX == canvas.width) {
    console.log('snake collision detected')
} 

setInterval(moveSnake, 2500/fps);