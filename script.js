var canvas;
var canvasContext;
const FRAMES = 20;
const BALL_RADIUS = 8;
var ballX = BALL_RADIUS + 10; // set ball at bottom initially
var ballY = 150 - BALL_RADIUS; // canvas.height - BALL_RADIUS
const CONSTANT_GAP_VERTICAL = 60;
const CONSTANT_GAP_HORIZONTAL = 200;
const OBSTACLES_WIDTH = 20;
var BALLSPEEDUP = 20;
var BALLDOWNSPEED = 0;
const OBSTACLES_SPEED = 5;
var pos = 200;
var a = [];
var score = 0;

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

function checkPass(x) {
	if (ballY > x && ballY < (x + CONSTANT_GAP_VERTICAL)) {
		return true;
	}
	conole.log("no");
	return false;
}

function currentObstacle(i) {
	if (i < 200)
		return true;
	return false;
}

function drawObstacles(pos) {
    canvasContext.fillStyle = '#4caf50';
    let i = pos;
    let count = 0;
    while( i < canvas.width) {
    	count++;
    	canvasContext.fillRect(i, 0, OBSTACLES_WIDTH, a[count]);
    	canvasContext.fillRect(i, a[count] + CONSTANT_GAP_VERTICAL, OBSTACLES_WIDTH, canvas.height - (a[count] + CONSTANT_GAP_VERTICAL));
    	i += CONSTANT_GAP_HORIZONTAL;
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
    pos -= OBSTACLES_SPEED;
    drawObstacles(pos);

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