x=0
function print5() {
    while (x <=5) {
            document.getElementById('numbers').innerHTML += x;
            x++;
    }
}
document.addEventListener('DOMContentLoaded', print5);

function clickh1() {
    document.getElementById('heading').firstChild.nodeValue = 'New Heading'
}
function clickp() {
    document.getElementById('content').firstChild.nodeValue = 'New content'
}

function loadclickh1() {
    document.getElementById('heading').addEventListener('click', clickh1)

}
function loadclickp() {
    document.getElementById('content').addEventListener('click', clickp)

}
document.addEventListener('DOMContentLoaded', loadclickh1);
document.addEventListener('DOMContentLoaded', loadclickp);

function showtext() {
    document.getElementById('largebutton').addEventListener('click', test)
}

function test() {
    var element = document.getElementById('textfield').value
    if (element.length == 0) {
        alert('There is nothing for me to say!')
    }
    else {
        alert(element)
    }
    
}

document.addEventListener('DOMContentLoaded', showtext);