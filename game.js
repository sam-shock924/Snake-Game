let canvas = document.getElementById('snake-game-canvas');
let scoreDisplay = document.getElementById('game-score');
let score = 0;
let canvasContext = canvas.getContext('2d');
let applePositionX = (Math.floor(Math.random() * ((canvas.width - 20))/10)) * 10;
let applePositionY = (Math.floor(Math.random() * ((canvas.height - 20))/10)) * 10;
let snakeDirection = undefined;
let snakeSpeed = 10;
let snakeSizeX = 20;
let snakeSizeY = 20;

const snakeBody = [
    { xCoord: 100, yCoord: 300 },
    { xCoord: 90, yCoord: 300 },
    { xCoord: 80, yCoord: 300 },
    { xCoord: 70, yCoord: 300 },
    { xCoord: 60, yCoord: 300 }
];

function endGame() {
    // debugger;
    // let restartButton = document.createElement('button');
    // debugger;
    // restartButton.setAttribute('id', 'restart-button');
    // debugger;
    // restartButton.addEventListener('click', () => {
    //     location.reload();
    // })
    // debugger;
    alert('Game Over!');
}

function drawCanvas() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(xCoord, yCoord) {
    canvasContext.fillStyle = 'green';
    canvasContext.fillRect(xCoord, yCoord, snakeSizeX, snakeSizeY);
}

window.onload = () => {
    drawCanvas();
    drawSnake(snakeBody[0].xCoord, snakeBody[0].yCoord);
    drawApple();
    snakeBody.forEach(snakePart => {
        drawSnake(snakePart.xCoord, snakePart.yCoord)
    })
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

function drawApple() {
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(applePositionX, applePositionY, 20, 20);
}

function resetCanvas() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    resetCanvas();
    const snakeBodyCopy = snakeBody.map(snakeParts => Object.assign({}, snakeParts));
    drawApple();
    drawSnake(snakeBody[0].xCoord, snakeBody[0].yCoord);
    snakeBody.forEach(snakePart => {
        drawSnake(snakePart.xCoord, snakePart.yCoord)
    })
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
    checkCollision();
    // console.log(snakeBody[0].xCoord, snakeBody[0].yCoord);
    // console.log(applePositionX, applePositionY);
}

function checkCollision(xCoord, yCoord) {
    if (snakeBody[0].xCoord >= canvas.width || snakeBody[0].xCoord <= -15) {
        endGame();
    }
    if (snakeBody[0].yCoord >= canvas.height || snakeBody[0].yCoord <= -15) {
        endGame();
    }
    newApple();
}

function addBodyPart() {
    if (snakeBody[0].xCoord === applePositionX && snakeBody[0].yCoord === applePositionY) {
        snakeBody.push({ xCoord: snakeBody[snakeBody.length - 1].xCoord, yCoord: snakeBody[snakeBody.length - 1].yCoord });
    }
}

function newApple() {
    if (snakeBody[0].xCoord === applePositionX && snakeBody[0].yCoord === applePositionY) {
        console.log("Apple eaten");
        resetCanvas();
        canvasContext.clearRect(applePositionX, applePositionY, 20, 20);
        drawApple();
        addBodyPart();
        updateScore();
    }
}

function updateScore() {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
}

setInterval(moveSnake, 100);