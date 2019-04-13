//Global variables
titleInput = document.querySelector(".sidebar__form1-title");
itemInput = document.querySelector(".sidebar__form1-item");
makeListButton = document.querySelector(".sidebar__form1-make");
clearAllButton = document.querySelector(".sidebar__form1-clear");
filterButton = document.querySelector(".sidebar__form1-filter")
sidebarItemList = document.querySelector(".sidebar__tasklist-item");
fridge = document.querySelector(".fridge");
var taskCollection = [];

//Event Listeners
window.addEventListener('load', loadPage);
titleInput.addEventListener('keyup', enableMakeListButton);
itemInput.addEventListener('keyup', enableMakeListButton);
makeListButton.addEventListener('click', addSidebarTask);

//Function declarations
function loadPage() {
  makeListButton.disabled = true;
  clearAllButton.disabled = true;
  filterButton.disabled = true;
  restoreTasks();
  // restoreMethods();
}

function restoreTasks() {
  taskCollection = JSON.parse(localStorage.getItem("tasks")) || [];
}

function enableMakeListButton() {
  if (titleInput.value !== "" && itemInput.value !== "") {
    makeListButton.disabled = false;
  }
}

function clearTaskInput() {
  itemInput.value = "";
  makeListButton.disabled = true;
}

function clearTitleInput() {
  titleInput.value = "";
  makeListButton.disabled = true;
}

function hidePrompt() {
  if (taskCollection.length > 0) {
    prompt.classList.add("hidden");
  }
}

function showPrompt() {
  prompt.classList.remove("hidden");
}

function addSidebarTask() {
  var li = document.createElement("li");
  var task = document.createTextNode(itemInput.value);
  li.innerText = task.textContent;
  sidebarItemList.insertAdjacentElement('beforeend', li)
  clearTaskInput();
}



function displayNotes(listInstance) {
  var noteCard = `
    <div class="note--urgent">
                <h2>Task Title</h2>
                <input type="checkbox" id="checkbox--1">
                <label for="checkbox--1">Don't ever play yourself.</label>
                <input type="checkbox" id="checkbox--1">
                <label>Every chance I get, I water the plants.</label>
                <input type="checkbox" id="checkbox--1">
                <label>Lion! Cloth talk.</label>
                <div class="note__bottom--urgent"></div>
            </div>`;
  fridge.insertAdjacentHTML('afterbegin', noteCard)
  hidePrompt();
  clearTitleInput();
  clearTaskInput();
}
