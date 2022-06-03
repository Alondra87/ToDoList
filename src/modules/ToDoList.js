export default class ToDoList {
  constructor(task, completed, index) {
    this.task = task;
    this.completed = completed;
    this.index = index;
  }
}

const section = document.querySelector('section');
section.innerHTML = `
  <div class="main-div">
    <p id="header">Today's To Do <i class="fas fa-sync"></i></p>
    <form class="form">
      <input class="dataEntry" type="text" placeholder="Add to your list..." required></input>
    </form>
    <p id="clear">Clear all completed</p>
  </div>
`;

// Create list
const createList = () => {
  const form = document.querySelector('.form');
  const list = document.createElement('div');
  list.className = 'input-div';
  form.appendChild(list);
  const checkboxes = document.createElement('input');
  checkboxes.className = 'input';
  checkboxes.type = 'checkbox';
  const listText = document.createElement('p');
  listText.className = 'listContent';
  const threeDots = document.createElement('i');
  threeDots.className = 'fas fa-ellipsis-v';
  const trashIcon = document.createElement('i');
  trashIcon.className = 'fas fa-trash-alt icon2';
  list.append(checkboxes, listText, threeDots, trashIcon);
  // Add event to checkboxes

  checkboxes.addEventListener('click', () => {
    threeDots.classList.toggle('remove-icon-active');
    trashIcon.classList.toggle('icon2');
    listText.classList.toggle('listContent-disable');
    list.classList.toggle('newbackg');
    const achieveStorage = JSON.parse(localStorage.getItem('list'));
    const newEvent = [];
    const newTask = document.querySelectorAll('.input-div');
    for (let i = 0; i < achieveStorage.length; i += 1) {
      if (newTask[i].classList.contains('newbackg')) {
        achieveStorage[i].completed = true;
      } else {
        achieveStorage[i].completed = false;
      }
      newEvent.push(achieveStorage[i]);
      localStorage.setItem('list', JSON.stringify(newEvent));
    }
  });

  // Remove from list event
  trashIcon.addEventListener('click', () => {
    form.removeChild(list);
    const getFromLocalStorage = JSON.parse(localStorage.getItem('list'));
    const result = getFromLocalStorage.filter((written) => written.task === listText.textContent);
    const newEvent = [];
    for (let i = 0; i < getFromLocalStorage.length; i += 1) {
      if (result[0].task === getFromLocalStorage[i].task) {
        newEvent.push(getFromLocalStorage[i]);
      }
    }
    localStorage.setItem('list', JSON.stringify(newEvent));
  });

  threeDots.addEventListener('click', () => {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'listContent';
    editInput.style.color = 'var(--color-mint)';
    list.style.backgroundColor = 'var(--color-grey-light-1)';
    editInput.value = listText.textContent;
    list.replaceChild(editInput, listText);
    editInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && editInput.value) {
        const achieveStorage = JSON.parse(localStorage.getItem('list'));
        const result = achieveStorage.filter((written) => written.task === listText.textContent);
        const newEvent = [];
        for (let i = 0; i < achieveStorage.length; i += 1) {
          if (achieveStorage[i].index === result[0].index) {
            achieveStorage[i].task = editInput.value;
          }
          newEvent.push(achieveStorage[i]);
          localStorage.setItem('list', JSON.stringify(newEvent));
        }
        list.replaceChild(listText, editInput);
        listText.textContent = editInput.value;
        list.style.backgroundColor = '#fff';
      }
    });
  });
};

let arrayTasks = [];
const sendToLocalStorage = () => {
  localStorage.setItem('list', JSON.stringify(arrayTasks));
};
// Entering list event
const dataEntry = document.querySelector('.dataEntry');
dataEntry.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && dataEntry.value) {
    const object = new ToDoList(dataEntry.value, false, arrayTasks.length);
    arrayTasks.push(object);
    e.preventDefault();
    createList();
    const listText = document.querySelectorAll('.listContent');
    for (let i = 0; i < arrayTasks.length; i += 1) {
      listText[i].textContent = arrayTasks[i].task;
    }
    dataEntry.value = null;
    sendToLocalStorage();
  }
});

window.addEventListener('load', () => {
  const getFromLocalStorage = JSON.parse(localStorage.getItem('list'));
  for (let i = 0; i < getFromLocalStorage.length; i += 1) {
    createList();
    const listText = document.querySelectorAll('.listContent');
    listText[i].textContent = getFromLocalStorage[i].task;
    if (getFromLocalStorage[i].completed === true) {
      getFromLocalStorage[i].completed = false;
    }
    localStorage.setItem('list', JSON.stringify(getFromLocalStorage));

    arrayTasks = getFromLocalStorage;
  }
});