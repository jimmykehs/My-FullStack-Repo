const BASE_URL = 'https://jsonplace-univclone.herokuapp.com'

function fetchUsers() {
    return fetchData(`${BASE_URL}/users`)
}
function fetchUserAlbumList(userId) {
    let albumUrl = `${BASE_URL}/users/${userId}/albums?_expand=user&_embed=photos`
    return fetchData(albumUrl)
}
function fetchData(url){
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error))
}
function fetchUserPosts(userId) {
    return fetchData(`${ BASE_URL }/users/${ userId }/posts?_expand=user`);
  }
  
function fetchPostComments(postId) {
    return fetchData(`${ BASE_URL }/posts/${ postId }/comments`)
  }
function setCommentsOnPost(post){
    if(post.comments){
        return Promise.reject(null)
    }

    return fetchPostComments(post.id)
        .then((data) => {
            post.comments = data
            return post
        })
        .catch( e => console.log('Error', e))
}
function renderPost(post){
    let postElement = $(`
        <div class="post-card">
            <header>
                <h3>${post.title}</h3>
                <h3>--- ${post.user.name}</h3>
            </header>

            <p>${post.body}</p>
            <footer>
                <div class="comment-list"></div>
                <a href="#" class="toggle-comments">(<span class="verb">show</span> comments)</a>
            </footer>
        </div>
    `)
    postElement.data('userPost', post)
    return postElement
}
function renderPostList(postList){
    $('.active').removeClass('active')
    $('#post-list').empty()
    $('#post-list').addClass('active')
    postList.forEach((post) => {
        $('#post-list').append(renderPost(post))
    })
}
function toggleComments(postCardElement) {
    const footerElement = postCardElement.find('footer');

    if (footerElement.hasClass('comments-open')) {
      footerElement.removeClass('comments-open');
      footerElement.find('.verb').text('show');
    } else {
      footerElement.addClass('comments-open');
      footerElement.find('.verb').text('hide');
    }
  }
function renderUser(user){
    let userElement = $(`
        <div class="user-card">
            <header>
                <h2>${user.name}</h2>
            </header>
            <section class="company-info">
                <p><b>Contact:</b> ${user.email}</p>
                <p><b>Works for:</b>${user.company.name}</p>
                <p><b>Company creed:</b> "${user.company.catchPhrase}, which will ${user.company.bs}"</p>
            </section>
            <footer>
                <button class="load-posts">POSTS BY ${user.username}</button>
                <button class="load-albums">ALBUMS BY ${user.username}</button>
            </footer>
        </div>
    `)

    userElement.data('user', user)

    return userElement
}
function renderUserList(userList){
    $('#user-list').empty()
    userList.forEach((user) => {
        $('#user-list').append(renderUser(user))
    })
}
function renderAlbum(album) {
    console.log(album)
    let albumElement = $(`
        <div class="album-card">
            <header>
                <h3>${album.title}, by ${album.user.name} </h3>
            </header>
            <section class="photo-list">
            ${album.photos.forEach((photo) => {
                $('.photo-list').append(renderPhoto(photo))
            })}
            </section>
        </div>
    `)
    return albumElement
}
function renderPhoto(photo) {
    let photoElement = $(`
        <div class="photo-card">
            <a href="${photo.url}" target="_blank">
                <img src="${photo.thumbnailUrl}">
                <figure>${photo.title}</figure>
            </a>
        </div>
    `)
    return photoElement
}
function renderAlbumList(albumList) {
    $('#app section.active').removeClass('active')
    $('#album-list').addClass('active')
    $('#album-list').empty()
    albumList.forEach((album) => {
        $('#album-list').append(renderAlbum(album))
    })
}
function bootstrap() {
    fetchUsers().then(renderUserList)
}

$('#user-list').on('click', '.user-card .load-posts', function() {
    let postData = $(this).closest('.user-card').data('user')
    fetchUserPosts(postData.id).then(renderPostList)
})

$('#user-list').on('click', '.user-card .load-albums', function() {
    let albumData = $(this).closest('.user-card').data('user')
    fetchUserAlbumList(albumData.id).then(renderAlbumList)

})
$('#post-list').on('click', '.post-card .toggle-comments', function () {
    const postCardElement = $(this).closest('.post-card');
    const post = postCardElement.data('userPost');
    const postComments = postCardElement.find('.comment-list')
    setCommentsOnPost(post)
      .then(function (post) {
        postComments.empty()
        post.comments.forEach((comment) => {
            postComments.append($(`
                <h3>${comment.body}</h3>
                <h3>${comment.email}</h3>
            `))
        })
      })
      .catch(function () {
        console.log('comments previously existed, only toggling...', post);
      });
      toggleComments(postCardElement)
  });


bootstrap()