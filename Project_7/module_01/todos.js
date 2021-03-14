const TODOS_URL = `https://jsonplace-univclone.herokuapp.com/todos`

function fetchTodos() {
    return fetch(TODOS_URL)
        .then((response) => {
            return response.json()
        })

        .catch((error) => {

        })
}

function renderAllTodos(todos) {
    $('todo.list').empty()
    todos.forEach((todo) => {
        todo.completed ? $('.complete').append(renderTodo(todo)) : $('.incomplete').append(renderTodo(todo))
    })
}

function renderTodo(todo) {
    let todoElement = todo.completed ? 
    $(
        `<div class="todo">
            <h3>${todo.title}</h3>
            <footer>
            <button>DONE</button>
            </footer>
        </div>`
    ):
    $(
        `<div class="todo">
            <h3>${todo.title}</h3>
            <footer>
            <button>UNDO</button>
            </footer>
        </div>`
    )

    return todoElement
}

function bootstrap() {
    fetchTodos().then(renderAllTodos)
}

bootstrap();