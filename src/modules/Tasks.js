const taskses = [{
  task: 'Double-tap to edit',
  completed: true,
  index: 0,
}, {
  task: "Drag'n drop to reorder your list",
  completed: true,
  index: 1,
}, {
  task: 'Manage all your lists in one place',
  completed: true,
  index: 2,
}, {
  task: 'Resync to clear out the old',
  completed: true,
  index: 3,
}];

const loadTaskses = () => {
  let showList = ' ';

  for (let i = 0; i < taskses.length; i += 1) {
    showList += `<ul class="list">
       <li class="task"><input type="checkbox" name="task" id="othertask" value="task">${taskses[i].task}</li>
        </ul>`;
    document.getElementById('list').innerHTML = showList;
  }
};

export default loadTaskses;
