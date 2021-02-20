const VALUES = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ]

  function draw(valueList) {
    $('.card-list').empty()
    valueList.forEach(function (value){
        $('.card-list').append(`
        <div class='card'>
        ${value}
        </div>
    `)
    })
}

function renderEven(){
    let evenlist = VALUES.filter(function (value){
        return value % 2 === 0
    })

    draw(evenlist)
}

function renderOdd(){
    let oddList = VALUES.filter(function (value){
        return value % 2 !== 0
    })

    draw(oddList)
}

$('.controls button').click(function () {
    $('.controls .selected').removeClass('selected');
    $(this).addClass('selected');
  })

$('.all').click(() => {
    draw(VALUES)
})

$('.even').click(renderEven)

$('.odd').click(renderOdd)

$('.card-list').on('click', '.card', function(){
    let number = Number($(this).text())
    let numberIndex = VALUES.indexOf(number)
    console.log(numberIndex)
    VALUES.splice(numberIndex, 1)
    console.log($(this))
    $(this).remove()

})


