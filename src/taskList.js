const todoListEl = document.getElementById('todo-lists');

function renderTasks(tasks) {
  todoListEl.innerHTML = '';

  function createBlurListener(i, tasks, descriptionEl) {
    return () => {
      const updatedDescription = descriptionEl.value.trim();
      tasks[i].description = updatedDescription;
      descriptionEl.readOnly = true;
      renderTasks(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  }

  function createRemoveListener(i, tasks) {
    return () => {
      tasks.splice(i, 1);

      tasks.forEach((task, index) => {
        task.index = index + 1;
      });

      renderTasks(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  }

  function createCheckboxListener(i, tasks) {
    return (event) => {
      tasks[i].completed = event.target.checked;
      renderTasks(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  }

  for (let i = 0; i < tasks.length; i += 1) {
    const taskWrapper = document.createElement('div');
    const taskIcon = document.createElement('span');
    const todoItemEl = document.createElement('li');
    const checkboxEl = document.createElement('input');
    const removeButtonEl = document.createElement('button');

    taskIcon.className = 'material-symbols-outlined';
    taskIcon.innerText = 'more_vert';

    checkboxEl.type = 'checkbox';
    checkboxEl.checked = tasks[i].completed;

    checkboxEl.addEventListener('change', createCheckboxListener(i, tasks));
    taskWrapper.appendChild(checkboxEl);

    const descriptionEl = document.createElement('input');
    descriptionEl.type = 'text';
    descriptionEl.value = tasks[i].description;
    descriptionEl.readOnly = true;

    descriptionEl.addEventListener('click', () => {
      descriptionEl.readOnly = false;
    });

    descriptionEl.addEventListener('blur', createBlurListener(i, tasks, descriptionEl));
    taskWrapper.appendChild(descriptionEl);

    removeButtonEl.innerText = 'delete';
    removeButtonEl.className = 'material-symbols-outlined';
    removeButtonEl.classList.add('remove-btn');
    removeButtonEl.addEventListener('click', createRemoveListener(i, tasks));

    todoItemEl.appendChild(taskWrapper);
    todoItemEl.appendChild(removeButtonEl);
    todoItemEl.appendChild(taskIcon);

    if (tasks[i].completed) {
      descriptionEl.classList.add('completed');
    }

    todoListEl.appendChild(todoItemEl);
  }
}

export default renderTasks;
