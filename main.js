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

function restoreTasks() {
  taskCollection = JSON.parse(localStorage.getItem("tasks")) || [];
}

// function displayIdeas(listInstance) {
//   var noteCard = `
//     <div class="card" data-id="${listInstance.id}">
//         <section class="cards__top card--section">
//           <div class="cards__top--left" alt="star-rating"></div>
//           <div class="cards__top--right" alt="delete-X"></div>
//         </section>
//         <section class="cards__middle card--section">
//           <h3 class="cards__middle--title" id="editable-title" contenteditable="true">${listInstance.title}</h3>
//           <p class="cards__middle--text" id="editable-body" contenteditable="true">${listInstance.task}</p>
//         </section>
//         <section class="cards__bottom card--section">
//           <img class="cards__bottom--left" src="images/upvote.svg">
//           <p class="cards__bottom--text">Quality: ${listInstance}</p>
//           <img class="cards__bottom--right" src="images/downvote.svg">
//         </section>
//       </div>`;
//   .insertAdjacentHTML('afterbegin', noteCard)
//   hidePrompt();
//   clearTitleInput();
//   clearTaskInput();
// }
