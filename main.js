//Global variables
titleInput = element.querySelector(".sidebar__form1-title");
itemInput = element.querySelector(".sidebar__form1-item");
makeListButton = element.querySelector(".sidebar__form1-make");
clearAllButton = element.querySelector(".sidebar__form1-clear");
var taskCollection;

//Event Listeners
window.addEventListener('load', loadPage);

titleInput.addEventListener('keyup', enableListButton);
itemInput.addEventListener('keyup', enableListButton);

makeListButton.addEventListener('click', makeList)


//Function declarations
function loadPage() {
  makeListButton.disabled = true;
  enableListButton();
}

function enableListButton() {
    if (titleInput.value === "" || itemInput.value === "") {
        makeListButton.disabled = true;
    } else {
        makeListButton.disabled = false;
    }
}

function makeList() {

}