var canvas;
var canvasContext;
const FRAMES = 20;
const BALL_RADIUS = 8;
var ballX = BALL_RADIUS + 10; // set ball at middle initially
var ballY = 150 - BALL_RADIUS; // canvas.height/2 - BALL_RADIUS
const CONSTANT_GAP_VERTICAL = 60;
const CONSTANT_GAP_HORIZONTAL = 200;
const OBSTACLES_WIDTH = 20;
var BALLSPEEDUP = 20;
var BALLDOWNSPEED = 0;  // this defines gravity effect
const OBSTACLES_SPEED = 5;
var pos = 200;
var a = [];
var score = 0;
var thisObstacle = 0;

window.onload = function() {
    canvas = document.getElementById("game");
    canvasContext = canvas.getContext('2d');
    setInterval(callEverything, 1000 / FRAMES);
}

function callEverything() {
    draw();
}

function obstaclesHeight() {
	let a = [];
	for (let i=0;i<1000;i++) {
		a.push(Math.floor(Math.random()*240) + 1)
	}
	return a;
}

a =  obstaclesHeight();

function hit(x) {
	if ((ballY-8 < x || ballY+8 > (x + CONSTANT_GAP_VERTICAL)) && (pos%200 == 20 || pos%200 == -180)) {
		console.log("HIT");
	}
}

function drawObstacles(pos) {
    canvasContext.fillStyle = '#4caf50';
    let i = pos;
    let count = 0;
    while( i < canvas.width) {
    	canvasContext.fillRect(i, 0, OBSTACLES_WIDTH, a[count]);
    	canvasContext.fillRect(i, a[count] + CONSTANT_GAP_VERTICAL, OBSTACLES_WIDTH, canvas.height - (a[count] + CONSTANT_GAP_VERTICAL));
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
    if (pos%CONSTANT_GAP_HORIZONTAL ==0 && pos!= CONSTANT_GAP_HORIZONTAL) {
    	thisObstacle++;
    	if (thisObstacle == 1000){
    		thisObstacle = 0;
    	}
    }
    //console.log(thisObstacle);
    hit(a[thisObstacle]);
    drawObstacles(pos);
    pos -= OBSTACLES_SPEED;

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