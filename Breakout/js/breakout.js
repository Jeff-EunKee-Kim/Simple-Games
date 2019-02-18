//Title: Breakout Javascript
//
//Author: Jeff Kim (ek111)
//Date: February 12th, 2018

var canvas = document.getElementById('bgCanvas');
var ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height-60;
var dx = 4;
var dy = -4;
var ballRadius = 15;

var paddleHeight = 20;
var paddleWidth = 140;
var paddleX = (canvas.width - paddleWidth)/2;

var right = false;
var left = false;

var brickRows = 7;
var brickColumns = 5;
var brickWidth = 130;
var brickHeight = 35;
var brickPadding = 14;
var brickTop = 50;
var brickLeft = 50;

var score = 0;
var lives = 2;
var totalScore = 0;

var c;
var r;
var a;
var brickX;
var brickY;
var bricks = [];

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "brown";
    ctx.fill();
    ctx.closePath();
}

function keyDown(e){
    if(e.keyCode === 39){
        right = true;
    }
    else if(e.keyCode === 37){
        left = true;
    }
}

function keyUp(e){
    if(e.keyCode === 39){
        right = false;
    }
    else if(e.keyCode === 37){
        left = false;
    }
}

for(c=0; c<brickColumns; c+=1) {
    bricks[c] = [];
    for(r=0; r<brickRows; r+=1) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

function drawBricks(){
    for(c=0; c<brickColumns; c+=1){
        for(r=0; r<brickRows; r+=1){
            if(bricks[c][r].status === 1){
                brickX = c*(brickWidth + brickPadding) + brickLeft;
                brickY = r*(brickHeight + brickPadding) + brickTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                switch(r){
                    case 0:
                        r = 0;
                        ctx.fillStyle = "red";
                        break;
                    case 1: 
                        r = 1;
                        ctx.fillStyle = "orange";
                        break;
                    case 2:
                        r = 2;
                        ctx.fillStyle = "yellow";
                        break;
                    case 3: 
                        r = 3;
                        ctx.fillStyle = "green";
                        break;
                    case 4:
                        r = 4;
                        ctx.fillStyle = "blue";
                        break;
                    case 5:
                        r = 5; 
                        ctx.fillStyle = "navy";
                        break;
                    case 6:
                        r = 6;
                        ctx.fillStyle = "purple";
                        break;
                }
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

function collisionDetection(){
    for(c=0; c<brickColumns; c+=1){
        for(r=0; r<brickRows; r+=1){
            a = bricks[c][r];
            if(a.status === 1){
                if(x > a.x && x < a.x + brickWidth && y > a.y && y < a.y + brickHeight){
                    dy = -dy;
                    a.status = 0;
                    score+=1;
                    if((score + totalScore) === brickRows * brickColumns){
                    window.alert("CONGRATULATIONS!!! YOU WON!!!!");
                    dy = 0;
                    dx = 0;
                    totalScore = brickRows * brickColumns;
                    }
                }
            }
        }
    }
}

function drawtotalScore(){
    ctx.font = "25px bolder small-caps Arial";
    ctx.fillText("Total Score: "+totalScore, 200, 20);
}

function drawScore(){
    ctx.font = "25px bolder Arial";
    ctx.fillText("Score: "+score, 20, 20);
}

function drawLives(){
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Lives:" + lives, canvas.width - 100, 20);
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
    drawLives();
    drawtotalScore();
    
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
    }
    
    if(y + dy < ballRadius){
        dy = -dy;
    } 
    
    if(y + dy > canvas.height - ballRadius*2){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        } else {
            if(lives === 0){
                totalScore = totalScore + score;
                window.alert("YOU LOST. YOUR TOTAL SCORE IS "+totalScore);
                dx = 0;
                dy = 0;
                document.location.reload();
            }
            else{
                totalScore = totalScore + score;
                lives -= 1;
                window.alert("-1 life!!!");
                score = 0;
                x = canvas.width/2;
                y = canvas.height-60;
                dx = 4;
                dy = -4;
                paddleX = (canvas.width - paddleWidth)/2;
            }
        }
    }

    if(right && paddleX < canvas.width-paddleWidth){
        paddleX += 10;
    } else if(left && paddleX > 0){
        paddleX -= 10;
    }
    
    x += dx;
    y += dy;
}

function mouseMove(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > paddleWidth/2 && relativeX < canvas.width - paddleWidth/2){
        paddleX = relativeX - paddleWidth/2;
    }
}

function startGameE(){
    setInterval(draw,11);
    var song = document.getElementById("bgmusic");
    song.play();
}

function startGameH(){
    setInterval(draw,4);
    var song = document.getElementById("bgmusic");
    song.play();
}

function speedup(){
    setInterval(draw, 1);
}

function paddleL(){
    paddleWidth = 450;
    paddleX = (canvas.width - paddleWidth)/2;
}

function paddleM(){
    paddleWidth = canvas.width;
    paddleX = 0;
}

function restart(){
    document.location.reload();
}

function winGame(){
    window.alert("CONGRATULATIONS!!! YOU WON!!!");
    dy = 0;
    dx = 0;
    bricks = {status: 0};
    document.location.reload();
}

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);
document.addEventListener("mousemove", mouseMove, false);
document.getElementById("starteasy").addEventListener("mousedown", startGameE, false);
document.getElementById("starthard").addEventListener("mousedown", startGameH, false);
document.getElementById("restart").addEventListener("mousedown", restart, false);
document.getElementById("cheatCode").addEventListener("mousedown", winGame, false);
document.getElementById("paddleLong").addEventListener("mousedown", paddleL, false);
document.getElementById("paddleMax").addEventListener("mousedown", paddleM, false);
document.getElementById("speedup").addEventListener("mousedown", speedup, false);