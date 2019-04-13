//Global variables
titleInput = document.querySelector(".sidebar__form1-title");
itemInput = document.querySelector(".sidebar__form1-item");
makeListButton = document.querySelector(".sidebar__form1-make");
clearAllButton = document.querySelector(".sidebar__form1-clear");
sidebarItemList = document.querySelector(".sidebar__tasklist-item");
var taskCollection = [];

//Event Listeners
window.addEventListener('load', loadPage);
titleInput.addEventListener('keyup', enableMakeListButton);
itemInput.addEventListener('keyup', enableMakeListButton);
makeListButton.addEventListener('click', addSidebarTask);

//Function declarations
function loadPage() {
  makeListButton.disabled = true;
  restoreTasks();
  restoreMethods();
}

function enableMakeListButton() {
  if (titleInput.value !== "" && itemInput.value !== "") {
    makeListButton.disabled = false;
  }
}

function clearTaskInput() {
  itemInput.value = "";
  saveButton.disabled = true;
}

function clearTitleInput() {
  titleInput.value = "";
  saveButton.disabled = true;
}

function addSidebarTask() {

  var li = document.createElement("li");
  var task = document.createTextNode(itemInput.value);
  li.innerText = task.textContent;
  sidebarItemList.insertAdjacentElement('beforeend', li)

  clearTaskInput();
}

