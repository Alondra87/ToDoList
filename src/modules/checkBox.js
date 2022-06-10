const CheckBoxesChecked = (event) => {
  if (event.target.classList.contains('checkbox')) {
    const list = JSON.parse(localStorage.getItem('mytodoList'));

    list[event.target.id - 1].done = !list[event.target.id - 1].done;
    event.target.parentNode.classList.toggle('newbackg');
    event.target.nextElementSibling.classList.toggle('input-done');
    event.target.nextElementSibling.classList.toggle('done-task');
    event.target.parentNode.lastElementChild.classList.toggle('trash');
    localStorage.setItem('mytodoList', JSON.stringify(list));
  }
};

export default CheckBoxesChecked;
