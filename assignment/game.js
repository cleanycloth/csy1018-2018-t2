var player;
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var spacePressed = false;
var shiftPressed = false;
var DeathCount = 0;
var enemies = [];

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
	if (event.keyCode == 16) {
		shiftPressed = false;
	}
}

function move() {
	var left = player.offsetLeft;
	var top = player.offsetTop;

	if (downPressed) {
		setPlayerDirection('down');
		if (shiftPressed) {
			top = top + 2;
		}
		else {
			top = top + 1;
		}
	}
	if (upPressed) {
		setPlayerDirection('up');
		if (shiftPressed) {
			top = top - 2;
		}
		else {
			top = top - 1;
		}
	}
	if (leftPressed) {
		setPlayerDirection('left');
		if (shiftPressed) {
			left = left - 2;
		}
		else {
			left = left - 1;
		}
	}
	if (rightPressed) {
		setPlayerDirection('right');
		if (shiftPressed) {
			left = left + 2;
		}
		else {
			left = left + 1;
		}
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
	if (event.keyCode == 16) {
		shiftPressed = true;
	}
}

function reload() {
	document.addEventListener('keydown', fire);
	player.classList.remove('fire');
}
x = 0
function fire(event) {
	if (spacePressed) {
		player.classList.add('fire');
		playerLeftOffset = player.offsetLeft;
		playerTopOffset = player.offsetTop;
		var arrow = document.createElement('div');
		arrow.style.top = playerTopOffset + 20 + 'px';
		arrow.style.left = playerLeftOffset + 15 + 'px';
		document.removeEventListener('keydown', fire);
		setTimeout(reload, 500);
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
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(arrow);
		setInterval(function(){
			var arrowTopOffset = arrow.offsetTop;
			var arrowLeftOffset = arrow.offsetLeft;
			var arrowTopLeft = document.elementFromPoint(arrowLeftOffset, arrowTopOffset);
			var arrowTopRight = document.elementFromPoint(arrowLeftOffset+10, arrowTopOffset);
			var arrowBottomLeft = document.elementFromPoint(arrowLeftOffset, arrowTopOffset+10);
			var arrowBottomRight = document.elementFromPoint(arrowLeftOffset+10, arrowTopOffset+10);
			if (arrow.style.left == '10px' || arrow.style.left == '11px' || arrow.style.top == '10px' || arrow.style.top == '11px' || arrow.style.top == '950px' || arrow.style.top == '951px') {
				body.removeChild(arrow);
			}
			if (!arrowTopLeft.classList.contains('blocking') && !arrowTopRight.classList.contains('blocking')
			&& !arrowBottomLeft.classList.contains('blocking') && !arrowBottomRight.classList.contains('blocking')
			&& !arrowTopLeft.classList.contains('enemy') && !arrowTopRight.classList.contains('enemy')
			&& !arrowBottomLeft.classList.contains('enemy') && !arrowBottomRight.classList.contains('enemy')) {
				if (arrow.classList.contains('up')){
					arrowTopOffset = arrowTopOffset - 2;
				}
				else if (arrow.classList.contains('right')){
					arrowLeftOffset = arrowLeftOffset + 2;
				}
				else if (arrow.classList.contains('down')){
					arrowTopOffset = arrowTopOffset + 2;
				}
				else if (arrow.classList.contains('left')){
					arrowLeftOffset = arrowLeftOffset - 2;
				}
				arrow.style.left = arrowLeftOffset + 'px';
				arrow.style.top = arrowTopOffset + 'px';
			}
			if (arrowTopLeft.classList.contains('enemy') || arrowTopRight.classList.contains('enemy')
				|| arrowBottomLeft.classList.contains('enemy') || arrowBottomRight.classList.contains('enemy')) {
					if (arrowTopLeft.id.length != 0) {
						ToRemove = document.getElementById(arrowTopLeft.id);
					}
					if (arrowTopRight.id.length != 0) {
						ToRemove = document.getElementById(arrowTopRight.id);
					}
					if (arrowBottomLeft.id.length != 0) {
						ToRemove = document.getElementById(arrowBottomLeft.id);
					}
					if (arrowBottomRight.id.length != 0) {
						ToRemove = document.getElementById(arrowBottomRight.id);
					}
					body.removeChild(arrow);
					ToRemove.classList.add("dead");
					setTimeout(remove, 1000);
					DeathCount++;
					function remove() {
						body.removeChild(ToRemove);
						if (DeathCount == 9) {
							if (confirm("You win! Do you want to play again?")) {
								window.location.reload(true);
							}
							else {
								alert("I can't close the window myself because that's been disabled. So uh...you can close me I guess.")
							}
					
						}
				
					}				
				}
		}, 1);
	}
	
}

function gameStart() {
	player = document.getElementById('player');
	setInterval(move, 10);
	document.addEventListener('keydown', keyDown);
	document.addEventListener('keydown', fire);
	document.addEventListener('keyup', keyUp);
	for (x=0; x < document.getElementsByClassName('enemy').length; x++) {
		newID = document.getElementsByClassName('enemy')[x];
		newID.setAttribute("id",x);
	}
}

document.addEventListener('DOMContentLoaded', gameStart);