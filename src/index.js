import './style.css';

const todoLists = [];

const todoListEl = document.getElementById('todo-lists');
const todoInputEl = document.getElementById('todo-input');
const tasks = [];

function renderTasks(tasks) {
  todoListEl.innerHTML = '';

  for (let i = 0; i < tasks.length; i += 1) {
    const taskWrapper = document.createElement('div');
    const taskIcon = document.createElement('span');
    const todoItemEl = document.createElement('li');
    const checkboxEl = document.createElement('input');
    const removeButtonEl = document.createElement('button');

    taskIcon.className = 'material-symbols-outlined';
    taskIcon.innerHTML = 'more_vert';

    checkboxEl.type = 'checkbox';
    checkboxEl.checked = tasks[i].completed;
    taskWrapper.appendChild(checkboxEl);

    const descriptionEl = document.createElement('input');
    descriptionEl.type = 'text';
    descriptionEl.value = tasks[i].description;
    descriptionEl.readOnly = true;
    taskWrapper.appendChild(descriptionEl);

    removeButtonEl.innerText = 'Remove';
    removeButtonEl.addEventListener('click', () => {
      tasks = tasks.filter((task) => task.index !== tasks[i].index);
      // Re-arrange index
      tasks = tasks.map((task, index) => ({ ...task, index }));
      renderTasks(tasks);
      console.log(tasks);
    });
    taskWrapper.appendChild(removeButtonEl);

    todoItemEl.appendChild(taskWrapper);
    todoItemEl.appendChild(taskIcon);
    todoListEl.appendChild(todoItemEl);
  }
}

document.querySelector('.todo-input').addEventListener('submit', (e) => {
  e.preventDefault();

  const newTaskDescription = todoInputEl.value.trim();

  if (!newTaskDescription) {
    return;
  }

  const newTask = {
    description: newTaskDescription,
    completed: false,
    index: tasks.length,
  };

  tasks.push(newTask);
  todoInputEl.value = '';

  renderTasks(tasks);
});

renderTasks(todoLists);
