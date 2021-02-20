let allTodos = [
    {title: 'Make first task', dueDate: '02-13-2029', description: 'this should work', isComplete: false},
    {title: 'Make second task', dueDate: '02-13-2029', description: 'this should work', isComplete: true},
    {title: 'Make third task', dueDate: '02-13-2029', description: 'this should work', isComplete: false},
    {title: 'Make fourth task', dueDate: '02-13-2029', description: 'this should work', isComplete: true},
    {title: 'Make fifth task', dueDate: '02-13-2029', description: 'this should work', isComplete: false},
    {title: 'Make sixth task', dueDate: '02-13-2029', description: 'this should work', isComplete: true},
]

function createElementFromTodo(todo){
    let newElement = $(`
    <div class="todo">
    <h3><span class="title">${todo.title}</span><span class="due-date">${todo.dueDate}</span></h3>
    <pre>${todo.description}</pre>
    <footer class="actions">
    <button class="action complete">Complete</button>
    <button class="action delete">Delete</button>
    </footer>
    </div>`)

    newElement.data('todo', todo)
    
    return newElement
}

function renderTools(){
    $('main .content').empty()
    allTodos.forEach(function(entry){
        if(entry.isComplete){
            $('.completed-todos').append(createElementFromTodo(entry))
        }
        else{
            $('.pending-todos').append(createElementFromTodo(entry))
        }
    })
}

function createToDoFromForm(){
    let newTodo = {
        title: $('#todo-title').val(),
        dueDate: $('#todo-due-date').val(),
        description: $('todo-description').val(),
        isComplete: false
    }
    return newTodo

}

$('.left-drawer').click(function(event){
    if($(event.target).hasClass('left-drawer'))
        $('#app').toggleClass('drawer-open')
})
$('.add-todo').click(function(){
    $('.modal').addClass('open')
})
$('.create-todo, .cancel-create-todo').click(function(){
    $('.modal').removeClass('open')
})

$('.create-todo').click(function(event){
    event.preventDefault()
    let toDo = createToDoFromForm()
    allTodos.unshift(toDo)
    $('.todo-form').trigger('reset')
    renderTools()
})

$('main').on('click', '.action, .complete', function(){
    let parentTodo = $(this).closest('.todo')
    parentTodo.data('isComplete', true)
    renderTools()
})

renderTools()