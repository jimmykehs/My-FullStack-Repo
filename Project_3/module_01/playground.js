$('.red h3').text('Abacus Central');
$('.blue h3').text('Grenadine Dreams');
$('.white h3').html('<code>CODE</code> Central');

$('h1').text("Hello World!");

$('body').css({'font-family':'sans-serif', 'background':'grey'})
$('section').css('display',"flex");
$('.blue, .red, .white').css('border', '1px solid black');
$('.blue').css({
    'background':"blue", 
    'padding':'15px', 
    'margin':'15px',
    'flex':'1',
});
$('.red').css({
    "background":'red', 
    'padding':'15px', 
    'margin':'15px',
    'flex':'1',
});
$('.white').css({
    "background":'white', 
    'padding':'15px', 
    'margin':'15px', 
    'flex':'1'
});

$('code').css('font-size', '1.7em');

$('.lead-cards p').css('font-family', 'cursive');

$('section:nth-of-type(2)').css({
    'transform':'rotate(360deg) scale(.5)',
    'transition': 'transform 3s ease',
});

$('.deprecated').remove();