function loadjs() {
    maxsize = 100; //maximum size of array (and thus number generation)
    dupecount = 0;
    while (mainarray.length < maxsize){ 
        for (x = 0; x < maxsize; x++) {
            isFound = false;
            box = document.createElement('li');
            randnum = Math.ceil(Math.random() * maxsize);
            for (i = 0; i < mainarray.length; i++) {
                //while (randnum != mainarray[i]) 
                if (randnum == mainarray[i]) {
                    isFound = true;
                }
                while (isFound == true) {
                    randnum = Math.ceil(Math.random() * maxsize);
                    i = 0;
                    isFound = false;
                }
            }
            box.innerHTML = randnum;
            mainarray.push(randnum);
            document.getElementsByTagName('body')[0].appendChild(box);
        }
    }
}
mainarray = [];