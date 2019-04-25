var player;
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var spacePressed = false;

function setPlayerDirection(dir) {
	//Display the walk animation for the correct direction, remove the other directions
	//to ensure the player does not have both "left" and "right" applied at the same time
	player.classList.remove('up');
	player.classList.remove('left');
	player.classList.remove('right');
	player.classList.remove('down');

	player.classList.add(dir);
}

function keyUp(event) {
	if (event.keyCode == 37) {
		leftPressed = false;
	}

	if (event.keyCode == 39) {
		rightPressed = false;
	}

	if (event.keyCode == 38) {
		upPressed = false;
	}

	if (event.keyCode == 40) {
		downPressed = false;
	}

	if (event.keyCode == 32) {
		spacePressed = false;
	}
}


function move() {
	var left = player.offsetLeft;
	var top = player.offsetTop;

	if (downPressed) {
		setPlayerDirection('down');
		top = top + 1;
	}

	if (upPressed) {
		setPlayerDirection('up');
		top = top - 1;
	}

	if (leftPressed) {
		setPlayerDirection('left');
		left = left - 1;
	}

	if (rightPressed) {
		setPlayerDirection('right');
		left = left + 1;
	}
	
	

	//Get the the element at the coordinates for where the play will move to
	//All 4 corners of the player are required to check there is no collision on any side
	var playerTopLeft = document.elementFromPoint(left, top);
	var playerTopRight = document.elementFromPoint(left+32, top);
	var playerBottomLeft = document.elementFromPoint(left, top+48);
	var playerBottomRight = document.elementFromPoint(left+32, top+48);


	//If the element that the player is about to walk over contains the class "blocking" then
	// the player is not moved.
	// The player will only be moved to coordinates `top` and `left` if the element in that position is not blocking
	if (!playerTopLeft.classList.contains('blocking') && !playerTopRight.classList.contains('blocking')
		&& !playerBottomLeft.classList.contains('blocking') && !playerBottomRight.classList.contains('blocking')) {
		player.style.left = left + 'px';
		player.style.top = top + 'px';
	}

	//If any of the keys are being pressed, display the walk animation
	if (leftPressed || rightPressed || upPressed || downPressed) {
		player.classList.add('walk');
		player.classList.remove('stand');
	}
	//Otherwise, no keys are being pressed, display stand
	else {
		player.classList.add('stand');
		player.classList.remove('walk');
	}

}


function keyDown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}

	if (event.keyCode == 39) {
		rightPressed = true;
	}

	if (event.keyCode == 38) {
		upPressed = true;
	}

	if (event.keyCode == 40) {
		downPressed = true;
	}
	
	if (event.keyCode == 32) {
		spacePressed = true;
	}
}

function fire() {
	if (spacePressed) {
		playerLeftOffset = player.offsetLeft;
		playerTopOffset = player.offsetTop;

		var arrow = document.createElement('div');
		arrow.style.top = playerTopOffset + 'px';
		arrow.style.left = playerLeftOffset + 'px';

		if (player.classList.contains('left')) {
			arrow.className = 'arrow left';
		}
		if (player.classList.contains('right')) {
			arrow.className = 'arrow right';
		}
		if (player.classList.contains('up')) {
			arrow.className = 'arrow up';
		}
		if (player.classList.contains('down')) {
			arrow.className = 'arrow down';
		}
		//arrow.className = 'arrow';
		var body = document.getElementsByTagName('body')[0];

		body.appendChild(arrow);

		var fireinterval = setInterval(function(){
			var arrowTopOffset = arrow.offsetTop;
			var arrowLeftOffset = arrow.offsetLeft;
			
			if (arrow.classList.contains('up'))
			{
				arrowTopOffset = arrowTopOffset - 1;
			}
			else if (arrow.classList.contains('right'))
			{
				arrowLeftOffset = arrowLeftOffset + 1;
			}
			else if (arrow.classList.contains('down'))
			{
				arrowTopOffset = arrowTopOffset + 1;
			}
			else if (arrow.classList.contains('left'))
			{
				arrowLeftOffset = arrowLeftOffset - 1;
			}
			
			arrow.style.left = arrowLeftOffset + 'px';
			arrow.style.top = arrowTopOffset + 'px';
		}, 1);
		}
}


function gameStart() {
	player = document.getElementById('player');
	setInterval(move, 10);
	setInterval(fire, 500)
	document.addEventListener('keydown', keyDown);
	document.addEventListener('keyup', keyUp);
}


document.addEventListener('DOMContentLoaded', gameStart);


