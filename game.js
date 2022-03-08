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
            case keyUp() :
                // console.log('ArrowUp')
                snakeDirection = "up";
                break;
            case keyDown():
                // console.log('ArrowDown')
                snakeDirection = "down";
                break;
            case keyLeft():
                // console.log('ArrowLeft')
                snakeDirection = "left";
                break;
            case keyRight():
                // console.log('ArrowRight')
                snakeDirection = "right";
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

function keyUp() {
    window.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowUp') {
            snakeDirection = "up";
        }
    })
}
function keyDown() {
    window.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
            snakeDirection = "down";
        }
    })
}
function keyLeft() {
    window.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            snakeDirection = "left";
        }
    })
}
function keyRight() {
    window.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            snakeDirection = "right";
        }
    })
}


function moveSnake() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    if (snakeDirection === "up" && snakeDirection !== "down") {
        snakeDirection = "up"
        snakePositionY -= 10;
    }

    if (snakeDirection === "down" && snakeDirection !== "up") {
        snakeDirection = "down"
        snakePositionY += 10;
    }

    if (snakeDirection === "left" && snakeDirection !== "right") {
        snakeDirection = "left"
        snakePositionX -= 10;
    }

    if (snakeDirection === "right" && snakeDirection !== "left") {
        snakeDirection = "right"
        snakePositionX += 10;
    }
}

setInterval(moveSnake, 250);


/* ------
if the snake direction is already moving up, and the down key is pressed, then continue up;
if the snake direction is already moving down, and the up key is pressed, then continue down;
if the snake direction is already moving left, and the right key is pressed; then continue left;
if the snake direction is already moving right, and the left key is pressed, then continue right:


-------- */
