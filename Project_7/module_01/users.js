const USERS_URL = `https://reqres.in/api/users?per_page=2`;

const metadata = {
  minPage: 1,
  currentPage: 1,
  maxPage: null
};

function renderUser(user) {
    let userElement = $(`
        <h1>${user.first_name} ${user.last_name}</h1>
        <h4>${user.email}</h4>
        <img src='${user.avatar}'>
    `)
    return userElement
}

function renderUserList(userList) {
    $('#user-list').empty()
    userList.forEach((user) => {
        $('#user-list').append(renderUser(user))
    })
}

function updatePageInfo() {
    $('#page-info').html(`<h1>Page Number: ${metadata.currentPage}</h1>`)
}

function updateButtons() {
    if(metadata.currentPage === 1) {
        $('#back').attr('disabled', true)
    }
    else if(metadata.currentPage === metadata.maxPage) {
        $('#forward').attr('disabled', true);
    }
    else {
        $('#back, #forward').removeAttr('disabled')
    }
}

function fetchUserList(currentPage = 1) {
    return fetch(`${USERS_URL}&page=${currentPage}`)
        .then(response => response.json())
        .then((result) => {
            metadata.currentPage = result.page
            metadata.maxPage = result.total_pages
            renderUserList(result.data)
            updatePageInfo()
            updateButtons()
        })
        .catch()
}

$('#back').on('click', function () {
    if(metadata.currentPage > metadata.minPage){
        fetchUserList(metadata.currentPage - 1)
    }
});

$('#forward').on('click', function () {
    if(metadata.currentPage < metadata.maxPage){
        fetchUserList(metadata.currentPage + 1)
    }
});

function bootstrap() {
    fetchUserList()
}

bootstrap();