var canvas;
var canvasContext;
const FRAMES = 25;
const BALL_RADIUS = 8;
var ballX = BALL_RADIUS + 10; // set ball at bottom initially
var ballY = 150 - BALL_RADIUS; // canvas.height - BALL_RADIUS
const CONSTANT_GAP_VERTICAL = 80;
const CONSTANT_GAP_HORIZONTAL = 200;
const OBSTACLES_WIDTH = 20;
var BALLSPEEDUP = 10;
var BALLDOWNSPEED = 1;
const OBSTACLES_SPEED = 1;
var pos = 200;
var a = [];

window.onload = function() {
    canvas = document.getElementById("game");
    canvasContext = canvas.getContext('2d');
    setInterval(callEverything, 1000 / FRAMES);
    //callEverything();
}

function callEverything() {
    draw();
}

//var top = Math.floor(Math.random() * 240) + 1;
function obstaclesHeight() {
	for (let i=0;i<5;i++) {
		a.push(Math.floor(Math.random()*240) + 1)
	}
	console.log(a);
}

obstaclesHeight();

function drawObstacles(pos) {
    canvasContext.fillStyle = '#4caf50';
    canvasContext.fillRect(pos, 0, OBSTACLES_WIDTH, a[0]);
    canvasContext.fillRect(pos, a[0] + CONSTANT_GAP_VERTICAL, OBSTACLES_WIDTH, canvas.height - (a[0] + CONSTANT_GAP_VERTICAL));
    let i = pos;
    while( i < canvas.width) {
    	i += CONSTANT_GAP_HORIZONTAL;
    	canvasContext.fillRect(i, 0, OBSTACLES_WIDTH, 100);
    	canvasContext.fillRect(i, 100 + CONSTANT_GAP_VERTICAL, OBSTACLES_WIDTH, canvas.height - 120);
    	//canvasContext.fillRect(i + 2*CONSTANT_GAP_HORIZONTAL, 0, OBSTACLES_WIDTH, 100);
    	//canvasContext.fillRect(i + 2*CONSTANT_GAP_HORIZONTAL, 100 + CONSTANT_GAP_VERTICAL, OBSTACLES_WIDTH, canvas.height - 150);
    	//canvasContext.fillRect(i + 3*CONSTANT_GAP_HORIZONTAL, 0, OBSTACLES_WIDTH, 100);
    	//canvasContext.fillRect(i + 3*CONSTANT_GAP_HORIZONTAL, 100 + CONSTANT_GAP_VERTICAL, OBSTACLES_WIDTH, canvas.height - 150);
    	//canvasContext.fillRect(i + 4*CONSTANT_GAP_HORIZONTAL, 0, OBSTACLES_WIDTH, 100);
    	//canvasContext.fillRect(i + 4*CONSTANT_GAP_HORIZONTAL, 100 + CONSTANT_GAP_VERTICAL, OBSTACLES_WIDTH, canvas.height - 150);
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