import './style.css';

const todoLists = [
  { description: 'wash the dishes', completed: true, index: 0 },
  { description: 'complete To Do list project', completed: false, index: 1 },
];

const todoListEl = document.getElementById('todo-lists');

for (let i = 0; i < todoLists.length; i += 1) {
  const taskWrapper = document.createElement('div');
  const taskIcon = document.createElement('span');
  const todoItemEl = document.createElement('li');
  const checkboxEl = document.createElement('input');

  taskIcon.className = 'material-symbols-outlined';
  taskIcon.innerHTML = 'more_vert';

  checkboxEl.type = 'checkbox';
  checkboxEl.checked = todoLists[i].completed;
  taskWrapper.appendChild(checkboxEl);
  const descriptionEl = document.createTextNode(todoLists[i].description);
  taskWrapper.appendChild(descriptionEl);
  todoItemEl.appendChild(taskWrapper);
  todoItemEl.appendChild(taskIcon);
  todoListEl.appendChild(todoItemEl);
}