import { showList } from './LoadToDOList.js';

const AddTaskToList = (task, index) => {
  const containerTasks = document.createElement('div');
  containerTasks.innerHTML += `
        <input type="checkbox" id='${index}' class="checkbox">
        <input type='text' value='${task}' class='task'>
        <i class="fas fa-ellipsis-v" id='${index + 2}'></i>
        <i class="fas fa-trash-alt" id='${index + 1}'></i>
      `;
  showList.appendChild(containerTasks);
};

export default AddTaskToList;