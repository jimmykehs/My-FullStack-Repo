const CARD_URL = `https://api.magicthegathering.io/v1/cards?pageSize=20`

function renderCard(card) {
    let cardElement = 
        $(`<div class="card">
            <h3>${card.name} - ${card.manaCost}</h3>
            <h4>${card.type}</h4>
            <h5 class="set-name">${card.setName}</h5>
            <pre>${card.text}</pre>
            ${card.imageUrl ? `<img src="${card.imageUrl}"/>` : ''}
        </div>`)
        cardElement.find('.set-name').data('cardInfo', card)
    return cardElement
}

function renderCardList(cardList) {
    $('#results').empty()
    cardList.forEach((element) => {
        $('#results').append(renderCard(element))
    })
}

function fetchCardList(url) {
    $('.searching').addClass('active')
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            $('.searching').removeClass('active')
            renderCardList(data.cards)
    })
    .catch(() => {})
}

$('#card-search').on('submit', function (event) {
    event.preventDefault()
    let newUrl
    let cardName = $('#cname').val()
    let ctext = $('#ctext').val()
    $('#cname, #ctext').val('')
    
    newUrl = `${CARD_URL}${cardName ? `&name=${cardName}`:''}${ctext ? `&text=${ctext}`:''}`
    fetchCardList(newUrl)
});

$('#results').on('click', '.card .set-name', function () {
    let cardsetName = $(this).data('cardInfo').setName
    let setUrl = `${CARD_URL}&setName=${cardsetName}`
    console.log(setUrl)
    fetchCardList(setUrl)
});

