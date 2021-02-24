const DEFAULT_PREFERENCES = {
    darkMode: false,
    largeFont: false,
    expertMode: false,
  }
  
  let userPreferences;
  
  function setPreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences))
  }
  
  function getPreferences() {
    userPreferences = undefined ? DEFAULT_PREFERENCES : JSON.parse(localStorage.getItem('userPreferences'))
  }
  
  function updateInterface() {
    setColorMode()
    setBaseFontSize()
    drawAside()
  }
  
  function setColorMode() {
      userPreferences.darkMode ? $('#app').attr('class', 'dark') : $('#app').attr('class', 'light')
  }
  
  function setBaseFontSize() {
      userPreferences.largeFont ? $('html').css('font-size', '24px') : $('html').css('font-size', '16px')
  }
  
  function drawAside() {
      userPreferences.expertMode ?
      $('aside').html(`
        <button>ALL USERS</button>
        <button>ALL USERS</button>
        <button>EXPERT USERS</button>
        <button>EXPERT USERS</button>
        <button>ALL USERS</button>
        `)
        :
        $('aside').html(`
        <button>ALL USERS</button>
        <button>ALL USERS</button>
        <button>ALL USERS</button>
        `)
  }
  
  function populateCustomControls() {
    if(userPreferences.darkMode === true){
        $('#dark-mode').prop('checked', true)
    }
    if(userPreferences.largeFont === true){
        $('#large-font').prop('checked', true)
    }
    if(userPreferences.expertMode === true){
        $('#expert-mode').prop('checked', true)
    }


  }
  
  $('.trigger').click(function () {
    $('.custom-controls').toggleClass('open');
  });
  
  $('.custom-controls').on('input', 'input', function () {
      let selection = $(this).attr('name')
      
      userPreferences[selection] = $(this).is(':checked')
       setPreferences()
       updateInterface()
  });
  
  getPreferences();
  populateCustomControls();
  updateInterface();