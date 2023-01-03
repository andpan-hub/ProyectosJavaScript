const btn = document.getElementById('btn');
const picture = document.getElementById('picture');
const letters = document.getElementById('letters');
const errors = document.getElementById('errors');

let word;
let mistakes = 6;

document.addEventListener('DOMContentLoaded', onLoad);
document.addEventListener('keyup', onKeyUp);

function onLoad(){
    onReset();
    btn.addEventListener('click', onReset);   
}

function onReset(){
    mistakes = 6;
    errors.innerHTML = '';
    picture.querySelectorAll('[id]').forEach(x => x.style.display = "none");
    word = pickTheWord();
    printTheWord(word);
}

function pickTheWord(){
    let words = ['home', 'legend', 'librery', 'tea','flower'];
    let ndx = generateNumber(-1, words.length-1);
    return words[ndx];
}
// enseña la primera y la ultima letra de la palabra y esconde las demas

function printTheWord(word){
    let letter;
    letters.innerHTML = '';
    word.split('').forEach((l, i) => {
        letter = document.createElement('span');
        if(i == 0 || i == word.length-1)
        letter.textContent = l;
        else
            letter.k = l;
            letters.appendChild(letter);
    });
}

// genera el random number

function generateNumber(minValue, maxValue){
    return Math.ceil(minValue + Math.random()*(maxValue-minValue));
}

function onKeyUp(e){
    if(e.keyCode < 65 || e.keyCode > 90) return;
    let guess = e.key;
    let empty = getEmptySlots();
    let guessed = 0;
    empty.forEach(l =>{
        if(l.k == guess){
            l.textContent = guess;
            delete l.k;
            guessed++;
        }
    });
    if(guessed == 0){
        errors.textContent = `${errors.textContent} ${guess} | `;
        printMan(mistakes);
       mistakes--;
    }
    if(getEmptySlots().length == 0){
        alert('you won');
    }else if(mistakes == 0){
        alert('you lose');
    }
}

function getEmptySlots(){
    return Array.from(letters.querySelectorAll('span')).filter(l => l.textContent == "");
}

function printMan(id){
    // let id = `id${errors}`;
   // picture.getElementById(id).style.display = "inherit";
   picture.getElementById(`id${6- id +1}`).style.display="inherit"; 
}


