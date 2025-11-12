// select DOM elements
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

//try to load saved todos from localstorage(if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    //Save current todos to localstorage
    localStorage.setItem('todos', JSON.stringify(todos))
}

//Create a DOM node for a todo object and append it to the list

function createTodoNode(todo, index) {
    const li = document.createElement('li');

    //check box to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;


        //TODO: Visual feed back :strike -through when completed
        textspan.style.textDecoration = todo.completed ? 'line-through' : "";
        saveTodos();
    })
    //text of the todo
    const textspan = document.createElement('span');
    textspan.textContent = todo.text;
    if (todo.completed) {
        textspan.style.textDecoration = 'line-through';
    }
    //Add double click listner
    textspan.addEventListener("dblclick", () => {
        const newText = prompt("Edit Todo", todo.text)
        if (newText !== null) {
            todo.text = newText.trim();
            textspan.textContent = todo.text;
            saveTodos();
        }
    })

    //delete todo button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    })
    li.appendChild(checkbox);
    li.appendChild(textspan)
    li.appendChild(delBtn)
    return li;

}

//Render the whole todo list from todos Array

function render() {
    list.innerHTML = '';
    //Recreate each item
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    })
}
function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return
    }
    todos.push({ text: text, completed: false })
    input.value = '';
    render()
    saveTodos();
}
addBtn.addEventListener("click", addTodo);
input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        addTodo();
    }
})
render();