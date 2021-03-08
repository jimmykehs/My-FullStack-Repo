let players = [{
    name: 'Player 1',
    symbol: 'X'
},
{
    name: 'Player 2',
    symbol: 'O'
}

]
let board = ['','','','','','','','','',]
let currentPlayer
let winner
let roundWon = false;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//These functions occur at game start
function setPlayers(){
    players[0].name = $('.player-one-name').val()
    players[1].name = $('.player-two-name').val()
}
function decideFirstPlayer(){
    let randomNumber = Math.floor(Math.random()*2)
    currentPlayer = players[randomNumber]
}


//These functions occur once per turn
function fillCell(cell){
    let cellId = cell.attr('data-cell-index')
    board[cellId] = currentPlayer.symbol
    cell.text(currentPlayer.symbol)

}
function switchTurn(){
    if(currentPlayer === players[0]){
        currentPlayer = players[1]
    }
    else{
        currentPlayer = players[0]
    }
}
function determineWinner(){
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if(roundWon){
        winner = currentPlayer.name
        endGame()
    }
}
function determineTie(){
    if(!(board.includes('')) && !roundWon){
        $('.endgame-panel-container').css('display', 'flex')
        $('.winning-player').text(`There has been a tie!`)
    }
}
function determineCurrentPlayer(){
    $('.game--status').text(`It is ${currentPlayer.name}'s (${currentPlayer.symbol}) Turn!`)
}

//State functions
function startGame(){
    $('.form-container').css('display', 'none')
    setPlayers()
    decideFirstPlayer()
    determineCurrentPlayer()
}
function fullTurn(cell){
    if(cell.text()===''){
    fillCell(cell)
    determineWinner()
    determineTie()
    switchTurn()
    determineCurrentPlayer()
    }
}
function endGame(){
    $('.endgame-panel-container').css('display', 'flex')
    $('.winning-player').text(`${winner} has won the game!`)
}
function restartGame(){
    roundWon = false;
    $('.cell').text('')
    board = ['','','','','','','','','',]
    $('.endgame-panel-container').css('display', 'none')
    $('.form-container').css('display','flex')
}

//Click listeners
$('.cell').click(function(){
    let clickedCell = $(this)
    fullTurn(clickedCell)
})

$('.start-game-button').click(function(event){
    event.preventDefault()
    startGame()
})

$('.endgame-panel').on('click', '.game--restart', restartGame)
