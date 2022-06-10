import './style.css';

import LoadToDoList from './modules/LoadToDoListTask.js';
import AddTaskToList from './modules/AddTask.js';
import CheckBoxesChecked from './modules/checkBox.js';

LoadToDoList();
const arrayTask = [];

const saveList = (array) => {
  localStorage.setItem('mytodoList', JSON.stringify(array));
};

const genNewId = (elemsArray) => {
  if (elemsArray.length >= 0) {
    return elemsArray.length + 1;
  }
  return elemsArray.length;
};

const getList = () => {
  const list = JSON.parse(localStorage.getItem('mytodoList'));
  if (list !== null) {
    list.forEach((element) => {
      const checkbox = document.querySelectorAll('.checkbox');
      AddTaskToList(element.description, genNewId(checkbox));
      const taskObject = {
        description: element.description,
        completed: false,
        index: genNewId(checkbox),
      };
      arrayTask.push(taskObject);
      saveList(arrayTask);
    });
  }
};
getList();

const inputTask = document.querySelector('input');
inputTask.addEventListener('keypress', (event) => {
  const checkBoxIndex = document.querySelectorAll('.checkbox');
  if (event.key === 'Enter' && inputTask.value) {
    event.preventDefault();
    AddTaskToList(inputTask.value, genNewId(checkBoxIndex)); // + 1
  }
});

const CountCheckbox = document.querySelector('input');
CountCheckbox.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const checkboxes = document.querySelectorAll('.checkbox');
    const taskObject = {
      description: inputTask.value,
      completed: false,
      index: checkboxes.length,
    };
    arrayTask.push(taskObject);
    saveList(arrayTask);
    inputTask.value = null;
  }
});

document.addEventListener('click', (event) => {
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
    list[event.target.parentNode.firstElementChild.id - 1].description = event.target.value;
    event.target.nextElementSibling.classList.toggle('edit-task');
    saveList(list);
  }
});

const clearAll = document.querySelector('#clear');
clearAll.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.checkbox');
  for (let i = 0; i < checkboxes.length; i += 1) {
    if (checkboxes[i].checked) {
      checkboxes[i].parentNode.remove();
    }
  }
  const list = JSON.parse(localStorage.getItem('mytodoList'));
  const newList = list.filter((e) => e.completed !== true);
  saveList(newList);
  window.location.reload();
});