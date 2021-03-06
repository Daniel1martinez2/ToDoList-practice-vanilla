const actions = document.querySelector('.actions');

const TASK_STATE = {
  COMPLETED: 'completed',
  ACTIVE: 'active'
}
const filtersBtn = document.querySelectorAll('.actions__btn');
//APPLICATION_STATE 🍔 
//current asked list
const renderState = [{
    id: 'all',
    state: true,
    pointer: filtersBtn[0]
  },
  {
    id: 'active',
    state: false,
    pointer: filtersBtn[1]
  },
  {
    id: 'completed',
    state: false,
    pointer: filtersBtn[2]
  },
];
//Overall task list
let dummyTask = [];
//----------------------------------------------------------------
const currentList = () => {
  if (renderState[0].state) {
    return dummyTask;
  } else if (renderState[1].state) {
    return dummyTask.filter(taskItem => taskItem.state === TASK_STATE.ACTIVE);
  } else if (renderState[2].state) {
    return dummyTask.filter(taskItem => taskItem.state === TASK_STATE.COMPLETED);
  }
  return dummyTask;
}
renderState.forEach(btn => {
  if (btn.state) {
    btn.pointer.classList.add('actions__btn--active');
  }
  btn.pointer.addEventListener('click', () => {
    renderState.forEach(other => {
      other.pointer.classList.remove('actions__btn--active');
      other.state = false;
    });
    btn.pointer.classList.add('actions__btn--active');
    btn.state = true;
    reRender();
  });
});

const selectAll = document.querySelector('.select-all');
selectAll.addEventListener('click', () => {
  let listDisplayed = currentList();
  if (listDisplayed.every(item => item.state === TASK_STATE.COMPLETED)) {
    listDisplayed.map(taskItem => taskItem.state = TASK_STATE.ACTIVE);
    reRender();
    return;
  } else {
    listDisplayed.map(taskItem => taskItem.state = TASK_STATE.COMPLETED)
  }
  reRender();
})
const form = document.querySelector('.todo__form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newTask = {
    title: form.newTask.value,
    state: TASK_STATE.ACTIVE,
    id: Math.random().toString(),
    onSetState: setState,
    onDelete: deleteTask,
    onSetText: setInnerText
  };
  if (newTask.title.trim().length > 0) {
    dummyTask = [newTask, ...dummyTask];
    reRender();
    form.newTask.value = '';
  }
})
const tasksContainer = document.querySelector('.task-container');
const setState = (id) => {
  const current = dummyTask.findIndex(elem => elem.id === id);
  if (dummyTask[current].state === TASK_STATE.ACTIVE) {
    dummyTask[current].state = TASK_STATE.COMPLETED
  } else {
    dummyTask[current].state = TASK_STATE.ACTIVE
  }
  reRender();
};

deleteTask = (id) => {
  const current = dummyTask.findIndex(elem => elem.id === id);
  dummyTask.splice(current, 1);
  reRender();
}; 
// SET TEXT
setInnerText = (id, text, textTitle) => {
  const current = dummyTask.findIndex(elem => elem.id === id);
  var s = dummyTask[current].title;
  function keyPress(e) {
    if (e.key === "Escape") {
      console.log('asasasas');
      textTitle.innerHTML = `<div class="task__title task__title--completed">${s}</div>`; 
      document.removeEventListener('keydown', keyPress)
    }
  }; 
  textTitle.innerHTML = '<textarea class="form-control" id="newcont" rows="5">' + s + '</textarea>'
  console.log(textTitle.querySelector('#newcont'));
  const textArea = textTitle.querySelector('#newcont');
  textArea.addEventListener('focus', function () {
    console.log('in');
    document.addEventListener('keydown', keyPress)
  });
  textArea.addEventListener('blur', function () {
    dummyTask[current].title = textArea.value;
    console.log(dummyTask[current].title);
    textTitle.innerHTML = `<div class="task__title task__title--completed">${dummyTask[current].title}</div>`;
    if(dummyTask[current].title.trim().length === 0 ){
      dummyTask.splice(current, 1); 
    };
    reRender();
  });
}; 

const deleteCompleted = document.querySelector('.delete_completed');
const handlerDeleteCompleted = () => {
  dummyTask = dummyTask.filter(elem => elem.state !== TASK_STATE.COMPLETED);
  reRender();
};
deleteCompleted.addEventListener('click', handlerDeleteCompleted);

const totalTask = document.querySelector('.total');

//RENDERING_STUFF
const reRender = () => {
  let displayedArray = currentList();
  tasksContainer.innerHTML = '';
  displayedArray.forEach(item => tasksContainer.appendChild(task(item)));
  totalTask.innerText = dummyTask.filter(item => item.state === TASK_STATE.ACTIVE).length;
  if (dummyTask.filter(item => item.state === TASK_STATE.COMPLETED).length > 0) {
    deleteCompleted.classList.remove('hidden');
  } else {
    deleteCompleted.classList.add('hidden');
  };
  if (dummyTask.length > 0) {
    selectAll.classList.remove('hidden');
    actions.classList.remove('hidden');
  } else {
    actions.classList.add('hidden');
    selectAll.classList.add('hidden');
  }
}
reRender();