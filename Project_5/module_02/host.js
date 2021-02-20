const GUEST_LIST = [
    { name: 'Leonard', count: 6 },
    { name: 'Sharon', count: 4 }
  ];

  function buildGuestCard(guest) {
    return `
        <div class='guest-card'>
            <span>${guest.name}, party of ${guest.count}</span>
        </div>
    `
}

  function renderGuestList() {
    $('.guest-list').empty()
    GUEST_LIST.forEach(function(guest){
        $('.guest-list').append(buildGuestCard(guest))
    })
}

function addGuestToList(event){
    event.preventDefault()
    let newGuest = {
        name: $('#guest-name').val(),
        count: $('#guest-count').val()
    }
    GUEST_LIST.push(newGuest)
    renderGuestList()
    $('.guest-form').trigger('reset')
}

function serveNextGuest(){
    GUEST_LIST.shift()
    renderGuestList()
}

$('.guest-form').submit(addGuestToList)
$('#serve').click(serveNextGuest)