let canvas = document.getElementById('snake-game-canvas');
let scoreDisplay = document.getElementById('game-score');
let score = 0;
let canvasContext = canvas.getContext('2d');
let snakeDirection = undefined;
let snakeSpeed = 10;
let snakeSizeX = 20;
let snakeSizeY = 20;
// canvasContext.fillStyle = 'black';
// canvasContext.fillRect(0, 0, canvas.width, canvas.height);


//snake array
const snakeBody = [
    { xCoord: 100, yCoord: 300 },
    { xCoord: 90, yCoord: 300 },
    { xCoord: 80, yCoord: 300 },
    { xCoord: 70, yCoord: 300 },
    { xCoord: 60, yCoord: 300 }
];

//apple array
const applePosition = [
    {
        xLocation: (Math.floor(Math.random() * ((canvas.width - 20)) / 10)) * 10,
        yLocation: (Math.floor(Math.random() * ((canvas.height - 20)) / 10)) * 10
    }
];

//window load
window.onload = () => {
    runGame();
}

//draw canvas
function drawCanvas() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    drawSnake(snakeBody[0].xCoord, snakeBody[0].yCoord);
    snakeBody.forEach(snakePart => {
        drawSnake(snakePart.xCoord, snakePart.yCoord)
    })
    drawApple();
}

//draw snake
function drawSnake(xCoord, yCoord) {
    canvasContext.fillStyle = 'green';
    canvasContext.fillRect(xCoord, yCoord, snakeSizeX, snakeSizeY);
}

//draw apple
function drawApple(xLocation, yLocation) {
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(applePosition[0].xLocation, applePosition[0].yLocation, 20, 20);
}

//reset canvas


//keypress event
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


//snake movement
function moveSnake() {
    snakeBody.forEach(snakePart => {
        drawSnake(snakePart.xCoord, snakePart.yCoord)
    })
    // drawSnake(snakeBody[0].xCoord, snakeBody[0].yCoord);
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

//canvas checkCollision
function checkCollision(xCoord, yCoord) {
    if (snakeBody[0].xCoord >= canvas.width || snakeBody[0].xCoord <= -15) {
        endGame();
    }
    if (snakeBody[0].yCoord >= canvas.height || snakeBody[0].yCoord <= -15) {
        endGame();
    }
}

//apple checkCollision
function checkAppleCollision(xCoord, yCoord) {
    if (snakeBody[0].xCoord === applePosition[0].xLocation && snakeBody[0].yCoord === applePosition[0].yLocation) {
        newAppleLocation();
        return true;
        console.log("Apple eaten");
    }
}

//increase speed
function increaseSpeed() {
    if (checkAppleCollision === true) {
        snakeSpeed += 2;
    }
}

//add snake body part
function addBodyPart() {
    if (snakeBody[0].xCoord === applePosition[0].xLocation && snakeBody[0].yCoord === applePosition[0].yLocation) {
        snakeBody.push({ xCoord: snakeBody[snakeBody.length - 1].xCoord, yCoord: snakeBody[snakeBody.length - 1].yCoord });
    }
    console.table(snakeBody);
}


//new apple location
function newAppleLocation(xLocation, yLocation) {
    applePosition.pop();
    console.log('array popped');
    applePosition.push({ xLocation: (Math.floor(Math.random() * ((canvas.width - 20)) / 10)) * 10, yLocation: (Math.floor(Math.random() * ((canvas.height - 20)) / 10)) * 10 });
    console.log('array pushed');
}

//update game state
function updateGameState() {
    if (checkAppleCollision() === true) {
        addBodyPart();
        updateScore();
        increaseSpeed();
    }
}

//update score
function updateScore() {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
}

//end game function
function endGame() {
    alert('Game Over!');
}

//run game
function runGame() {

    drawCanvas();
    moveSnake();
    // updateScore();
    // checkAppleCollision();
    // checkCollision();
    updateGameState();
}

console.table(snakeBody);
console.table(applePosition);
//start game function

setInterval(moveSnake, 80);