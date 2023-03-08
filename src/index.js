import './style.css';
import renderTasks from './taskList.js';
import addTask from './addTask.js';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const todoListEl = document.getElementById('todo-lists');
const todoInputEl = document.getElementById('todo-input');
const clearComplete = document.getElementById('delete-complete');
const addTaskIcon = document.querySelector('.return-icon');
const syncIcon = document.querySelector('.sync');

renderTasks(tasks, todoListEl);

syncIcon.addEventListener('click', () => {
  window.location.reload();
});

document.querySelector('.todo-input').addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(tasks, todoInputEl);
  renderTasks(tasks, todoListEl);
});

addTaskIcon.addEventListener('click', (e) => {
  e.preventDefault();
  addTask(tasks, todoInputEl);
  renderTasks(tasks, todoListEl);
});

function delteCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks(tasks, todoInputEl);
}

clearComplete.addEventListener('click', delteCompleted);
