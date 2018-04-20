// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var p_score = document.getElementById('score');
//var p_count = document.getElementById('ballcount');

var ballSum = 25;
var score = 0;
var ballsCount = ballSum;
p_score.innerHTML = "Score:  " + 0;
//p_count.textContent = "Ball count:  " + ballsCount;



var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Shape(x, y, velX, velY, exists){
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.exists = exists;
}

function EvilCircle(x, y, velX, velY, exists, color, size){
	Shape.call(this, x, y, velX, velY, exists);
	this.color = color;
	this.size = size;
}
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function(){
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.stroke();

}	

EvilCircle.prototype.checkBounds = function(){
	if((this.x + this.size) >= width){
		this.x = this.x - this.size;
	}
	if((this.x - this.size <= 0)){
		this.x = this.x + this.size;
	}
	if((this.y + this.size) >= height){
		this.y = this.y - this.size;
	}
	if((this.y - this.size) <= 0){
		this.y = this.y + this.size;
	}

}

EvilCircle.prototype.setControls = function(){
	var _this = this;
	window.onkeydown = function(e) {
    if (e.keyCode === 65) {
    	//alert("hello");
      _this.x -= _this.velX;
    } else if (e.keyCode === 68) {
      _this.x += _this.velX;
    } else if (e.keyCode === 87) {
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) {
      _this.y += _this.velY;
    }
  }

}

EvilCircle.prototype.collisionDetect = function(){
	for(var i = 0; i < balls.length; i++){
		if(balls[i].exists === true){
			var dx = this.x - balls[i].x;
			var dy = this.y - balls[i].y;
			var distance = Math.sqrt(dx * dx + dy * dy);
			if(distance < this.size + balls[i].size){
				balls[i].exists = false;
				score++;
				//ballsCount--;
				p_score.textContent = "score:  " + score;
				//p_count.textContent = "Ball Count:  " + ballsCount;
			}
		}
	}
}

var testEvilCircle = new EvilCircle(50, 100, 10, 10, true, 'blue', 30);
//testEvilCircle.draw();
// testEvilCircle.size = 0;
// testEvilCircle.draw();
testEvilCircle.setControls();






function Ball(x, y, velX, velY, exists, color, size){
	Shape.call(this, x, y, velX, velY, exists);
	this.color = color;
	this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;



Ball.prototype.draw = function(){
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.fill();
}

// var testBall = new Ball(50, 100, 4, 4, true, 'blue', 10);
// testBall.draw();


// var testBall = new Ball(50, 100, 4, 4, true, 'blue', 10);
// testBall.draw();


Ball.prototype.update = function(){
	if((this.x + this.size) >= width){
		this.velX = -(this.velX);
	}
	if((this.x - this.size <= 0)){
		this.velX = -(this.velX);
	}
	if((this.y + this.size) >= height){
		this.velY = -(this.velY);
	}
	if((this.y - this.size) <= 0){
		this.velY = -(this.velY);
	}

	this.x += this.velX;
	this.y += this.velY;
}

var balls = [];
function loop(){
	ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
	ctx.fillRect(0, 0, width, height);

	while(balls.length < 25){
		var ball = new Ball(
			random(0, width),
			random(0, height),
			random(-7, 7),
			random(-7, 7),
			true,
			'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')',
			random(10, 20)
			);
		balls.push(ball);
	}
	for(var i = 0; i < balls.length; i++){
		if(balls[i].exists === true){
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetect();
	}	
}
	testEvilCircle.draw();
	testEvilCircle.checkBounds();
	testEvilCircle.collisionDetect();

	requestAnimationFrame(loop);
}


//碰撞变色
Ball.prototype.collisionDetect = function(){
	for(var i = 0; i < balls.length; i++){
		if(!(this === balls[i])){
			var dx = this.x - balls[i].x;
			var dy = this.y - balls[i].y;
			var distance = Math.sqrt(dx * dx + dy * dy);
			if(distance < this.size + balls[i].size){
				balls[i].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0,255)+')';
				//加反弹的功能
				// balls[i].velX = -balls[i].velX;
				// balls[i].velY = -balls[i].velY;

				// this.velX = -this.velX;
				// this.velY = -this.velY;
			}
		}
	}
}


loop();

