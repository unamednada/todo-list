const listaDeTarefas = document.querySelector('#lista-tarefas');
const createTask = document.querySelector('#criar-tarefa');

function addTaskToList() {
  const task = document.createElement('li');
  const input = document.querySelector('#texto-tarefa');
  task.innerText = input.value;
  task.classList.add('item-tarefa');
  listaDeTarefas.appendChild(task);
  input.value = null;
}

createTask.addEventListener('click', addTaskToList);

function clearTask() {
  const items = Array.from(document.querySelectorAll('.item-tarefa'));
  for (let i = 0; i < items.length; i += 1) {
    items[i].classList.remove('selected');
  }
}

function selectTask(event) {
  clearTask();
  const selectedTask = event.target;
  selectedTask.classList.add('selected');
}

listaDeTarefas.addEventListener('click', selectTask);

function completeTask(event) {
  const completedTask = event.target;
  if ((Array.from(completedTask.classList)).includes('completed')) {
    completedTask.classList.remove('completed');
  } else {
    completedTask.classList.add('completed');
  }
}

listaDeTarefas.addEventListener('dblclick', completeTask);

function clearAllTasks() {
  listaDeTarefas.innerHTML = '';
}

const clearAll = document.querySelector('#apaga-tudo');
clearAll.addEventListener('click', clearAllTasks);

function clearDone() {
  const tasks = Array.from(listaDeTarefas.children);
  for (let i = 0; i < tasks.length; i += 1) {
    if ((Array.from(tasks[i].classList)).includes('completed')) {
      listaDeTarefas.removeChild(tasks[i]);
    }
  }
}

const clearDoneButton = document.querySelector('#remover-finalizados');

clearDoneButton.addEventListener('click', clearDone);

const saveTaskList = document.querySelector('#salvar-tarefas');
const taskKey = 'tarefas-salvas';
function saveTasks() {
  const taskArray = Array.from(listaDeTarefas.children);
  const saveArray = {};
  for (let i = 0; i < taskArray.length; i += 1) {
    saveArray[taskArray[i].innerText] = false;
    if ((Array.from(taskArray[i].classList)).includes('completed')) {
      saveArray[taskArray[i].innerText] = true;
    }
  }
  localStorage.setItem(taskKey, JSON.stringify(saveArray));
}

saveTaskList.addEventListener('click', saveTasks);

function getTasksList() {
  const savedTasks = JSON.parse(localStorage.getItem(taskKey));
  const tasks = Object.keys(savedTasks);
  for (let i = 0; i < tasks.length; i += 1) {
    const task = document.createElement('li');
    task.innerText = tasks[i];
    task.classList.add('item-tarefa');
    if (savedTasks[tasks[i]] === true) {
      task.classList.add('completed');
    }
    listaDeTarefas.appendChild(task);
  }
}

if (JSON.parse(localStorage.getItem(taskKey))) {
  window.onload = getTasksList;
}

const up = document.querySelector('#mover-cima');
const down = document.querySelector('#mover-baixo');

// Inspiração para moveup e movedown: https://stackoverflow.com/questions/46724542/javascript-move-elements-up-and-down-in-the-list

function moveUp() {
  const selected = document.querySelector('.selected');
  if (selected && selected.previousElementSibling) {
    const sibling = document.querySelector('.selected').previousElementSibling;
    selected.parentElement.insertBefore(selected, sibling);
  }
}

function moveDown() {
  const selected = document.querySelector('.selected');
  if (selected && selected.nextElementSibling) {
    const sibling = document.querySelector('.selected').nextElementSibling;
    selected.parentElement.insertBefore(sibling, selected);
  }
}

down.addEventListener('click', moveDown);
up.addEventListener('click', moveUp);

const removeSelected = document.querySelector('#remover-selecionado');

function deleteSelected() {
  const selected = document.querySelector('.selected');
  listaDeTarefas.removeChild(selected);
}

removeSelected.addEventListener('click', deleteSelected);
