function loadjs() {
    playerelement = document.getElementById('player');
    sidemenu = document.getElementById('sidebar');
    hidemenu = document.getElementById('closeside');
    document.addEventListener('keydown', movekeydown);
    document.addEventListener('keyup', movekeyup);
    hidemenu.addEventListener('click', hide)
    setInterval(moveInterval, tps);


}
//code here
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
        playerelement.className = 'character stand left';
    }
    if (event.keyCode == 39) {
        rightpressed = false;
        playerelement.className = 'character stand right';
    }
    if (event.keyCode == 38) {
        uppressed = false;
        playerelement.className = 'character stand up';
    }
    if (event.keyCode == 40) {
        downpressed = false;
        playerelement.className = 'character stand down';
    }
}
function hide() {
    sidemenu.style.opacity = 0;
    //this doesn't quite work - the selections for the bodies and heads are still there
    //and clickable despite being hidden
}
function moveInterval() {
    if (leftpressed == true) {
        positionLeft = parseFloat(playerelement.offsetLeft);
        playerelement.style.left = positionLeft - 2 + 'px';
        playerelement.className = 'character walk left';
    }
    if (rightpressed == true) {
        positionLeft = parseFloat(playerelement.offsetLeft);
        playerelement.style.left = positionLeft + 2 + 'px';
        playerelement.className = 'character walk right';
    }
    if (uppressed == true) {
        playerelement.style.top = playerelement.offsetTop - 2 + 'px';
        playerelement.className = 'character walk up';
    }
    if (downpressed == true) {
        playerelement.style.top = playerelement.offsetTop + 2 + 'px';
        playerelement.className = 'character walk down';
    }
}


//end code
document.addEventListener('DOMContentLoaded', loadjs);