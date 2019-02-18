//Author: Jeff Kim (ek111)

function wall(){
    this.space = random(130, 300);
    this.top = random(height-this.space);
    this.bottom = height - this.top - this.space;
    //set the postion of the walls by setting the space first
    
    this.x = width;
    this.w = 40;
    this.speed = 6;
    //set where the walls start from and the width of the wall. Speed is set for the pace of the game
    
    this.display = function(){
        fill(150, 90, 60);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
    }
    //Draw the top and bottom walls
    
    this.update = function(ball){
        this.x -= this.speed;
        //Background moves left
        if((ball.y < this.top || ball.y > height - this.bottom) && 
           (ball.x > this.x && ball.x < this.x + this.w)){
                window.alert("You lost!");
                ball.x -= 100;
                document.location.reload();
           }
        //Lose when it hits the wall and restart the game
    }
}