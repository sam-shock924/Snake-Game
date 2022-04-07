const startButton = document.getElementById('start-game-button');
const restartButton = document.getElementById('restart-game-button');
let canvas = document.getElementById('snake-game-canvas');
let canvasContext = canvas.getContext('2d');
let scoreDisplay = document.getElementById('game-score');
let score = 0;
let snakeDirection = "right";
let snakeSpeed = 10;
let snakeSizeX = 20;
let snakeSizeY = 20;
let gameInterval;    


const snakeBody = [
    { xCoord: 100, yCoord: 300 },
    { xCoord: 90, yCoord: 300 },
    { xCoord: 80, yCoord: 300 },
    { xCoord: 70, yCoord: 300 },
    { xCoord: 60, yCoord: 300 }
];

const applePosition = [
    {
        xLocation: (Math.floor(Math.random() * ((canvas.width - 20)) / 10)) * 10,
        yLocation: (Math.floor(Math.random() * ((canvas.height - 20)) / 10)) * 10
    }
];
drawCanvas();

startButton.addEventListener('click', () => {
    gameInterval = setInterval(runGame, 100);
});

restartButton.addEventListener('click', () => {
    document.location.reload(true);
});


function runGame() {
    startButton.remove();
    resetCanvas();
    drawCanvas();
    checkAppleCollision();
    checkSnakeCollision();
    checkWallCollision();
    moveSnake();
}

function drawCanvas() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    snakeBody.forEach(snakePart => {
        drawSnake(snakePart.xCoord, snakePart.yCoord)
    })
    drawApple();
}

function drawSnake(xCoord, yCoord) {
    canvasContext.fillStyle = 'green';
    canvasContext.fillRect(xCoord, yCoord, snakeSizeX, snakeSizeY);
}

function drawApple(xLocation, yLocation) {
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(applePosition[0].xLocation, applePosition[0].yLocation, 20, 20);
}

function resetCanvas() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'ArrowUp':
            if (e.key ==="ArrowUp" && snakeDirection !=="down") {
                snakeDirection = "up"
            }
            break;
        case 'ArrowDown':
            if (e.key ==="ArrowDown" && snakeDirection !=="up") {
                snakeDirection = "down"
            }
            break;
        case 'ArrowLeft':
            if (e.key ==="ArrowLeft" && snakeDirection !=="right") {
                snakeDirection = "left"
            }
            break;
    case 'ArrowRight':
            if (e.key ==="ArrowRight" && snakeDirection !=="left") {
                snakeDirection = "right"
            }
            break;
    }
})

function moveSnake() {
    const snakeBodyCopy = snakeBody.map(snakeParts => Object.assign({}, snakeParts));
    if (snakeDirection === "up") {
        snakeBody[0].yCoord -= snakeSpeed;
    } 

    if (snakeDirection === "down") {
        snakeBody[0].yCoord += snakeSpeed;
    }

    if (snakeDirection === "left") {
        snakeBody[0].xCoord -= snakeSpeed;
    }

    if (snakeDirection === "right") {
        snakeBody[0].xCoord += snakeSpeed;
    }
    for (i = 1; i < snakeBody.length; i++) {
        snakeBody[i] = snakeBodyCopy[i - 1];
    }
}

function checkWallCollision(xCoord, yCoord) {
    if (snakeBody[0].xCoord >= canvas.width - 20 || snakeBody[0].xCoord <= 0) {
        endGame();
    }
    if (snakeBody[0].yCoord >= canvas.height - 20 || snakeBody[0].yCoord <= 0) {
        endGame();
    }
}

function checkSnakeCollision() {
    for (i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0].xCoord === snakeBody[i].xCoord && snakeBody[0].yCoord === snakeBody[i].yCoord) {
            endGame();
        }
    }
}

function updateGame() {
    addBodyPart();
    newAppleLocation();
    updateScore();
}

function checkAppleCollision() {
    if (snakeBody[0].xCoord === applePosition[0].xLocation && snakeBody[0].yCoord === applePosition[0].yLocation) {
        updateGame();
    }
}

function addBodyPart() {
    if (snakeBody[0].xCoord === applePosition[0].xLocation && snakeBody[0].yCoord === applePosition[0].yLocation) {
        snakeBody.push({ xCoord: snakeBody[snakeBody.length - 1].xCoord, yCoord: snakeBody[snakeBody.length - 1].yCoord });
    }
    console.table(snakeBody);
}

function newAppleLocation() {
    applePosition.pop();
    applePosition.push({ xLocation: (Math.floor(Math.random() * ((canvas.width - 20)) / 10)) * 10, yLocation: (Math.floor(Math.random() * ((canvas.height - 20)) / 10)) * 10 });
}

function updateScore() {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
}

function stopInterval() {
    clearInterval(gameInterval);
}

function endGame() { 
    stopInterval();
    alert('Game Over!');
}