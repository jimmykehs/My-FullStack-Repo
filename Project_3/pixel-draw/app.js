let PALLETE = [];

function makePallete(){
PALLETE = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'orange',
]

for(let i = 0; i < PALLETE.length; i++){
    const nextColor = PALLETE[i];
    $('.palette').append( 
        $('<button></button>').css('background-color', nextColor)
    )
}

$('.palette button').first().addClass('active');
}

function makeGrid(){
    for(let i = 0; i < 64; i++){
        $('.grid').append($('<div class="cell"></div>'))
    }
}

function onPaletteClick(){
    $('.active').removeClass('active');

    let clickedButton = $(this)
    clickedButton.addClass('active');
    console.log('test')
}

function onGridClick(){
    let clickedCell = $(this)
    let activeColor =  $(".palette .active").css('background-color')

    if (clickedCell.css('background-color') === activeColor) {
        clickedCell.css('background-color', "")
    }
    else {
        clickedCell.css('background-color', activeColor)
    }
    

    }

function onClearClick(){
    $('.grid .cell').css('background', "")
}

function onFillAllClick(){
    let activeColor =  $(".palette .active").css('background-color')
    $(".grid .cell").css("background", activeColor)
}

function onFillEmptyClick(){
    const elements = $('.grid .cell')
    let activeColor =  $(".palette .active").css('background-color')
    for (let i = 0; i < elements.length; i++){
        let nextElement = $(elements[i])
        if (nextElement.css('background-color') === 'rgba(0, 0, 0, 0)'){
            nextElement.css('background-color', activeColor)
        }

    }

}

function addColor(){
    let newColor = $('.palette-creator input').val()
    $('.palette-creator input').val("")
    let newButton = $('<button></button>').css('background-color', newColor)

    $('.palette').append(newButton)

    function removeClass() {
        $('.palette-creator button').removeClass('invalid')
        $('.palette-creator button').text('Create color!')
    }

    if(newButton.css('background-color') === "rgb(239, 239, 239)" || newButton.css('background-color') === ""){
        newButton.remove();
        $('.palette-creator button').addClass('invalid')
        $('.palette-creator button').text("INVALID COLOR")
        setTimeout(removeClass, 1000)

    }




}

makeGrid();
makePallete();

$('.grid .cell').click(onGridClick)
$('.controls .clear').click(onClearClick)
$('.controls .fill-all').click(onFillAllClick)
$('.controls .fill-empty').click(onFillEmptyClick)
$('.palette-creator button').click(addColor)
$(document).on('click', '.palette button', onPaletteClick)