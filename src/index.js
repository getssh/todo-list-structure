import './style.css';

const tasks = [];

const todoListEl = document.getElementById('todo-lists');
const todoInputEl = document.getElementById('todo-input');

function renderTasks(tasks) {
  todoListEl.innerHTML = '';

  function createBlurListener(i, tasks, descriptionEl) {
    return () => {
      const updatedDescription = descriptionEl.value.trim();
      tasks[i].description = updatedDescription;
      descriptionEl.readOnly = true;
      renderTasks(tasks);
    };
  }

  function createRemoveListener(i, tasks) {
    return () => {
      tasks = tasks.filter((task) => task.index !== tasks[i].index);
      // Re-arrange index
      tasks = tasks.map((task, index) => ({ ...task, index }));
      renderTasks(tasks);
    };
  }

  function createCheckboxListener(i, tasks) {
    return (event) => {
      tasks[i].completed = event.target.checked;
      renderTasks(tasks);
      console.log(tasks);
    };
  }

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
    // Add an event listener to the checkbox input element
    checkboxEl.addEventListener('change', createCheckboxListener(i, tasks));
    taskWrapper.appendChild(checkboxEl);

    const descriptionEl = document.createElement('input');
    descriptionEl.type = 'text';
    descriptionEl.value = tasks[i].description;
    descriptionEl.readOnly = true;
    // Add an event listener to the description input element
    descriptionEl.addEventListener('click', () => {
      descriptionEl.readOnly = false;
    });
    // Add an event listener to the description input element
    descriptionEl.addEventListener('blur', createBlurListener(i, tasks, descriptionEl));
    taskWrapper.appendChild(descriptionEl);

    removeButtonEl.innerText = 'Remove';
    removeButtonEl.addEventListener('click', createRemoveListener(i, tasks));
    taskWrapper.appendChild(removeButtonEl);

    todoItemEl.appendChild(taskWrapper);
    todoItemEl.appendChild(taskIcon);

    if (tasks[i].completed) {
      descriptionEl.classList.add('completed');
    }

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

renderTasks(tasks);
