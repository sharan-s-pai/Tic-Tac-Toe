let status = document.querySelector('.game-status');

let gameActive = false;

let currentPlayer;

let name1 = "Player-1";

let name2 = "Player-2";

let gameState = [];

window.addEventListener("DOMContentLoaded",(e)=>{
    document.querySelector(".restart-btn").disabled = true;
})
let winningMsg = ()=>{
    if(currentPlayer ==='X'){
        return `${name1} has won`;
    }else{
        return `${name2} has won`;
    }
}

let drawMsg = ()=>`Game has ended with a draw`;

let playTurn = ()=>{
    if(currentPlayer ==='X'){
        return `${name1}'s turn`;
    }else{
        return `${name2}'s turn`;
    }
}
let statusUpdate = (msg,color)=>{
    status.innerHTML = `<h2 class="text-center alert alert-${color}" style="font-family: 'Courier New', Courier, monospace;">${msg}</h2>`
}

let gameController = (index,cellEvent)=>{
    gameState[index] = currentPlayer;
    cellEvent.innerHTML = currentPlayer;
}

let winValidation = ()=>{
    let roundwon = false;
    let winState = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    winState.forEach((win)=>{
        let a = gameState[win[0]];
        let b = gameState[win[1]];
        let c = gameState[win[2]];

        if(a===''||b===''||c===''){
        }else if(a===b&&b===c){
            roundwon = true;
            return;
        }
    });
    if(roundwon){
        statusUpdate(winningMsg(),"success");
        gameActive = false;
        return;
    }

    let roundDraw = gameState.includes("");
    if(roundDraw===false){
        statusUpdate("Game has been drawn","secondary");
        gameActive = false;
        return;
    }
}

document.querySelectorAll('.cell').forEach(cell=>
    cell.addEventListener('click',(event)=>{
        let cellevent = event.target;

        let index = parseInt(cell.getAttribute('data-select'));
        //console.log(index)
        if(gameState[index]!==""||gameActive!=true){
            return;
        }
        gameController(index,cellevent);
        winValidation();
        if(gameActive){
            if(currentPlayer==='X'){
                currentPlayer = 'O';
            }else{
                currentPlayer = 'X';
            }
            statusUpdate(playTurn(),"secondary");
        }
    })
);

document.querySelector('.restart-btn').addEventListener('click',(e)=>{
    e.preventDefault()
    gameActive = true;
    currentPlayer = "X";
    gameState = ["","","","","","","","",""];
    document.querySelectorAll('.cell').forEach((cell)=>cell.innerHTML = "");
    statusUpdate(playTurn(),"secondary");
});

// document.querySelector('.start-btn').addEventListener("click",(e)=>{
//     e.preventDefault();
// });

document.querySelector('#changes-btn').addEventListener('click',(e)=>{
    e.preventDefault();
    gameActive = true;
    name1 = document.querySelector('#player-1-name').value;
    name2 = document.querySelector('#player-2-name').value;
    currentPlayer = "X";
    if(name1===""){
        name1 = "Player-1";
    }
    if(name2===""){
        name2 = "Player-2";
    }
    gameState = ["","","","","","","","",""];
    document.querySelector('.start-btn').disabled = true;
    document.querySelector('.restart-btn').disabled = false;
    statusUpdate(playTurn(),"secondary");
});

