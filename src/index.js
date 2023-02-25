import './style.css';
import renderTasks from './taskList.js';
import addTask from './addTask.js';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const todoListEl = document.getElementById('todo-lists');
const todoInputEl = document.getElementById('todo-input');
const clearComplete = document.getElementById('delete-complete');

renderTasks(tasks, todoListEl);

document.querySelector('.todo-input').addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(tasks, todoInputEl);
  renderTasks(tasks, todoListEl);
});

clearComplete.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
  renderTasks(tasks, todoInputEl);
  localStorage.setItem('tasks', JSON.stringify(tasks));
});
