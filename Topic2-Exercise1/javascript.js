function loadjs() {
    element = document.getElementById('circle');
    element.addEventListener('click', test)
    element.style.opacity = '1.0';

}
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
function keyfinder(event) {
    timer = 0;
    clearInterval(timer);
    console.log(event.keyCode);
    if (event.keyCode == 37)  {
        function moveleft() {
            element.style.left = element.offsetLeft - 10 + 'px';
                }
        timer = setInterval(moveleft, 50);
    }
    if (event.keyCode == 39 )  {
        function moveright(){
            element.style.left = element.offsetLeft + 10 + 'px';
        }
        timer = setInterval(moveright, 50);
        
    }
    if (event.keyCode == 38)  {
        element.style.top = element.offsetTop - 10 + 'px';
    }
    if (event.keyCode == 40)  {
        element.style.top = element.offsetTop + 10 + 'px';
    }
}
    //Loads JS content after browser has loaded HTML/CSS content
    document.addEventListener('keydown', keyfinder);
    document.addEventListener('DOMContentLoaded', loadjs);
    