function loadjs() {
    box = document.createElement('div');
    randnum = Math.ceil(Math.random() * 100);
    randnum2 = Math.ceil(Math.random() * 100);
    box.style.width = randnum + 'px';
    box.style.height = randnum2 + 'px';
    randnum3 = Math.ceil(Math.random() * 7) - 1;
    box.style.backgroundColor = numberarray[randnum3];
    document.getElementsByTagName('body')[0].appendChild(box);
}


numberarray = ["red","orange","yellow","green","blue","indigo","violet"];