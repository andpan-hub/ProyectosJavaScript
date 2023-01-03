const game = document.getElementById('game');
const btnReset = document.getElementById('reset');

let player = "X";
let move = 0;
let table = [[null, null, null],
             [null, null, null], 
             [null, null, null]];

generateTable();

reset.addEventListener('click', resetGame);

game.addEventListener('click', (e) => {
const tg = e.target;
let l = parseInt(tg.getAttribute('l'));
let c = parseInt(tg.getAttribute('c'));
if(table[l][c])
return;
table[l][c] = player;
tg.innerHTML = player;
move++;
if(gameOver(l, c, player)){
    alert(`Hei ${player} , you won!`);
    reset.disabled = false;
}else if(move == 9){
    alert(`Still playing!`);
    reset.disabled = false;
}else{
    nextplayer();
}
});

function gameOver(l, c, player){
    let cnt = 0;
    for(let i = 0; i < 3; i++){  //verifica la linea 
    if(table[l][i] == player)
    cnt++;
    }
    if(cnt == 3) return true;
    cnt = 0;
    for(let i = 0; i < 3; i++){   // verifica la columna
        if(table[i][c] == player)
            cnt++;
    }
    if(cnt == 3) return true;
    cnt = 0;
    if(l == c){   // verifica la primera diagonal
    for(let i = 0; i < 3; i++){
        if(table[i][i] == player)
        cnt++;
    }
    }else if(l + c == 2){   // verifica la segunda diagonal
    for(let i = 0; i<3; i++){
        if(table[i][3-i-l] == player)
        cnt++;
    }
    }
    if(cnt == 3) return true;
    return false;
    }
    
function nextplayer(){
if(player == "X"){
    player = "O"
}else{
player = "X";
}
document.getElementById('player').textContent = player;
};

function resetGame(){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            table[i][j] = null;
        }
    }
    Array.from(document.querySelectorAll('div[l]')).forEach(e =>{
        e.textContent = null;
    });
    document.getElementById('player').textContent = player;
    move = 0;
};


function generateTable(){
    let l, c;
    for(let i = 0; i < 9; i++){
        let e = document.createElement('div');
        l = Math.round((i+2)/3)-1;
        c = Math.round(i%3);
        e.setAttribute('l', l);
        e.setAttribute('c', c);
        game.appendChild(e);
    }
}