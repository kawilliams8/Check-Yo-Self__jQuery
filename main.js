//Global variables
titleInput = document.querySelector(".sidebar__form1-title");
sidebarItemList = document.querySelector(".sidebar__task-list")
sidebarListItems = document.querySelector("sidebar__tasklist-item");
itemInput = document.querySelector(".sidebar__form1-item");
sidebarTaskAdd = document.querySelector(".sidebar__form1-plus");
makeListButton = document.querySelector(".sidebar__form1-make");
clearAllButton = document.querySelector(".sidebar__form1-clear");
filterButton = document.querySelector(".sidebar__form1-filter")
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
  // clearAllButton.disabled = true;
  // filterButton.disabled = true;
  reinstantiateToDos();
}

function displaySidebarTasks(e) {
  (e).preventDefault();
  var task = `
	  <div class="sidebar__task-list">
		  <img class="task-item__icon--delete" src="images/delete.svg">
		  <p class="task-item__text">${itemInput.value}</p>
	  </div>`;
  sidebarItemList.insertAdjacentHTML('beforeend', task);
  clearTaskInput();
}

function enableMakeListButton() {
  console.log(titleInput.value);
  console.log(itemInput.value);
  if (titleInput.value !== "" && itemInput.value !== "") {
    makeListButton.disabled = false;
  }
}

function enableClearAllButton() {

}

function clearSidebar() {
  clearTaskInput();
  clearTitleInput();
  clearSidebarList();
}

function clearTaskInput() {
  itemInput.value = "";
  makeListButton.disabled = true;
}

function clearTitleInput() {
  titleInput.value = "";
  makeListButton.disabled = true;
}

function clearSidebarList() {
  sidebarItemList.parentNode.removeChild(sidebarItemList);
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
  displayToDos(toDoInstance);
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