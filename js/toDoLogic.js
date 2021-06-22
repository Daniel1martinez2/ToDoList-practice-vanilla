const TASK_STATE = {
  COMPLETED: 'completed',
  ACTIVE: 'active'
}
const filtersBtn = document.querySelectorAll('.actions__btn');
const renderState = [
  {id: 'all', state: true, pointer: filtersBtn[0]},
  {id: 'active', state: false, pointer: filtersBtn[1]},
  {id: 'completed', state: false, pointer: filtersBtn[2]},
]; 
renderState.forEach(btn => {
  if(btn.state){
    btn.pointer.classList.add('actions__btn--active'); 
  }
  btn.pointer.addEventListener('click',()=>{
    renderState.forEach(other => {
      other.pointer.classList.remove('actions__btn--active');
      other.state = false; 
    });
    btn.pointer.classList.add('actions__btn--active'); 
    btn.state= true; 
    reRender(); 
  }); 
})



const selectAll = document.querySelector('.select-all');
selectAll.addEventListener('click', ()=>{
  if(dummyTask.every(item=> item.state === TASK_STATE.COMPLETED)){
    dummyTask.map(taskItem => taskItem.state = TASK_STATE.ACTIVE);
    reRender();
    return; 
  }else {
    dummyTask.map(taskItem => taskItem.state = TASK_STATE.COMPLETED) 
  }
  reRender();
})
const form = document.querySelector('.todo__form');
form.addEventListener('submit', (event)=>{
  event.preventDefault();
  console.log(form.newTask.value);
  const newTask = {
    title: form.newTask.value, 
    state: TASK_STATE.ACTIVE, 
    id: Math.random().toString(), 
    onSetState: setState, 
    onDelete: deleteTask, 
    onSetText: setInnerText
  }; 
  console.log('🔥', form.newTask.value);
  dummyTask = [newTask, ...dummyTask] ; 
  reRender(); 
  form.newTask.value = ''; 
})
const tasksContainer = document.querySelector('.task-container');

const setState = (id) => {
  const current = dummyTask.findIndex(elem => elem.id === id); 
  if(dummyTask[current].state === TASK_STATE.ACTIVE){
    dummyTask[current].state= TASK_STATE.COMPLETED
  }else{
    dummyTask[current].state= TASK_STATE.ACTIVE
  }
  reRender(); 
}; 

deleteTask = (id) => {
  const current = dummyTask.findIndex(elem => elem.id === id); 
  dummyTask.splice(current, 1); 
  reRender(); 
} 

setInnerText = (id, text) => {
  const current = dummyTask.findIndex(elem => elem.id === id); 
  dummyTask[current].title = text; 
  console.log(text);
}
let dummyTask = [
  {title: 'lorem1', state: TASK_STATE.ACTIVE, id: 1, onSetState: setState, onDelete: deleteTask, onSetText: setInnerText},
  {title: 'lorem2', state: TASK_STATE.ACTIVE, id: 2, onSetState: setState, onDelete: deleteTask, onSetText: setInnerText},
  {title: 'lorem3', state: TASK_STATE.ACTIVE, id: 3, onSetState: setState, onDelete: deleteTask, onSetText: setInnerText},
  {title: 'lorem4', state: TASK_STATE.ACTIVE, id: 4, onSetState: setState, onDelete: deleteTask, onSetText: setInnerText},
]; 
const totalTask = document.querySelector('.total'); 
//RENDERING_STUFF
const reRender = () => {
  let displayedArray = dummyTask; 
  if(renderState[0].state){
    displayedArray = dummyTask; 
  }else if (renderState[1].state){
    displayedArray = dummyTask.filter(taskItem => taskItem.state === TASK_STATE.ACTIVE); 
  }else{
    displayedArray = dummyTask.filter(taskItem => taskItem.state === TASK_STATE.COMPLETED); 
  }
  tasksContainer.innerHTML=''; 
  displayedArray.forEach(item => tasksContainer.appendChild(task(item)) ); 
  console.log(displayedArray);
  totalTask.innerText = dummyTask.length;
}
reRender(); 