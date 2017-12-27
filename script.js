var canvas;
var canvasContext;
const FRAMES = 30;
const BALL_RADIUS = 15;
var ballX = BALL_RADIUS + 10;       // set ball at bottom initially
var ballY = 600 - BALL_RADIUS; // canvas.height - BALL_RADIUS
const CONSTANT_GAP_VERTICAL = 100;
const CONSTANT_GAP_HORIZONTAL = 400;
const OBSTACLES_WIDTH = 20;

window.onload = function() {
	canvas = document.getElementById("game");
	canvasContext = canvas.getContext('2d');
	//setInterval(callEverything, 1000/FRAMES);
	callEverything();
}

function callEverything() {
	draw();
}

function drawObstacles() {
	canvasContext.fillStyle = '#4caf50';
	for (let i =500; i <= 1000; i += CONSTANT_GAP_HORIZONTAL) {
		let top = Math.floor(Math.random()*500) + 1;
		canvasContext.fillRect(i, 0, OBSTACLES_WIDTH, top);
		canvasContext.fillRect(i, top + CONSTANT_GAP_VERTICAL, OBSTACLES_WIDTH, canvas.height - top);
	}
}

function draw() {

	// ***** Game Body ***** //
	canvasContext.fillStyle = '#696969';
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	// ******************** //

	// ****** Ball **********//
	canvasContext.fillStyle = '#f44336';
	canvasContext.beginPath();
	canvasContext.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI*2, true);
	canvasContext.fill();
	// **********************//

	drawObstacles(); // draw obstacles
}