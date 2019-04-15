//Global variables
titleInput = document.querySelector("#sidebar__form1-title-input");
sidebarTaskList = document.querySelector(".sidebar__tasklist")
sidebarListItems = document.querySelector("sidebar__tasklist-item");
itemInput = document.querySelector("#sidebar__form1-item-input");
sidebarTaskAdd = document.querySelector(".sidebar__form1-plus");
makeListButton = document.querySelector(".sidebar__form1-make");
clearAllButton = document.querySelector(".sidebar__form1-clear");
filterButton = document.querySelector(".sidebar__form2-filter")
listPrompt = document.querySelector(".todo__listprompt");
fridge = document.querySelector(".fridge");

var toDoCollection = JSON.parse(localStorage.getItem("savedTodos")) || [];

//Event Listeners
window.addEventListener('load', loadPage);
titleInput.addEventListener('keyup', enableMakeListButton);
itemInput.addEventListener('keyup', enableMakeListButton);
sidebarTaskAdd.addEventListener('click', displaySidebarTasks);
makeListButton.addEventListener('click', addTaskToCollection);
clearAllButton.addEventListener('click', clearSidebar);
sidebarTaskList.addEventListener('click', deleteSidebarTasks);

//Page load and stored item reinstantiation functions

function loadPage() {
  makeListButton.disabled = true;
  clearAllButton.disabled = true;
  filterButton.disabled = true;
  reinstantiateToDos(toDoCollection);
  // displayToDos(toDoCollection);
}

function reinstantiateToDos(toDoCollection) {
  var newToDoInstances = toDoCollection.map(function (data) {
    var newData = new ToDo(data.id, data.title, data.task, data.urgent, data.completed);
    return newData;
  })
  displaySavedToDos(newToDoInstances);
}

function displaySavedToDos(newToDoInstances) {
  newToDoInstances.forEach(function (data) {
    displayToDos(data);
    // displayTaskList(data)
  });
}

//Sidebar display, button handling, and input clearing functions

function enableMakeListButton() {
  if (titleInput.value !== "" && sidebarTaskList.length === 0) {
    makeListButton.disabled = false;
  }
}

function displaySidebarTasks() {
  if (itemInput.value === "") {
    return;
  } else {
    // (e).preventDefault();
    sidebarTaskList.innerHTML += `
	  <div class="sidebar__tasklist-insert">
		  <img class="task-item__icon-delete" src="images/delete.svg">
		  <p class="task-item__text" data-id=${Date.now()}>${itemInput.value}</p>
    </div>`;
    clearTaskInput();
  }
}

function deleteSidebarTasks(e) {
  e.target.closest("div").remove();
}

function clearSidebar() {
  clearTitleInput();
  clearTaskInput();
  clearSidebarList();
}

function clearTitleInput() {
  titleInput.value = "";
  // makeListButton.disabled = true;
}

function clearTaskInput() {
  itemInput.value = "";
  // makeListButton.disabled = true;
}

function clearSidebarList() {
  sidebarTaskList.parentNode.removeChild(sidebarTaskList);
}

//Fridge prompt hide/show functions

function hidePrompt() {
  if (toDoCollection.length > 0) {
    listPrompt.classList.add("hidden");
  }
}

function showPrompt() {
  listPrompt.classList.remove("hidden");
}

//Fridge card display, instantiation and update functions

function addTaskToCollection(newTask) {
  var secondTaskArray = [];
  var newTaskArray = document.querySelectorAll(".task-item__text");
  for (i = 0; i < newTaskArray.length; i++) {
    var taskObj = {
      text: newTaskArray[i].innerText,
      id: newTaskArray[i].dataset.id,
      checked: false
    }
  secondTaskArray.push(taskObj);
  }
  instantiateToDo(secondTaskArray);
}

function instantiateToDo(secondTaskArray) {
  var toDoInstance = new ToDo(Date.now(), titleInput.value, secondTaskArray);
  console.log(toDoInstance);
  toDoCollection.push(toDoInstance);
  toDoInstance.saveToStorage(toDoCollection);
  clearSidebar();
  displayToDos(toDoInstance);
  clearAllButton.disabled = false;
}

function displayToDos(toDoInstance) {
  hidePrompt();
  console.log('toDoInstance', toDoInstance);
  var toDoCard = `
    <div class="todo__card todo__card-regular" data-id=${toDoInstance.id}>
        <h2 class="todo__top">${toDoInstance.title}</h2>
        <section class="todo__middle">
        ${collectTaskList(toDoInstance)};
        </section>
        <section class="todo__bottom">
          <article class="card-bottom-left">
            <img class="todo__bottom-urgent" src="images/urgent.svg" alt="urgent">
            <p class="todo__bottom-urgent">URGENT</p>
          </article>
          <article class="card-bottom-right">
            <img class="todo__bottom-delete" src="images/delete.svg" alt="delete">
            <p class="todo__bottom-delete">DELETE</p>
          </article>
        </section>
    </div>`;
  fridge.insertAdjacentHTML('beforeend', toDoCard);
  // displayTaskList(toDoInstance.task);
  // collectTaskList(toDoInstance, toDoCard);
}

function collectTaskList(toDoInstance, toDoCard) {
  var cardTasks = "";
  toDoInstance.task.forEach(function (data) {
   cardTasks += `
    <div class="todo__middle">
				<img class="todo__middle-checkbox" src="images/checkbox.svg">
				<p class="todo__middle-text">${data.text}</p>
		</div>`
  })
  return cardTasks;
}

// Editing the To Do lists on the Fridge