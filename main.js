titleInput = document.querySelector("#sidebar__form1-title-input");
sidebarTaskList = document.querySelector(".sidebar__tasklist")
sidebarListItems = document.querySelector(".sidebar__tasklist-insert");
itemInput = document.querySelector("#sidebar__form1-item-input");
sidebarTaskAdd = document.querySelector(".sidebar__form1-plus");
makeListButton = document.querySelector(".sidebar__form1-make");
clearAllButton = document.querySelector(".sidebar__form1-clear");
filterButton = document.querySelector(".sidebar__form2-filter")
listPrompt = document.querySelector(".todo__listprompt");
fridge = document.querySelector(".fridge");

var toDoCollection = JSON.parse(localStorage.getItem("savedTodos")) || [];

window.addEventListener('load', loadPage);
sidebarTaskAdd.addEventListener('click', displaySidebarTasks);
makeListButton.addEventListener('click', addTaskToCollection);
clearAllButton.addEventListener('click', clearSidebar);
sidebarTaskList.addEventListener('click', deleteSidebarTasks);
fridge.addEventListener('click', deleteDisplayedCards);

function loadPage() {
  makeListButton.disabled = true;
  clearAllButton.disabled = true;
  filterButton.disabled = true;
  reinstantiateToDos(toDoCollection);
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
  });
}

function displayToDos(toDoInstance) {
  hidePrompt();
  var toDoCard = `
    <div class="todo__card todo__card-regular" data-id=${toDoInstance.id}>
        <h2 class="todo__top">${toDoInstance.title}</h2>
        <section class="todo__middle-display">
        ${collectTaskList(toDoInstance)}
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
  fridge.insertAdjacentHTML('afterbegin', toDoCard);
}

function collectTaskList(toDoInstance, toDoCard) {
  var cardTasks = "";
  toDoInstance.task.forEach(function (data) {
    cardTasks += `
    <div class="todo__middle-div">
				<img class="todo__middle-checkbox" src="images/checkbox.svg">
				<p class="todo__middle-text">${data.text}</p>
		</div>`
  })
  return cardTasks;
}

function displaySidebarTasks() {
  sidebarTaskList.innerHTML += `
	  <div class="sidebar__tasklist-insert">
		  <img class="task-item__icon-delete" src="images/delete.svg">
		  <p class="task-item__text" data-id=${Date.now()}>${itemInput.value}</p>
    </div>`;
  clearTaskInput();
  makeListButton.disabled = false;
  clearAllButton.disabled = false;
}

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
  toDoCollection.push(toDoInstance);
  toDoInstance.saveToStorage(toDoCollection);
  displayToDos(toDoInstance);
  makeListButton.disabled = true;
}

function clearSidebar() {
  clearTitleInput();
  clearSidebarList();
}

function clearTitleInput() {
  titleInput.value = "";
  clearAllButton.disabled = true;
}

function clearTaskInput() {
  itemInput.value = "";
}

function clearSidebarList() {
  sidebarTaskList.innerHTML = "";
}

function deleteSidebarTasks(e) {
  e.target.closest("div").remove();
}

function hidePrompt() {
  if (toDoCollection.length > 0) {
    listPrompt.classList.add("hidden");
  }
}

function showPrompt() {
  listPrompt.classList.remove("hidden");
}

function deleteDisplayedCards(e) {
  //Delete from DOM working, delete from storage method not working
  if (e.target.className === "todo__bottom-delete") {
    e.target.closest('.todo__card').remove();
    var targetId = parseInt(e.target.closest('.todo__card').dataset.id);
    let foundObj = toDoCollection.find(function (foundObj) {
      console.log(foundObj.id);
      console.log(targetId);
      foundObj.id === targetId
      foundObj.deleteFromStorage();
    })
    
    showPrompt();
  }
}