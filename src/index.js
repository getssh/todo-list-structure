import './style.css';
import renderTasks from './taskList.js';
import addTask from './addTask.js';

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const todoListEl = document.getElementById('todo-lists');
const todoInputEl = document.getElementById('todo-input');

renderTasks(tasks, todoListEl);

document.querySelector('.todo-input').addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(tasks, todoInputEl);
  renderTasks(tasks, todoListEl);
});
