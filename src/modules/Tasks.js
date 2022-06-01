const taskses = [{ task: 'Double-tap to edit' }, { task: "Drag'n drop to reorder your list" }, { task: 'Manage all your lists in one place' }, { task: 'Resync to clear out the old' }];

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
