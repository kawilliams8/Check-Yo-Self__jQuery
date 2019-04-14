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
makeListButton.addEventListener('click', instantiateToDo);
clearAllButton.addEventListener('click', clearSidebar);

//Function declarations
function loadPage() {
  makeListButton.disabled = true;
  clearAllButton.disabled = true;
  filterButton.disabled = true;
  reinstantiateToDos();
}

function displaySidebarTasks(e) {
  if (itemInput.value === "") {
    return;
  } else {
  (e).preventDefault();
  var task = `
	  <div class="sidebar__tasklist-insert">
		  <img class="task-item__icon-delete" src="images/delete.svg">
		  <p class="task-item__text">${itemInput.value}</p>
	  </div>`;
  sidebarTaskList.insertAdjacentHTML('afterbegin', task);
  clearTaskInput();
  }
}

function enableMakeListButton() {
  if (titleInput.value !== "" && itemInput.value !== "") {
    makeListButton.disabled = false;
  }
}

function clearSidebar() {
  clearTitleInput();
  clearTaskInput();
  clearSidebarList();
}

function clearTitleInput() {
  titleInput.value = "";
  makeListButton.disabled = true;
}

function clearTaskInput() {
  itemInput.value = "";
  makeListButton.disabled = true;
}

function clearSidebarList() {
  sidebarTaskList.parentNode.removeChild(sidebarTaskList);
}

function hidePrompt() {
  if (toDoCollection.length > 0) {
    listPrompt.classList.add("hidden");
  }
}

function showPrompt() {
  listPrompt.classList.remove("hidden");
}

function reinstantiateToDos() {
  var oldToDoCollection = toDoCollection;
  var newToDoInstances = oldToDoCollection.map(function(data) {
    data = new ToDo (data.id, data.title, data.task, data.urgent);
    return data;
  })
  toDoCollection = newToDoInstances;
  displaySavedToDos(toDoCollection);
}

function displaySavedToDos(toDoCollection) {
  toDoCollection.forEach(function(data) {
    displayToDos(data);
  });
}

function instantiateToDo() {
  var toDoInstance = new ToDo(Date.now(), titleInput.value, itemInput.value, false);
  toDoCollection.push(toDoInstance);
  toDoInstance.saveToStorage(toDoCollection);
  clearSidebar();
  displayToDos(toDoInstance);
  clearAllButton.disabled = false;
}

function displayToDos(toDoInstance) {
  hidePrompt();
  var toDoCard = `
    <div class="todo__card todo__card-regular" data-id=${toDoInstance.id}>
        <h2 class="todo__top">${toDoInstance.title}</h2>
        <section class="todo__middle">
        </section>
        <section class="todo__bottom">
            <img class="todo__bottom-urgent" src="images/urgent.svg" alt="urgent">
            <img class="todo__bottom-delete" src="images/delete.svg" alt="delete">
            <p class="todo__bottom-urgent">URGENT</p>
            <P class="todo__bottom-delete">DELETE</P>
        </section>
    </div>`;
  fridge.insertAdjacentHTML('beforeend', toDoCard);
  toDoInstance.task.forEach(function(data) {
    document.querySelector(".todo__middle").insertAdjacentHTML('beforeend', `
    <div class="todo__middle">
				<img class="todo__middle-checkbox" src="images/checkbox.svg">
				<p class="todo__middle-text">${data.content}</p>
			</div>
    `)
  })
  clearTitleInput();
  clearTaskInput();
}