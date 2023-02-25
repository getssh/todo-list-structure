const todoInputEl = document.getElementById('todo-input');

function addTask(tasks) {
  const newTaskDescription = todoInputEl.value.trim();

  if (!newTaskDescription) {
    return;
  }

  const newTask = {
    description: newTaskDescription,
    completed: false,
    index: tasks.length + 1,
  };

  tasks.push(newTask);
  todoInputEl.value = '';

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export default addTask;
