let canvas = document.getElementById('snake-game-canvas');
let canvasContext = canvas.getContext('2d');
let scoreDisplay = document.getElementById('game-score');
let score = 0;
let snakeDirection = undefined;
let snakeSpeed = 10;
let snakeSizeX = 20;
let snakeSizeY = 20;


//snake array
const snakeBody = [
    { xCoord: 100, yCoord: 300 }
    // { xCoord: 90, yCoord: 300 },
    // { xCoord: 80, yCoord: 300 },
    // { xCoord: 70, yCoord: 300 },
    // { xCoord: 60, yCoord: 300 }
];

//apple array
const applePosition = [
    {
        xLocation: (Math.floor(Math.random() * ((canvas.width - 20)) / 10)) * 10,
        yLocation: (Math.floor(Math.random() * ((canvas.height - 20)) / 10)) * 10
    }
];

//run game
function runGame() {
    resetCanvas();
    drawCanvas();
    moveSnake();
    checkAppleCollision();
    checkSnakeCollision();
    checkWallCollision();
    // if (endGame() === true) {
    //     return;
    // }
}

//draw canvas
function drawCanvas() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
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
function resetCanvas() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

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
function checkWallCollision(xCoord, yCoord) {
    if (snakeBody[0].xCoord >= canvas.width || snakeBody[0].xCoord <= -15) {
        endGame();
    }
    if (snakeBody[0].yCoord >= canvas.height || snakeBody[0].yCoord <= -15) {
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
    // increaseSpeed();
}

//apple checkCollision
function checkAppleCollision() {
    if (snakeBody[0].xCoord === applePosition[0].xLocation && snakeBody[0].yCoord === applePosition[0].yLocation) {
        console.log("Apple eaten");
        updateGame();
    }
}

//increase speed
function increaseSpeed() {
    snakeSpeed += .1;
    console.log('speed increased');
    console.log(snakeSpeed);
}

//add snake body part
function addBodyPart() {
    if (snakeBody[0].xCoord === applePosition[0].xLocation && snakeBody[0].yCoord === applePosition[0].yLocation) {
        snakeBody.push({ xCoord: snakeBody[snakeBody.length - 1].xCoord, yCoord: snakeBody[snakeBody.length - 1].yCoord });
    }
    console.table(snakeBody);
    console.log('added body part');
}

//new apple location
function newAppleLocation() {
    applePosition.pop();
    console.log('array popped');
    applePosition.push({ xLocation: (Math.floor(Math.random() * ((canvas.width - 20)) / 10)) * 10, yLocation: (Math.floor(Math.random() * ((canvas.height - 20)) / 10)) * 10 });
    console.log('array pushed');
}

//update score
function updateScore() {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
    console.log('updated score');
}

//end game function
function endGame() {    
    // return true;
    console.log('Game Over!');
}

console.table(snakeBody);
console.table(applePosition);
//start game function

setInterval(runGame, 100);