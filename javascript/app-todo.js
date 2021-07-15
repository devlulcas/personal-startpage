const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");

//Event listeners

window.addEventListener("load", addTodosAgain(getTodos()));

todoInput.addEventListener("keypress", (ev) => {
  if (ev.code === "Enter") addTodo(ev);
});

todoList.addEventListener("click", (ev) => {
  removeTodoFromUi(ev);
  const todo = todoList.previousSibling.textContent;
  deleteTodo(todo, getTodos());
});

//Functions

function addTodo(ev) {
  const todoText = todoInput.value;
  setTodo(todoText, getTodos());
  createTodo(todoText);
  todoInput.value = "";
}

function removeTodoFromUi(ev) {
  const element = ev.target;
  const todo = element.parentElement;
  if (element.type === "submit") {
    todo.classList.add("disappear");
    todo.addEventListener("animationend", () => {
      todo.remove();
    });
  }
}

function getTodos() {
  if (!localStorage.getItem("todos")) {
    return [];
  }
  return JSON.parse(localStorage.getItem("todos"));
}

function setTodo(todo, todos) {
  todos.push(todo);
  const jsonTodos = JSON.stringify(todos);
  localStorage.setItem("todos", jsonTodos);
}

function deleteTodo(todo, todos) {
  const todoIndex = todos.indexOf(todo);
  const howManyToDelete = 1;
  todos.splice(todoIndex, howManyToDelete);
  const jsonTodos = JSON.stringify(todos);
  localStorage.setItem("todos", jsonTodos);
}

function addTodosAgain(todos) {
  todos.forEach((todo) => {
    createTodo(todo);
  });
}

function createTodo(todoText) {
  const todoListItem = document.createElement("li");
  const todoParagraph = document.createElement("p");
  const todoButton = document.createElement("button");
  //Insert content
  todoParagraph.textContent = todoText;
  //Append elements
  todoListItem.appendChild(todoParagraph);
  todoListItem.appendChild(todoButton);
  todoList.appendChild(todoListItem);
}
