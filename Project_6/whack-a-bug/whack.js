let bugNumber = 0
let bugDelete = 0
let score = 0
let timer = 60
let gameSpeed = {
    spawnTime: 0,
    despawnTime: 0,
}

let bugFunction
let timerFunction
let difficultyTimer


//Increments score global variable and updates score on screen
function updateScore(){
    $('.score').text(`Score: ${score}`)
}

/* Uses global timer variable and decrements it, timer element is updated with timer variable value. If timer hits zero
 this function and the createbug function stop executing.
*/
function updateTimer(){
    timer--
    $('.timer').text(`Time: ${timer}`)
    if(timer <= 0){
        endGame()
    }
}

function createEntity(){
    let entityDecider = Math.floor(Math.random() * 3)
    console.log(entityDecider)
    if (entityDecider === 1){
        return `<div class='civilian ${bugNumber}'></div>`
    }
    else{
        return `<div class='bug ${bugNumber}'></div>`
    }
}

/* 
Uses a for loop to:
Assign a random number to holeNumber(1 through 6), and use that random number to select a child of #app, which is a div with a class 'hole'
If the div is empty, then it will be given a child div classed as bug and a number based of the bugNumber global variable. (1st bug is 1, second is 2, etc...)
After a successful bug, bugNumber increments by one that way each bug created is unique and can be deleted later
If the hole already has a bug, holeNumber will be randomize again with a new range, narrowing down possible empty holes
The process above loops until an empty hole is found.
Created bug is then set for deletion, time depends on game difficulty setting
Click listener is put on divs with class bug to remove it and update score
*/
function createbug(){
    
    for(i=1; i < 7; i++){
        let holeNumber = Math.floor(Math.random() * (6-i) + i)
        let targetHole = $(`#app .hole:nth-child(${holeNumber}`)
        if (targetHole.children().length === 0 && targetHole.children().children().length === 0){
            targetHole.append(createEntity)
            bugNumber++
            break
        }
        else{
            holeNumber = Math.round(Math.random()*6)
        }
    }
    
    setTimeout( deletebug, gameSpeed.despawnTime)
        
    $('#app').on('click', '.bug', function(event){
        event.stopImmediatePropagation()
        $(this).remove()
        score++
        updateScore()
    })

    $('#app').on('click', '.civilian', function(event){
        event.stopImmediatePropagation()
        $(this).remove()
        score--
        updateScore()
    })
}

//Uses bugDelete to delete the earliest existing bug, then increments bugDelete by one
function deletebug(){
    $(`.${bugDelete}`).remove() 
    bugDelete++
}

/*
Sets intervals so createbug() and UpdateTimer() are run constantly until timer hits zero (intervals are cleared in updateTimer() )
Unchecked all inputs and hides the game setting panel
*/
function startGame(){
    let difficulty = $('input[name=difficulty]:checked').val()
    $('input[name="difficulty"]').prop('checked', false)
    $('.game-settings-container').css('display', 'none')
    if(difficulty !== 'Good Luck'){
    bugFunction = setInterval(createbug, gameSpeed.spawnTime)
    }
    createbug()
    timerFunction = setInterval(updateTimer,1000)
}

//Grabs the val of the game settings form and sets spawn time and despawn time depending on users choice
function determineGameSpeed(){
    let difficulty = $('input[name=difficulty]:checked').val()
    switch(difficulty){
        case 'Easy':
            gameSpeed.spawnTime = 2000
            gameSpeed.despawnTime = 3000
            break
        case 'Medium':
            gameSpeed.spawnTime = 1000
            gameSpeed.despawnTime = 1250
            break
        case 'Hard':
            gameSpeed.spawnTime = 500
            gameSpeed.despawnTime = 900
            break
        case 'Good Luck':
            gameSpeed.spawnTime = 2000
            gameSpeed.despawnTime = 3000
            difficultyTimer = setInterval(updateGameSpeed, 5000)
    }
}
function updateGameSpeed(){
    clearInterval(bugFunction)
    gameSpeed.spawnTime -= 165
    gameSpeed.despawnTime -= 200
    bugFunction = setInterval(createbug, gameSpeed.spawnTime)
}
function endGame(){
    clearInterval(timerFunction)
    clearInterval(bugFunction)
    clearInterval(difficultyTimer)

    $('.endgame-panel-container').css('display', 'flex')
    $('.finished-score').text(`Congrats! You finished with a score of ${score}`)
    // $('.bugs-hit').text(`You hit ${score}/${bugDelete} bugs!`)

    $('.play-again').click(()=> {
        score = 0
        timer = 60
        updateScore()
        updateTimer()
        $('.start-game').css('display', 'none')
        $('.endgame-panel-container').css('display', 'none')
        $('.game-settings-container').css('display', 'flex')
    })
}

$('input[name="difficulty"]').click(() => {
    $('.start-game').css('display', 'initial')
})

$('.settings').submit(function(event){
    event.preventDefault()
    determineGameSpeed()
    startGame()
})
