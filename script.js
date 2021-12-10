const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const SnakeParts = [];
let tallLength = 2;

let appleX = 5;
let appleY = 5;
let appleA = 6;
let appleB = 6;
let appleC = 7;
let appleD = 7;
let appleE = 8;
let appleF = 8;

let inputsxVelocity = 0;
let inputsyVelocity = 0;

let xVelocity=0;
let yVelocity=0;

let score = 0;

let previousxVelocity =0;
let previousyVelocity = 0;


function drawGame(){
    xVelocity = inputsxVelocity;
    yVelocity = inputsyVelocity;

    if(previousxVelocity === 1 && xVelocity === -1) {
        xVelocity = previousxVelocity;
    }
    if(previousxVelocity === -1 && xVelocity === 1) {
        xVelocity = previousxVelocity;
    }
    if(previousyVelocity === -1 && yVelocity === 1) {
        yVelocity = previousyVelocity;
    }
    if(previousyVelocity === 1 && yVelocity === -1) {
        yVelocity = previousyVelocity;
    }

    previousxVelocity = xVelocity;
    previousyVelocity = yVelocity;

    changeSnakePosition();
    let result = isGameOver();
    if(result){
        document.body.removeEventListener('keydown',keyDown);
        return;
    }
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000/ speed);
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }

    //walls
    if(headX < 0){
        gameOver = true;
    }
    if(headX === tileCount){
        gameOver = true;
    }
    if(headY < 0){
        gameOver = true;
    }
    if(headY === tileCount){
        gameOver = true;
    }  
    if(appleA == headX && appleB ==headY){
        gameOver = true;
    }
    if(appleE == headX && appleF ==headY){
        gameOver = true;
    }
    for(let i =0; i < SnakeParts.length; i++){
        let part = SnakeParts[i];
        if(part.x === headX && part.y ===headY){
            gameOver = true;
            break;
        }
    }
    if(gameOver){
        location.reload();
    }
    if (gameOver){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana"

        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height /2)
        }
    return gameOver;
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = "10px Verdana"
    ctx.fillText("Score: " + score, canvas.width-50, 10);
    if(score >= 3){
        drawRottenApple();
    } else if (score < 3) {
        appleA = 0;
        appleB = 0;
    }
    if(score >= 4){
        drawGreenApple();
    } else if(score < 4) {
        appleC = 0;
        appleD = 0;
    }
    if(score >= 5){
        drawRottenApple1();
    } else if(score < 5) {
        appleE = 0;
        appleF = 0;
    }
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake(){
    
    ctx.fillStyle = 'green';
    for(let i = 0; i < SnakeParts.length; i++){
        let part = SnakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y *tileCount, tileSize, tileSize)
    }

    SnakeParts.push(new SnakePart(headX, headY)); // put an item at the end of the list next to the head
    if(SnakeParts.length > tallLength){
        SnakeParts.shift(); // remove furthest item from the sname parts if we have more than our tail
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize,tileSize)
    }
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}
function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount,appleY * tileCount,tileSize,tileSize);
}

function drawGreenApple(){
    ctx.fillStyle = 'green';
    ctx.fillRect(appleC *tileCount,appleD * tileCount,tileSize,tileSize)
}
function drawRottenApple(){
    ctx.fillStyle = 'brown';
    ctx.fillRect(appleA *tileCount,appleB * tileCount,tileSize,tileSize)
}
function drawRottenApple1(){
    ctx.fillStyle = 'purple';
    ctx.fillRect(appleE *tileCount,appleF * tileCount,tileSize,tileSize)
}
function checkAppleCollision(){
    if(appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        appleA = Math.floor(Math.random() * tileCount);
        appleB = Math.floor(Math.random() * tileCount);
        appleC = Math.floor(Math.random() * tileCount);
        appleD = Math.floor(Math.random() * tileCount);
        appleE = Math.floor(Math.random() * tileCount);
        appleF = Math.floor(Math.random() * tileCount);
        tallLength++;
        score++;
        speed++;
    }
    if(appleC == headX && appleD == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        appleA = Math.floor(Math.random() * tileCount);
        appleB = Math.floor(Math.random() * tileCount);
        appleC = Math.floor(Math.random() * tileCount);
        appleD = Math.floor(Math.random() * tileCount);
        appleE = Math.floor(Math.random() * tileCount);
        appleF = Math.floor(Math.random() * tileCount);
        score++;
        speed++;
    }
}
document.body.addEventListener('keydown',keyDown);

function keyDown(event){

    //up
    if(event.keyCode == 38 || event.keyCode == 87){
        inputsyVelocity = -1;
        inputsxVelocity = 0;
    }

    //down
    if(event.keyCode == 40 || event.keyCode == 83){
        inputsyVelocity = 1;
        inputsxVelocity = 0;
    }
    //right
    if(event.keyCode == 39 || event.keyCode == 68){
        inputsyVelocity = 0;
        inputsxVelocity = 1;
    }
    //left
    if(event.keyCode == 37 || event.keyCode == 65){
        inputsyVelocity = 0;
        inputsxVelocity = -1;
    }
}
drawGame();
