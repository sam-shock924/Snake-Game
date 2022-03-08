let canvas = document.getElementById('snake-game-canvas');
let canvasContext;
let snakePositionX = 100;
let snakePositionY = 300;
// let framesPerSecond = 30;
let snakeDirection = undefined;

window.onload = () => {
    console.log('hello');
    drawCanvas();
    drawSnake();
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
    canvasContext.fillRect(snakePositionX, snakePositionY, 20, 20);
    canvasContext.fill();
    canvasContext.closePath();
}

function moveSnake() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    if (snakeDirection === "up") {
        snakePositionY -= 10;
    } 

    if (snakeDirection === "down") {
        snakePositionY += 10;
    }

    if (snakeDirection === "left") {
        snakePositionX -= 10;
    }

    if (snakeDirection === "right") {
        snakePositionX += 10;
    }
}

setInterval(moveSnake, 250);



/* ------ NOTES ------



------ END OF NOTES -------- */
