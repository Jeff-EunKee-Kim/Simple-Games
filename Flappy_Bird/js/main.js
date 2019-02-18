//Author: Jeff Kim (ek111)

var ball;
var walls = [];
//Initialize variables

function preload(){
    song = loadSound('bgm.mp3');
}
//Load to play music

function setup(){
    createCanvas(700,550);
    song.play();
    song.setVolume(0.1);
    ball = new ball();
    walls.push(new wall());
    //Play music and set up constructors 
}

function draw(){
    background(150, 150, 100);
    fill(255, 0, 0);
    ellipse(50, 50, 70, 70);
    fill(255, 255, 100);
    line(40, 95, 45, 140);
    line(70, 90, 95, 130);
    line(90, 70, 125, 100);
    line(95, 45, 140, 45);
    line(90, 20, 130, 10);
    textSize(30);
    text('Sun', 20, 60); 
    //Draws the sun

    ball.display();
    ball.update();
    //Draws the ball
    
    if(frameCount % 100 === 0){
        walls.push(new wall());
    }
    //Built in function that counts every frame after the page was loaded
    //Push another wall to the array every 100 frames
    
    for (i = 0; i < walls.length; i++){
        walls[i].display();
        walls[i].update(ball);
        if(i == 5){
            textSize(60); 
            fill(50);
            text('Keep Going!!', 200, height/2);
        }
        //Cheer when player makes 5
    }
    //Draw each wall in the array
        textSize(80);
        fill(50);
        text(i - 1, 600, 70);
    //Text to keep track of the score
}

function keyPressed(){
    if (key == ' '){
        ball.jump();
    }
    //Built in function for saving the first key hit by the user
    //Allows the ball to jump when hit SPACE by user
}