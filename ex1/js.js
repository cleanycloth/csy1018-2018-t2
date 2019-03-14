function loadjs(){
    dice = document.getElementsByTagName('div');
    for (i = 0; i < dice.length; i++) {
        dice[i].addEventListener('click', changeicon);
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function changeicon() {
    for (x = 0; x < 50; x++) {
        randnum = Math.ceil(Math.random() * 6);
        this.className = 'side' + randnum;
        this.nextSibling.nextSibling.firstChild.nodeValue = 'You rolled a ' + numberarray[randnum-1];
        await sleep(50);
    }
}
numberarray = [];
numberarray[0] = "One";
numberarray[1] = "Two";
numberarray[2] = "Three";
numberarray[3] = "Four";
numberarray[4] = "Five";
numberarray[5] = "Six";





document.addEventListener('DOMContentLoaded', loadjs);

//async function from here:
//https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep