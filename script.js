var canvas;
var canvasContext;
const FRAMES = 30;
const BALL_RADIUS = 8;
var ballX = BALL_RADIUS + 10; // set ball at middle initially
var ballY = 150 - BALL_RADIUS; // canvas.height/2 - BALL_RADIUS
const CONSTANT_GAP_VERTICAL = 60;
const CONSTANT_GAP_HORIZONTAL = 200;
const OBSTACLES_WIDTH = 20;
var BALLSPEEDUP = 20;
var BALLDOWNSPEED = 0;  // this defines gravity effect
const OBSTACLES_SPEED = 5;
var initial_pos = 400;
var current_pos = initial_pos;
var a = [];
var score = 0;
var thisObstacle = 0;
var isHit = 0;
var gameProgress = 0;

window.onload = function() {
    canvas = document.getElementById("game");
    canvasContext = canvas.getContext('2d');
    document.querySelector("#start").addEventListener("click", function(){
        if (gameProgress == 0) {
            var game = setInterval(function() {
                draw();
                if(isHit == 1) {
                    clearInterval(game);
                    gameProgress = 0;
                }
            } , 1000/FRAMES);
        }
        if (gameProgress == 0) {
            isHit = 0;
            thisObstacle = 0;
            score = 0;
            a =  obstaclesHeight();
            initial_pos = 400;
            current_pos = initial_pos;
            ballX = BALL_RADIUS + 10;
            ballY = 150 - BALL_RADIUS; 
        }
        gameProgress = 1;
    }, true);
}

function enableGravity() {
    let gravityButton = document.querySelector("#gravity");
    gravityButton.addEventListener("click", function() {
        if (BALLDOWNSPEED == 0) {
            BALLDOWNSPEED = 2;
            gravityButton.innerHTML = "Disable Gravity";
        }
        else if (BALLDOWNSPEED == 2) {
            BALLDOWNSPEED = 0;
            gravityButton.innerHTML = "Enable Gravity";
        }
    });
}
enableGravity();

function obstaclesHeight() {
	let a = [];
	for (let i=0;i<1000;i++) {
		a.push(Math.floor(Math.random()*240) + 1)
	}
	return a;
}

function hit(x) {
	if ((ballY-8 < x || ballY+8 > (x+CONSTANT_GAP_VERTICAL)) && ((current_pos%200 == 20 || current_pos%200 == -180) && current_pos<=20)){
		isHit = 1;
	}
}

function drawObstacles(pos) {
    canvasContext.fillStyle = '#4caf50';
    let i = pos;
    let count = 0;
    while( i < canvas.width) {
    	canvasContext.fillRect(i, 0, OBSTACLES_WIDTH, a[count]);
    	canvasContext.fillRect(i, a[count]+CONSTANT_GAP_VERTICAL, OBSTACLES_WIDTH, canvas.height -(a[count]+CONSTANT_GAP_VERTICAL));
    	i += CONSTANT_GAP_HORIZONTAL;
    	count++;
    	if (count == 1000) {
    		count = 0;
    	}
    }
}

function draw() {

    // ***** Game Body ***** //
    canvasContext.fillStyle = '#696969';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    // ********************* //

    // ****** Ball **********//
    canvasContext.fillStyle = '#f44336';
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2, true);
    canvasContext.fill();
    // **********************//

    moveBall();
    if ((current_pos % CONSTANT_GAP_HORIZONTAL == 0 && current_pos != initial_pos) && (current_pos <= 0)) {
    	thisObstacle++;
    	if (thisObstacle == 1000){
    		thisObstacle = 0;
    	}
    }
    //console.log(thisObstacle);
    hit(a[thisObstacle]);
    drawObstacles(current_pos);
    current_pos -= OBSTACLES_SPEED;
    document.querySelector("#score").innerHTML = "Score: " + thisObstacle;

}

window.addEventListener("keydown", function(event) {
        ballUp(event);
    }, true);

function ballUp(event) {

    if (event.keyCode == 38 && ballY > 10) {
        ballY -= BALLSPEEDUP;
    }

    else if (event.keyCode == 40 && ballY < 290) {
    	ballY += BALLSPEEDUP;
    }

}

function moveBall() {

    if (ballY < 292) {
        ballY += BALLDOWNSPEED;
    }
}