let red
let green
let blue

function updateValues(){
    red = $('#red').val()
    green = $('#green').val()
    blue = $('#blue').val()
}

function updatePage() {
    $('.red-value').text(red)
    $('.green-value').text(green)
    $('.blue-value').text(blue)

    let background = `rgb(${red}, ${green}, ${blue})`
    $('.preview').css('background', background)
}

function updateAll() {
    updateValues()
    updatePage()
}

$(document).ready(updateAll)

$('.controls input').on('input', updateAll)