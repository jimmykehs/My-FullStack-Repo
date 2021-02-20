function onMapClick(event){
    const appElement = $(this)
    const target = $(event.target)
    const userPressedShiftKey = event.shiftKey

    if(userPressedShiftKey && target.hasClass('pin')){
        target.remove()
    }
    else if(!target.hasClass('pin')){
        const pinX = event.offsetX
        const pinY = event.offsetY
        $(appElement).append($('<div class="pin"></div>').css({
                'left': pinX,
                'top': pinY,
            })
        )}
}

$('.app').click(onMapClick)