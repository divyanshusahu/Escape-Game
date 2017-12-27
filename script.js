var canvas;
var canvasContext;
const FRAMES = 30;

window.onload = function() {
	canvas = document.getElementById("game");
	canvasContext = canvas.getContext('2d');
	setInterval(callEverything, 1000/FRAMES);
}

function callEverything() {
	draw();
}

function draw() {
	canvasContext.fillStyle = 'grey';
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}