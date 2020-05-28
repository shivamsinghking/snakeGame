var s;
var scl =10;
function setup(){
    createCanvas(400, 400)
    frameRate(100);
     stroke(255);
      strokeWeight(10);
      s = new Snake();
      pickLocation();
}
function draw(){
    background(0);
    s.update();
    s.show();
    if(s.eat(food)){
        pickLocation();
      }
    fill(255,0,100);
    rect(food.x,food.y,scl,scl);
    
  
   
}

function pickLocation(){
    var col = floor(width/scl);
    var row = floor(height/scl);
     food = createVector(floor(random(col)), floor(random(row)));
     food.mult(scl);
}

function keyPressed(){
    if(keyCode === UP_ARROW){
        s.dir(0,-1);
    }
    else if(keyCode === DOWN_ARROW){
        s.dir(0,1);
    }
    else if(keyCode === LEFT_ARROW){
        s.dir(-1,0);
    }
    else if(keyCode === RIGHT_ARROW){
        s.dir(1,0);
    }
}
function Snake(){
    this.x = 0;
    this.y =0;
    this.xspeed =1;
    this.yspeed=0;
    this.total=0;
    this.tail =[];
    
  this.dir = function(x,y){
      this.xspeed=x;
      this.yspeed =y;
  }
  this.eat = function(pos){
      
      var d = dist(this.x,this.y,pos.x,pos.y);

      if(d<7){
        this.total +=3;
          return true;
      }else{
          return false;
      }
  }
    this.update = function(){
        if(this.total === this.tail.length){
            for(var i=0;i<this.tail.length-1;i++){
                this.tail[i] = this.tail[i+1];
            }
        }
        this.tail[this.total-3] = createVector(this.x,this.y);
        this.tail[this.total-2] = createVector(this.x,this.y);
        this.tail[this.total-1] = createVector(this.x,this.y);
        this.x = this.x+this.xspeed*3;
        this.y = this.y +this.yspeed*3;
    }
    this.show = function(){
        for(var i=0;i<this.tail.length;i++){
            rect(this.tail[i].x,this.tail[i].y,scl,scl);
        }
        rect(this.x,this.y,scl,scl)
    }
}