var player;
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var spacePressed = false;
var shiftPressed = false;
var deathCount = 0;
var invulnerable = true;

function setPlayerDirection(dir) {
	//Display the walk animation for the correct direction, remove the other directions
	//to ensure the player does not have both "left" and "right" applied at the same time
	player.classList.remove('up');
	player.classList.remove('left');
	player.classList.remove('right');
	player.classList.remove('down');

	player.classList.add(dir);
}

//Monitors keypresses. If the keyUp event occurs (a key is let go), it sets the respective key set status to false.
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
	//With all buttons, if shift is pressed, movement speed is doubled.
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

//Monitors keypresses. If the keyDown event occurs (a key is pressed), it sets the respective key set status to true.
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
//Stops the player from being able to spam the fire key. The function is given a 500ms timeout.
function reload() {
	//Readds the event listener disabled in fire(), and removes the animation from the player.
	document.addEventListener('keydown', fire);
	player.classList.remove('fire');
}
function fire(event) {
	//If the space bar is pressed, continue.
	if (spacePressed) {
		//Add the fire class to the player, making the player animate.
		player.classList.add('fire');
		//Set offsets of player.
		playerLeftOffset = player.offsetLeft;
		playerTopOffset = player.offsetTop;
		//Create the arrow div.
		var arrow = document.createElement('div');
		//Set the position of the arrow to be 20px in front of the player from the top, 15px in front from the left.
		arrow.style.top = playerTopOffset + 20 + 'px';
		arrow.style.left = playerLeftOffset + 15 + 'px';
		//Disallow the player to spam the fire button. Add a 500ms timeout.
		document.removeEventListener('keydown', fire);
		setTimeout(reload, 500);
		//Depending on the player direction, make the arrow point in the correct direction.
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
		//Choose the body element.
		var body = document.getElementsByTagName('body')[0];
		//Put the arrow on screen, under the body tag.
		body.appendChild(arrow);
		//Run this code every 1ms.
		setInterval(function(){
			//Find the offset of the arrow.
			arrowTopOffset = arrow.offsetTop;
			arrowLeftOffset = arrow.offsetLeft;
			//Set the four corners of the arrow for use later in collision checking.
			arrowTopLeft = document.elementFromPoint(arrowLeftOffset, arrowTopOffset);
			arrowTopRight = document.elementFromPoint(arrowLeftOffset+10, arrowTopOffset);
			arrowBottomLeft = document.elementFromPoint(arrowLeftOffset, arrowTopOffset+10);
			arrowBottomRight = document.elementFromPoint(arrowLeftOffset+10, arrowTopOffset+10);
			//If the arrow reaches the top or left side of the screen, or the bottom, delete the arrow.
			if (arrow.style.left == '10px' || arrow.style.left == '11px' || arrow.style.top == '10px' || arrow.style.top == '11px' || arrow.style.top == window.innerHeight - 15 + 'px' || arrow.style.top == window.innerHeight - 16 + 'px') {
				body.removeChild(arrow);
			}
			//Run the collision check function. If it returns false (i.e. the arrow is not touching a tree or enemy), continue.
			if (collisioncheck() == false) {
				//Depending on the arrow direction, move the arrow in the correct direction. Top/left is based at 0,0 so 
				//-2 on arrowOffsetTop moves the arrow up 2px, 2 moves down 2px. -2 on arrowOffsetLeft moves the arrow left, 2 moves right.
				if (arrow.classList.contains('up')){
					arrowTopOffset -= 2;
				}
				else if (arrow.classList.contains('right')){
					arrowLeftOffset += 2;
				}
				else if (arrow.classList.contains('down')){
					arrowTopOffset += 2;
				}
				else if (arrow.classList.contains('left')){
					arrowLeftOffset -= 2;
				}
				arrow.style.left = arrowLeftOffset + 'px';
				arrow.style.top = arrowTopOffset + 'px';
			}
			//Run the collision check function. If it returns enemyonly (i.e. if the arrow is detected to only be touching an enemy), continue.
			if (collisioncheck() == "enemyonly") {
				//Depending on the arrow direction, one of the corners will detect the enemy but the others won't. So, detect all four and
				//if the corners do not detect an ID, the length is 0. If it detects an ID, it will have a length of 1 and will set the ID it detects
				//as the ID to be changed.
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
				//Remove the arrow from the screen.
				body.removeChild(arrow);
				//Check if players are invulnerable from the 4 second delay at the start. Also check if
				//the enemy it rolls over isn't already dead to avoid adding an extra count to the death counter.
				if (invulnerable == false && !ToRemove.classList.contains("dead")) {
					//Give the ID set above the "dead" class, which adds a dead animation.
					ToRemove.classList.add("dead");
					//After 1 second, run the remove function.
					setTimeout(remove, 1000);
					//Add 1 to the death count.
					console.log(deathCount);
					deathCount++;
					function remove() {
						//Remove the enemy off the screen using the ID set earlier.
						body.removeChild(ToRemove);
						//If the death count is 9, i.e. all of the enemies are killed, continue.
						if (deathCount == 9) {
							//If the user presses "OK" on the popup, the page will refresh. If not, it will display another message.
							//Most, if not all web browsers now do not allow you to use close(); to close a window as this is considered a security risk.
							//So, the user is prompted to close the window themselves.
							if (confirm("You win! Do you want to play again?")) {
								window.location.reload(true);
							}
							else {
								alert("I can't close the window myself because that's been disabled. So uh...you can close me I guess.");
							}
					
						}
				
					}
				}				
			}
		}, 1);
	}
	
}

function collisioncheck() {
	//If any of the four corners of the arrow are NOT touching the trees ("blocking"), or if any of the four corners are NOT touching an enemy,
	//return false.
	if (!arrowTopLeft.classList.contains('blocking') && !arrowTopRight.classList.contains('blocking')
	&& !arrowBottomLeft.classList.contains('blocking') && !arrowBottomRight.classList.contains('blocking')
	&& !arrowTopLeft.classList.contains('enemy') && !arrowTopRight.classList.contains('enemy')
	&& !arrowBottomLeft.classList.contains('enemy') && !arrowBottomRight.classList.contains('enemy')) {
		return false;
	}
	//If any of the four corners of the arrow ARE touching an enemy, return "enemyonly".
	else if (arrowTopLeft.classList.contains('enemy') || arrowTopRight.classList.contains('enemy')
	|| arrowBottomLeft.classList.contains('enemy') || arrowBottomRight.classList.contains('enemy')) {
		return "enemyonly";
	}
	//Otherwise (if the arrow IS touching the trees), return true (i.e. "yes, the arrow is NOT touching anything")
	else {
		return true;
	}
}
//Run this function at game start.
function gameStart() {
	//Define what the player is by grabbing the player on screen via its ID.
	player = document.getElementById('player');
	//Run the move function every 10ms.
	setInterval(move, 10);
	//Add event listeners so that when a key is pressed down, keyDown and Fire will run. When the key is lifted, run keyUp.
	document.addEventListener('keydown', keyDown);
	document.addEventListener('keydown', fire);
	document.addEventListener('keyup', keyUp);
	//For the first 4 seconds, players cannot kill the enemies when they are hidden.
	setTimeout(vulnerability, 4000);
	function vulnerability() {
		//Set the enemies to be killable after 4 seconds.
		invulnerable = false;
	}
	//Give each enemy on screen an ID, from 0-8.
	for (x=0; x < document.getElementsByClassName('enemy').length; x++) {
		newID = document.getElementsByClassName('enemy')[x];
		newID.setAttribute("id",x);
	}
}
//Run the GameStart function at page load.
document.addEventListener('DOMContentLoaded', gameStart);