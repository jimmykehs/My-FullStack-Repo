let allTodos

let pendingTodos, completedTodos, expiredTodos


//functions

function createElementFromTodo(todo){
     
    return $(`
    <div class="todo">
    <h3><span class="title">${todo.title}</span><span class="due-date">${todo.dueDate}</span></h3>
    <pre>${todo.description}</pre>
    <footer class="actions">
    ${todo.isComplete ? ' ' : '<button class="action complete">Complete</button>'}
    <button class="action delete">Delete</button>
    </footer>
    </div>`).data('Todo', todo)
}
function masterUpdate(){
    storeData()
    splitTodos()
    renderTodos()
}
function renderTodos(){
    splitTodos()
    $('main .content').empty()
    pendingTodos.forEach(function(element){
        $('.pending-todos').append(createElementFromTodo(element))
    })
    completedTodos.forEach(function(element){
        $('.completed-todos').append(createElementFromTodo(element))
    })
    expiredTodos.forEach(function(element){
        $('.expired-todos').append(createElementFromTodo(element))
    })

    
}

function createToDoFromForm(){
    let newTodo = {
        title: $('#todo-title').val(),
        dueDate: $('#todo-due-date').val(),
        description: $('#todo-description').val(),
        isComplete: false
    }
    
    return newTodo

}

    function isCurrent(todo) {
        const todoDueDate = new Date(todo.dueDate);
        const now = new Date();
        return now < todoDueDate;
      }


function splitTodos(){
    pendingTodos = allTodos.filter(function(element){
        if(element.isComplete === false && isCurrent(element)){
            return element
        }
    })

    completedTodos = allTodos.filter(function(element){
        if(element.isComplete){
        return element
        }
    })

    expiredTodos = allTodos.filter(function(element){
        if(element.isComplete === false && isCurrent(element) === false){
            return element
        }
    })


}

    function makeComplete(){
        let toDoElement = $(this).closest('.todo')
        let toDoData = toDoElement.data('Todo')
        toDoData.isComplete = true
        toDoElement.slideUp(masterUpdate)
}

function storeData(){
    localStorage.setItem('todoLocal', JSON.stringify(allTodos))
}
function retrieveData(){
        allTodos = JSON.parse(localStorage.getItem('todoLocal'))
        if(allTodos === null || allTodos.length < 1){
            allTodos = fetchDefaultTodos()
            masterUpdate()
        }

}
function fetchDefaultTodos(){
    return [
        {title: 'First Task!', dueDate: '03-20-2021', description: 'This should work...', isComplete: false},
        {title: 'Second Task!', dueDate: '02-13-2009', description: 'this should be expired', isComplete: false},
        {title: 'Third Task!', dueDate: '02-13-2029', description: 'Completed!', isComplete: true},
        {title: 'Fourth Task!', dueDate: '02-13-2029', description: 'this should work', isComplete: false},
        {title: 'Make fifth task', dueDate: '02-13-2029', description: 'this should also work...', isComplete: false},
        {title: 'Sixth Task!', dueDate: '02-13-2009', description: 'this should be completed and expired', isComplete: true},
    ]
}

function deleteTodo(){
    let thisTodo = $(this).closest('.todo')
    let todoData = thisTodo.data('Todo')
    let indexVal = allTodos.indexOf(todoData)
    allTodos.splice(indexVal, 1)
    thisTodo.slideUp(masterUpdate)
}

function removeCompleted(){
    let uncompleteTodos = allTodos.filter(function(value){
        return !(value.isComplete)
    })
    allTodos = uncompleteTodos
    masterUpdate()
}

function removeExpired(){
    let currentTodos = allTodos.filter(function(value){
        if(isCurrent(value)){
            return value
        }
    })
    allTodos = currentTodos
    masterUpdate()
}
    


//click listeners

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
    masterUpdate()
})

$('main').on('click', '.complete', makeComplete)

$('main').on('click', '.delete', deleteTodo)
$('.remove-completed').click(removeCompleted)
$('.remove-expired').click(removeExpired)


retrieveData()
splitTodos()
renderTodos()