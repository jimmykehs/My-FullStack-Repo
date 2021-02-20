const header3 = $('<h3>')
const par = $('<p>')
const img = $('<img>')

header3.text('Hello World')
par.html('<b>This</b> is my text')
img.attr('src', 'http://placeimg.com/640/480/nature?1')

$('.slo-mo').append(header3, par, img);

// Normal Speed

$('.normal-speed').append(
    $('<h3>').text("Hello World!"),
    $('<p>').html('<b>This</b> is my text'),
    $('<img>').attr('src', 'http://placeimg.com/640/480/nature?1'),
)

// Rewind

$('.rewind')
    .prepend($('<img>').attr('src', 'http://placeimg.com/640/480/nature?1'))
    .prepend($('<p>').html('<b>This</b> is my text'))
    .prepend($('<h3>').text("Hello World!"))

// Turbo

$('.turbo').html(`
    <h3>Hello, World</h3>
    <p><b>This</b> is my text</p>
    <img src="http://placeimg.com/640/480/nature?1" />
`)