const cssOptions = {
    width: '360px',
    height: '360px',
    border: '1px solid black'
}

$('#backgroundColor input').on('input', function () {
    let background = $(this).val()
    $('#preview').css('background', background)
});

$('#height input').on('input', function () {
    let height = $(this).val()
    $('#preview').css('height', height)
});

$('#borderRadius input').on('input', function () {
    let radius = $(this).val() + '%'
    $('#preview').css('border-radius', radius)
});

$('#fontFamily input').on('input', function () {
    let fontFam = $(this).val()
    $('#preview').css('font-family', fontFam)
});

$('#lift input').on('input', function () {
    let shadow = $(this).val()
    if(shadow === 0){
        $('#preview').css('box-shadow', 'none')
    }
    else {
        $('#preview').css('box-shadow', `0 ${ Math.floor(shadow / 2) }px ${ shadow }px black`)
    }
});

function updatePreview() {
    $('#preview').css(cssOptions)
}

updatePreview();