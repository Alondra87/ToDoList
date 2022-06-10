const CheckBoxesChecked = (event) => {
  if (event.target.classList.contains('checkbox')) {
    const list = JSON.parse(localStorage.getItem('mytodoList'));
    list[event.target.id - 1].completed = !list[event.target.id - 1].completed;
    event.target.parentNode.classList.toggle('newbackg');
    event.target.nextElementSibling.classList.toggle('input-completed');
    event.target.nextElementSibling.classList.toggle('completed-task');
    event.target.parentNode.lastElementChild.classList.toggle('trash');
    localStorage.setItem('mytodoList', JSON.stringify(list));
  }
};

export default CheckBoxesChecked;