function loadjs() {
    element = document.getElementById('circle');
    element.addEventListener('click', test)
    element.style.opacity = '1.0';
    document.addEventListener('keydown', movekeydown);
    document.addEventListener('keyup', movekeyup);
    setInterval(moveInterval, tps);


}
//click stuff
function test() {
    console.log("You've clicked me!")
    element.style.backgroundColor = 'blue';
    setInterval(interval, 40);
}
function interval() {
    circleOpacity = parseFloat(element.style.opacity)
    positionLeft = element.offsetLeft;
    if (circleOpacity > 0) {
        element.style.opacity = circleOpacity - 0.1;
        element.style.left = positionLeft - 10 + 'px';
    }
}
//end of click stuff


timer = 0;
leftpressed = false;
rightpressed = false;
uppressed = false;
downpressed = false;
tps = 16; //Divide 1000 by tps to get target frame rate (62.5fps)

    function movekeydown(event) {
        if (event.keyCode == 37) {
            leftpressed = true;
        }
        if (event.keyCode == 39) {
            rightpressed = true;
        }
        if (event.keyCode == 38) {
            uppressed = true;
        }
        if (event.keyCode == 40) {
            downpressed = true;
        }
    }
    function movekeyup(event) {
        if (event.keyCode == 37) {
            leftpressed = false;
        }
        if (event.keyCode == 39) {
            rightpressed = false;
        }
        if (event.keyCode == 38) {
            uppressed = false;
        }
        if (event.keyCode == 40) {
            downpressed = false;
        }
    }

    function moveInterval() {
        if (leftpressed == true) {
            positionLeft = parseFloat(element.offsetLeft);
            element.style.left = positionLeft - 10 + 'px';
        }
        if (rightpressed == true) {
            positionLeft = parseFloat(element.offsetLeft);
            element.style.left = positionLeft + 10 + 'px';
        }
        if (uppressed == true) {
            element.style.top = element.offsetTop - 10 + 'px';
        }
        if (downpressed == true) {
            element.style.top = element.offsetTop + 10 + 'px';
        }
    }

    //Loads JS content after browser has loaded HTML/CSS content
    document.addEventListener('DOMContentLoaded', loadjs);
    