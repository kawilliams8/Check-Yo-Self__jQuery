//Global variables
titleInput = document.querySelector(".sidebar__form1-title");
sidebarItemList = document.querySelector(".sidebar__task-list")
itemInput = document.querySelector(".sidebar__form1-item");
sidebarTaskAdd = document.querySelector(".sidebar__form1-plus");
makeListButton = document.querySelector(".sidebar__form1-make");
clearAllButton = document.querySelector(".sidebar__form1-clear");
filterButton = document.querySelector(".sidebar__form1-filter")
listPrompt = document.querySelector(".note__listprompt");
fridge = document.querySelector(".fridge");
var taskCollection = [];

//Event Listeners
window.addEventListener('load', loadPage);
titleInput.addEventListener('keyup', enableMakeListButton);
itemInput.addEventListener('keyup', enableMakeListButton);
sidebarTaskAdd.addEventListener('click', addSidebarTask);
makeListButton.addEventListener('click', displayNotes);
clearAllButton.addEventListener('click', clearSidebar);

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

function hidePrompt() {
  if (taskCollection.length > 0) {
    listPrompt.classList.add("hidden");
  }
}

function showPrompt() {
  listPrompt.classList.remove("hidden");
}

function addSidebarTask() {
  var li = document.createElement("li");
  var img = `<img src="images/delete.svg alt="delete" height="16px" width="16px"`
  var task = document.createTextNode(itemInput.value);
  li.innerText = task.textContent;
  // sidebarItemList.addElement('beforeend', img)
  sidebarItemList.insertAdjacentElement('beforeend', li)
  clearTaskInput();
}

function clearSidebarList() {
  sidebarItemList.parentNode.removeChild(sidebarItemList);
}

function displayNotes(listInstance) {
  var noteCard = `
    <div class="note--urgent">
                <h2>Task Title</h2>
                <input type="checkbox">
                <label for="">${}</label>
                <div class="note__bottom--urgent">
                <img src="images/urgent.svg" alt="urgent indicator off" height="16px" width="16px>
                <p>URGENT</p>
                <img src="images/delete.svg" alt="delete icon" height="16px" width="16px>
                <p>DELETE</p>
                </div>
            </div>`;
  fridge.insertAdjacentHTML('afterbegin', noteCard)
  hidePrompt();
  clearTitleInput();
  clearTaskInput();
}
