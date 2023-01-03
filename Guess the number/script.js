const min = document.getElementById('min');
const max = document.getElementById('max');
const val = document.getElementById('txtNumber');
const btn = document.getElementById('guessBtn');
const msg = document.getElementById('msg');

let gameOver = false;
let tries = 3;

let minValue, maxValue, generateValue;
minValue = 1;
maxValue = 9;
generateValue = generateNumber(minValue, maxValue);

min.textContent = minValue;
max.textContent = maxValue;

btn.addEventListener('click', () => {
    if(gameOver){
        resetGame();
        return;
    }
    if (val.value == '' || isNaN(val.value)) {
        alert('Pick a number');
        return;
    }
    let userVal = parseInt(val.value);
    if (userVal != generateValue) {
        tries--;
        if (tries == 0) {
            onGameOver();
            msg.textContent = 'Game over!';
        } else {
            val.value = '';
            msg.textContent = 'Try again!';
        }
    } else {
        onGameOver();
        msg.textContent = 'Yow won!';
    }
});

function onGameOver() {
    gameOver = true;
    val.disabled = true;
    btn.textContent = 'Play again!';
}
function resetGame(){
    gameOver = false;
    tries = 3;
    msg.textContent = '';
    btn.textContent = 'Guess!'
    val.disabled = false;
    val.value = '';
    generateValue = generateNumber(minValue, maxValue);
}

function generateNumber(minValue, maxValue) {
return Math.ceil(minValue + Math.random()*(maxValue - minValue));
}

// console.log(generateNumber(1, 10));


