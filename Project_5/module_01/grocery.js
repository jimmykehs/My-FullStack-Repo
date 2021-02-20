const BASE_GROCERIES = [
    { name: 'banana', price: 49 },
    { name: 'tomato', price: 129 },
    { name: 'orange', price: 99 },
    { name: 'pepper', price: 139 },
    { name: 'milk', price: 449 }
  ];

  function populateBase(){
    BASE_GROCERIES.forEach(function(entry){
        $('.grocery-list').append(buildGroceryElement(entry))
    })
  }

  function buildGroceryElement(grocery){
      let moneyConv = grocery.price / 100
    return $(`
    <div class='grocery-item'>
    <p>${grocery.name}: $${moneyConv}</p>
    </div>
    `)
  }

  $('#new-grocery').submit(function(event){
      event.preventDefault()
      let itemName = $('#grocery-name').val()
      let itemPrice = $('#grocery-price').val()
      let moneyConv = itemPrice / 100
    let grocery = {
        name: itemName,
        price: itemPrice
    }
      $('.grocery-list').append($(`
      <div class='grocery-item'>
      <p>${grocery.name}: $${moneyConv}</p>
      </div>
      `))

      $(this).trigger('reset')


  })

  populateBase()