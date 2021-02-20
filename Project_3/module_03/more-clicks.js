$('.task-input button').click(function(){
    let inputValue = $(".task-input input").val();
    if(inputValue.length > 0){
        $('.task-list').append($('<li>' + inputValue + '</li>'))
        $('.task-input input').val("")
    }
})


$('.decider button').click(function(){

    let robotStatus = $('.status')
    let robotImage = $('.decider img')
    $('.status').toggleClass('active')

    if(robotStatus.hasClass('active')){
        robotStatus.text("on")
        robotImage.attr('src', 'https://media.giphy.com/media/szmSyB2PnehgY/giphy.gif')
    }
    else {
        robotStatus.text('off')
        robotImage.attr('src', 'https://si.wsj.net/public/resources/images/BN-WB523_1109RO_12S_20171109172506.jpg')
    }
})


$('.cool-kids button').click(function(){
    let clickedSquare = $(this)
    let mainArea = $('.cool-kids main')
    let backgroundColor = clickedSquare.css('background')

    $(mainArea).css('background', backgroundColor )
})