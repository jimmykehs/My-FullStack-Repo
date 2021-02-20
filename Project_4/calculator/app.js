heldValue = null
heldOperation = null
nextValue = null

function showValue(location, value){
    if(value===null){
        $(location).text('')
    }
    else{
        $(location).text(Number(value) )
    }
}

function updateDisplay(){
    showValue('.held-value', heldValue)
    showValue('.next-value', nextValue)
}

function clearAll(){
    heldValue = null
    nextValue = null
    heldOperation = null
    $('.next-operation').text('')
}

function clearEntry(){
    nextValue = null
}

function setHeldOperation(operation){
    if(heldOperation !== null){
        heldValue = heldOperation(Number(heldValue),Number(nextValue))
    }
    else if(nextValue !== null && heldOperation === null){
        heldValue = nextValue
    }
    
    nextValue = null
    heldOperation = operation
}

// Math functions

function add(x,y){
    let result = x + y
    return result
}

function subtract(x,y){
    let result = x - y
    return result
}

function multiply(x,y){
    let result = x * y
    return result
}

function divide(x,y){
    let result = x / y
    return result
}

//Digits click function

$('.digits button').click(function(){

    if(nextValue === null){
        nextValue = 0
    }

    nextValue += $(this).text()
    console.log(nextValue)
    updateDisplay()
})

// Memory click functions

$('.clear-all').click( function() {
    clearAll()
    updateDisplay()

    
})

$('.clear-entry').click( function ()  {
    clearEntry()
    updateDisplay()
})

// Operation click functions

$('.add').click(function(){
    setHeldOperation(add)
    $('.next-operation').text('+')
    updateDisplay()

})

$('.subtract').click(function(){
    setHeldOperation(subtract)
    $('.next-operation').text('-')
    updateDisplay()
})

$('.multiply').click(function(){
    setHeldOperation(multiply)
    $('.next-operation').text('x')
    updateDisplay()

})

$('.divide').click(function(){
    setHeldOperation(divide)
    $('.next-operation').text('/')
    updateDisplay()

})

$('.equals').click(function(){
    setHeldOperation(null)
    $('.next-operation').text('')
    updateDisplay()
})