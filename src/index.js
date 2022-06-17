import './style.css';

import LoadToDoList from './modules/LoadToDoListTask.js';
import AddTaskToList from './modules/AddTask.js';
import CheckBoxesChecked from './modules/checkBox.js';

LoadToDoList();

let List = [];

const saveList = (array) => {
  localStorage.setItem('mytodoList', JSON.stringify(array));
};

if (localStorage.getItem('mytodoList')) {
  List = JSON.parse(localStorage.getItem('mytodoList'));
  List.forEach((element) => {
    AddTaskToList(element.task, element.index, element.done);
  });
}

const inputTask = document.querySelector('input');
inputTask.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && inputTask.value) {
    event.preventDefault();
    AddTaskToList(inputTask.value, List.length + 1); // + 1
  }
});

const CountCheckbox = document.querySelector('input');
CountCheckbox.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const checkboxes = document.querySelectorAll('.checkbox');
    const taskObject = {
      task: inputTask.value,
      done: false,
      index: checkboxes.length,
    };
    List.push(taskObject);
    saveList(List);
    inputTask.value = null;
  }
});

document.addEventListener('change', (event) => {
  CheckBoxesChecked(event);
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('fa-trash-alt')) {
    const trash = event.target.id;
    let list = JSON.parse(localStorage.getItem('mytodoList'));
    list = list.filter((e) => e.index !== Number(trash - 1));
    for (let i = 0; i < list.length; i += 1) {
      list[i].index = i + 1;
    }
    localStorage.removeItem(event.target.parentNode);
    event.target.parentNode.remove();
    saveList(list);
    window.location.reload();
  }
});

document.addEventListener('change', (event) => {
  if (event.target.classList.contains('task')) {
    const list = JSON.parse(localStorage.getItem('mytodoList'));
    list[event.target.parentNode.firstElementChild.id - 1].task = event.target.value;
    event.target.nextElementSibling.classList.toggle('edit-task');
    saveList(list);
  }
});

const clearAll = document.querySelector('#clear');
clearAll.addEventListener('click', () => {
  List = JSON.parse(localStorage.getItem('mytodoList'));
  List = List.filter((task) => task.done === false);
  List = List.map((item, i) => ({ task: item.task, done: item.done, index: i + 1 }));
  saveList(List);
  window.location.reload();
});