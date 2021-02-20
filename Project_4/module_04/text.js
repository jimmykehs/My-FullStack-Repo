

function reverse(text) {
    return text.split('').reverse().join('');
  }
  
  function scream(text) {
    return text.toUpperCase() + "!!!";
  }
  
  function drawOut(text) {
    return text.split('').join("...");
  }
  
  let textFunction = reverse // default value

  function updateText(){
    let userInput = $('#user-input').val()
      let transformedText = textFunction(userInput)
      $('#transformed').text(transformedText)
  }

  $('input[type=radio]').click(function() {
    let inputId = $(this).attr("id")
    console.log(inputId)
    if(inputId === 'reverse'){
      textFunction = reverse
    }
    else if(inputId === 'scream'){
      textFunction = scream
    }
    else if(inputId === 'draw-out'){
      textFunction = drawOut
    }
    updateText()
  })

  $('#user-input').on('input', updateText)