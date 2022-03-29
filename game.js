let canvas = document.getElementById('snake-game-canvas');
let score = document.getElementById('game-score')
let canvasContext = canvas.getContext('2d');
let applePositionX = Math.floor(Math.random() * (canvas.width - 20));
let applePositionY = Math.floor(Math.random() * (canvas.height - 20));
let snakeDirection = undefined;
let snakeSizeX = 20;
let snakeSizeY = 20;

const snakeBody = [
    { xCoord: 100, yCoord: 300 },
    { xCoord: 90, yCoord: 300 },
    { xCoord: 80, yCoord: 300 }
];

function drawCanvas() {
    console.log('canvasDraw');
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(xCoord, yCoord) {
    console.log('snakeDraw')
    // canvasContext.beginPath();
    canvasContext.fillStyle = 'green';
    canvasContext.fillRect(xCoord, yCoord, snakeSizeX, snakeSizeY);
    // canvasContext.fill();
    // canvasContext.closePath();
}

snakeBody.forEach(snakePart => {
    drawSnake(snakePart.xCoord, snakePart.yCoord)
    console.log(snakePart);
})

window.onload = () => {
    console.log('hello');
    drawCanvas();
    drawSnake(snakeBody[0].xCoord, snakeBody[0].yCoord);
    drawApple();
    window.addEventListener('keydown', function (e) {
        switch (e.key) {
            case 'ArrowUp':
                console.log('ArrowUp')
                if (e.key ==="ArrowUp" && snakeDirection !=="down") {
                    snakeDirection = "up"
                }
                break;
            case 'ArrowDown':
                console.log('ArrowDown')
                if (e.key ==="ArrowDown" && snakeDirection !=="up") {
                    snakeDirection = "down"
                }
                break;
            case 'ArrowLeft':
                console.log('ArrowLeft')
                if (e.key ==="ArrowLeft" && snakeDirection !=="right") {
                    snakeDirection = "left"
                }
                break;
            case 'ArrowRight':
                console.log('ArrowRight')
                if (e.key ==="ArrowRight" && snakeDirection !=="left") {
                    snakeDirection = "right"
                }
                break;
        }
    })
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
    drawSnake(snakeBody[0].xCoord, snakeBody[0].yCoord);
    if (snakeDirection === "up") {
        snakeBody[1] -= 5;
    } 

    if (snakeDirection === "down") {
        snakeBody[1] += 5;
    }

    if (snakeDirection === "left") {
        snakeBody[0] -= 5;
    }

    if (snakeDirection === "right") {
        snakeBody[0] += 5;
    }
}

setInterval(moveSnake, 500);