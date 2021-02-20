function setActive (sectionNumber) {
    $('.left-nav .active').removeClass('active')
    $('.content .active').removeClass('active')
    const dataSectionSelector = "[data-section=" + sectionNumber + "]"
    const dataLinkToSelector = '[data-link-to=' + sectionNumber + ']';

    $(dataSectionSelector).addClass('active')
    $(dataLinkToSelector).addClass('active')
}

$('.left-nav a').click(function() {
    let dataNumber = $(this).attr('data-link-to')
    setActive(dataNumber)
})

$(document).ready(function(){
    let sectionNumber = (window.location.hash).substring(1);
    setActive(sectionNumber)


})

