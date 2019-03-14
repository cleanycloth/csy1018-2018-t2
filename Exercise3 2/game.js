function loadjs() {
    playerelement = document.getElementById('player');
    sidemenu = document.getElementById('sidebar');
    hidemenu = document.getElementById('closeside');
    heads = document.getElementsByClassName('heads');
    head = heads[0].getElementsByTagName('li');
    bodies = document.getElementsByClassName('bodies');
    body = bodies[0].getElementsByTagName('li');
    document.addEventListener('keydown', movekeydown);
    document.addEventListener('keyup', movekeyup);
    hidemenu.addEventListener('click', hide);
    setInterval(moveInterval, tps);
    for (var i = 0; i < head.length; i++) {
        head[i].addEventListener('click', sethead);
    }
    for (var i = 0; i < body.length; i++) {
        body[i].addEventListener('click', setbody);
    }
}
//Keycode list:
//37 = Left
//39 = Right
//38 = Up
//40 = Down
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
        newleft = positionLeft - 2;
        treeelement = document.elementFromPoint(newleft, player.offsetTop);
        if (treeelement.classList.contains('tree') == false) {
            playerelement.style.left = newleft + 'px';
            playerelement.className = 'character walk left';
        }
        
    }
    if (rightpressed == true) {
        positionLeft = parseFloat(playerelement.offsetLeft);
        newright = positionLeft + 2;
        treeelement = document.elementFromPoint(newright+32, player.offsetTop);
        if (treeelement.classList.contains('tree') == false) {
            playerelement.style.left = newright + 'px';
            playerelement.className = 'character walk right';
        }
    }
    if (uppressed == true) {
        playerelement.style.top = playerelement.offsetTop - 2 + 'px';
        playerelement.className = 'character walk up';
    }
    if (downpressed == true) {
        playerelement.style.top = playerelement.offsetTop + 2 + 'px';
        playerelement.className = 'character walk down';
    }
    /*
    if (leftpressed || rightpressed || uppressed || downpressed) {
        playerelement.classList.remove('stand');
        playerelement.classList.add('walk');
    }
    else {
        playerelement.classList.remove('walk');
        playerelement.classList.add('stand');
    }*/
}
function sethead() {
    document.getElementsByClassName('head')[0].style.backgroundImage = 'url(images/' + this.id + '.png)';
}
function setbody() {
    document.getElementsByClassName('body')[0].style.backgroundImage = 'url(images/' + this.id + '.png)';
}


//end code
document.addEventListener('DOMContentLoaded', loadjs);