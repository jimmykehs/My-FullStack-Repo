$('.one button').click(function (){
    $('.one span').text('Good Job!')
})

$('.two button').click(function (){
    $('.two button').slideUp();
})

$('.three button').click(function(){
    $('.three').append('<div>Here is some text</div>')
})

$('.four button').click(function(){
    $('.template-target').html('<h3>Hello, World</h3><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quos delectus, quod enim error molestias officia consequuntur modi atque facere quia. Dolores, alias? Tenetur corrupti voluptatem commodi placeat facilis nulla.</p>')
})

$('.five button').click(function(){
    $('.prepend-target').prepend($('.five').clone())
})

$('.six button').click(function(){
    $(".six").css({
        'transform': 'rotate(180deg)',
    })
})

$('.seven button').click(function(){

        $('.seven').append($('<button class="vanish">CLICK TO DISSAPEAR</button>').css({
            'padding': '5px',
            'margin':'5px',
        }))

        $('.vanish').click(function(){
            let clickedButton = $(this)
            clickedButton.fadeOut()
        })
    })
