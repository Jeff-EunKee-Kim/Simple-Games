//Author: Jeff Kim (ek111)

function ball(){
    this.x = 50;
    this.y = height/2 - 100;
    //Setting the initial position of the ball, height is the canvas height by default in p5
    
    this.drop = 0;
    this.down = 0.95;
    this.up = -15;
    //define variables that would determine the position of the ball
    
    this.display = function(){
        fill(255, 255, 0);
        ellipse(this.x, this.y, 40, 40);
    };
    //make a function that shows the ball
    
    this.jump = function(){
        this.drop += this.up;
    };
    //make a function that jumps the ball up
    
    this.update = function(){
        this.drop += this.down;
        this.drop *= 0.95;
        //For a more natural movement of ball
        this.y += this.drop;
        
        if (this.y > height){
            window.alert("You lost!");
            document.location.reload();
            this.y = height/2;
        }
        if (this.y < 0){
            window.alert("You lost!");
            document.location.reload();
            this.y = height/2;
        }
        //Lose when the ball hits either the top or bottom of the screen
    };
    //Create a function that updates the position of the ball
}