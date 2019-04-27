// titleInput = document.querySelector("#sidebar__form1-title-input");
// sidebarTaskList = document.querySelector(".sidebar__tasklist")
// sidebarListItems = document.querySelector(".sidebar__tasklist-insert");
// itemInput = document.querySelector("#sidebar__form1-item-input");
// sidebarTaskAdd = document.querySelector(".sidebar__form1-plus");
// makeListButton = document.querySelector(".sidebar__form1-make");
// clearAllButton = document.querySelector(".sidebar__form1-clear");
// filterButton = document.querySelector(".sidebar__form2-filter")
// listPrompt = document.querySelector(".todo__listprompt");
// cardarea = document.querySelector(".cardarea");
// searchInput = document.querySelector(".header__search-input");
// titleSearch = document.querySelectorAll(".todo__top");

// var toDoCollection = JSON.parse(localStorage.getItem("savedTodos")) || [];

// window.addEventListener('load', loadPage);
// sidebarTaskAdd.addEventListener('click', displaySidebarTasks);
// makeListButton.addEventListener('click', addTaskToCollection);
// clearAllButton.addEventListener('click', clearSidebar);
// sidebarTaskList.addEventListener('click', deleteSidebarTasks);
// cardarea.addEventListener('click', cardButtons);
// searchInput.addEventListener('keyup', searchToDosTitles);

// function loadPage() {
//   makeListButton.disabled = true;
//   clearAllButton.disabled = true;
//   filterButton.disabled = true;
//   reinstantiateToDos(toDoCollection);
// }

// function reinstantiateToDos(toDoCollection) {
//   var newToDoInstances = toDoCollection.map(function (data) {
//     var newData = new ToDo(data.id, data.title, data.task, data.urgent, data.completed);
//     return newData;
//   })
//   displaySavedToDos(newToDoInstances);
// }

// function searchToDosTitles(e) {
//   e.preventDefault();
//   var searchText = searchInput.value.toLowerCase();
//   var searchOutput = toDoCollection.filter(card => card.title.toLowerCase().includes(searchText));
//   cardarea.innerHTML = "";
//   searchOutput.forEach(toDo => displayToDos(toDo));
// }

// function displaySavedToDos(newToDoInstances) {
//   newToDoInstances.forEach(function (data) {
//     displayToDos(data);
//   });
// }

// function displayToDos(toDoInstance) {
//   hidePrompt();
//   var toDoCard = `
//     <div class="todo__card todo__card-regular" data-id=${toDoInstance.id}>
//         <h2 class="todo__top">${toDoInstance.title}</h2>
//         <section class="todo__middle-display">
//         ${collectTaskList(toDoInstance)}
//         </section>
//         <section class="todo__bottom">
//           <article class="card-bottom-urgent">
//             <img class="todo__update-img" src="images/urgent.svg" alt="urgent">
//             <p class="todo__urgent-p todo__bottom-style ">URGENT</p>
//           </article>
//           <article class="card-bottom-delete">
//             <img class="todo__delete-img" src="images/delete.svg" alt="delete">
//             <p class="todo__delete-p todo__bottom-style">DELETE</p>
//           </article>
//         </section>
//     </div>`;
//   cardarea.insertAdjacentHTML('afterbegin', toDoCard);
// }

// function hidePrompt() {
//   if (toDoCollection.length > 0) {
//     listPrompt.classList.add("hidden");
//   }
// }

// function collectTaskList(toDoInstance, toDoCard) {
//   var cardTasks = "";
//   toDoInstance.task.forEach(function (data) {
//     cardTasks += `
//     <div class="todo__middle-div" data-id=${data.id}>
// 				<img class="todo__middle-checkbox" src="images/checkbox.svg">
// 				<p class="todo__middle-text">${data.text}</p>
// 		</div>`
//   })
//   return cardTasks;
// }

// function displaySidebarTasks() {
//   sidebarTaskList.innerHTML += `
// 	  <div class="sidebar__tasklist-insert">
// 		  <img class="task-item__icon-delete" src="images/delete.svg">
// 		  <p class="task-item__text" data-id=${Date.now()}>${itemInput.value}</p>
//     </div>`;
//   clearTaskInput();
//   makeListButton.disabled = false;
//   clearAllButton.disabled = false;
// }

// function clearTaskInput() {
//   itemInput.value = "";
// }

// function addTaskToCollection(newTask) {
//   var secondTaskArray = [];
//   var newTaskArray = document.querySelectorAll(".task-item__text");
//   for (i = 0; i < newTaskArray.length; i++) {
//     var taskObj = {
//       text: newTaskArray[i].innerText,
//       id: newTaskArray[i].dataset.id,
//       checked: false
//     }
//     secondTaskArray.push(taskObj);
//   }
//   instantiateToDo(secondTaskArray);
// }

// function instantiateToDo(secondTaskArray) {
//   var toDoInstance = new ToDo(Date.now(), titleInput.value, secondTaskArray);
//   toDoCollection.push(toDoInstance);
//   toDoInstance.saveToStorage(toDoCollection);
//   displayToDos(toDoInstance);
//   makeListButton.disabled = true;
// }

// function clearSidebar() {
//   clearTitleInput();
//   clearSidebarList();
// }

// function clearTitleInput() {
//   titleInput.value = "";
//   clearAllButton.disabled = true;
// }

// function clearSidebarList() {
//   sidebarTaskList.innerHTML = "";
// }

// function deleteSidebarTasks(e) {
//   e.target.closest("div").remove();
// }

// // Card update Click Functions

// function cardButtons(e) {
//   var parentCard = e.target.parentNode.parentNode.parentNode.dataset.id;
//   console.log(e.target);
//   if (e.target.className === 'todo__update-img') {
//     console.log('update')
//     updateToUrgent(e);
//   }
//   if (e.target.className === 'todo__delete-img') {
//     console.log('delete')
//     deleteDisplayedCards(parentCard, e);
//   }
//   if (e.target.className === 'todo__middle-checkbox') {
//     console.log('checkoff')
//     checkOffATask(parentCard, e);
//   }
// }

// function updateToUrgent(e) {
//   var currentTodoId = e.target.closest('.todo__card').dataset.id;
//   var todo = toDoCollection.find(todo => todo.id === parseInt(currentTodoId));
//   var urgentToggle = todo.urgent = !todo.urgent;
//   console.log('update function working', todo)
//   if (todo.urgent) {
//     updateButton(e);
//     // savetoStorage();
//   }
//   console.log('inside if statement');
//   return urgentToggle;
// }

// function updateButton(e) {
//   console.log(e.target.parentNode.childNodes[3])
//   var paragraph = e.target.parentNode.childNodes[3];
//   var image = e.target.parentNode.childNodes[1];
//   console.log("image el:", image);
//   console.log('paragraph el:', paragraph);

//   //update paragraph classes for text color:
//   if (paragraph.classList.contains('todo__urgent-p')) {
//     paragraph.classList.add("todo__bottom-urgent")
//     paragraph.classList.remove("todo__bottom-style")
//   } else {
//     paragraph.classList.add("todo__bottom-style");
//     paragraph.classList.remove("todo__bottom-urgent");
//   }

//   //update image classes for image toggle:
//   if (image.classList.contains('todo__update-img')) {
//     image.setAttribute('src', "images/urgent-active.svg");
//   } else {
//     image.setAttribute('src', "images/urgent.svg");
//   }
//   //Need functionality to add class that toggles urgent card styling
// }


// // function storeUrgentCard(index) {
// //   var card = toDoCollection[index];
// //   card.updateToDo();
// //   cardarea.innerHTML = '';
// //   reinstantiateToDos(toDoCollection);
// // }

// // var button = e.target.closest('.card-bottom-urgent');
// // var parentCard = parentCard;
// // var matchingCard = toDoCollection.find(toDoCard => toDoCard.id == parentCard);
// // console.log('the clicked card:', matchingCard);
// // // console.log("e.target.etc:", e.target.parentNode.parentNode.parentNode);
// // // var cardBottom = e.target.parentNode.parentNode.parentNode;
// // var urgentButton = matchingCard.closest('.todo__bottom');
// // // console.log("inside urgent");
// // // var cardContainer = e.target.parentNode.parentNode.parentNode;
// // // var def = cardContainer.matches(".todo__card");
// // urgentButton.classList.add("todo__bottom-urgent");
// // matchingCard.classList.add("todo__card-urgent");
// // // var index = findCardIndex(card);
// // // storeUrgentCard();

// function deleteDisplayedCards(e) {
//   // this function needs to be unavailable(button is disabled) until all tasks on the list are checked
//   // need function to check for this.checked of ALL task items
//   // it it returns true, then delete button .disabled = false;
//   if (e.target.className === "todo__bottom-delete") {
//     e.target.closest('.todo__card').remove();
//     var targetId = parseInt(e.target.closest('.todo__card').dataset.id);
//     let foundObj = toDoCollection.find(function (foundObj) {
//       foundObj.id === targetId
//       foundObj.deleteFromStorage();
//     })

//     showPrompt();
//   }
// }

// function showPrompt() {
//   listPrompt.classList.remove("hidden");
// }

// function checkOffATask(parentCard, e) {
//   var currentTaskId = e.target.closest(".todo__middle-div").dataset.id;
//   var currentTodoId = e.target.closest('.todo__card').dataset.id;
//   var todo = toDoCollection.find(todo => todo.id === parseInt(currentTodoId));
//   console.log('todo', todo)
//   var task = todo.task.find(t => t.id === currentTaskId);
//   console.log('task', task)
//   if (task.id) {
//     task.checked = !task.checked;
//     //  return task;
//   }
//   console.log("task after if: ", task);
//   addCheckMark(task.checked, e);
//   savetoStorage();
// }

// function addCheckMark(task, e) {
//   console.log("task.checked: ", task);
//   if (task.checked) {
//     //Need to target innerHTML to switch checkmark image
//     image.setAttribute('src', "images/checkbox-active.svg");
//   } else {
//     image.setAttribute('src', "images/checkbox.svg");
//   }

//   // Can also use ternary in the appended card
//   // if task.checked ? display src="checkbox-active.svg" : display src="checkbox.svg"

//   //   if (task.checked) {
//   //     .innerHTML = "",
//   //     += `
//   //   <div class="todo__middle-div" data-id=${data.id}>
//   // 			<img class="todo__middle-checkbox" src="images/checkbox-active.svg">
//   // 			<p class="todo__middle-text">${data.text}</p>
//   // 	</div>`
//   //   }
// }

// // function findItemIndex(toDoObject, parentCard) {
// //   return toDoObject.task.findIndex(function (item) {
// //     return item.id == taskId;
// //   });
// // }

// // function findCardIndex(card) {
// //   var cardId = card.dataset.id;
// //   console.log("cardId in findCardIndex: ", cardId);
// //   return toDoCollection.findIndex(function (item) {
// //     return item.id == cardId;
// //   });
// // }










// JQUERY REFACTOR //
// Goals: jQuery, switch statements, DRY up code, replace for loops with .forEach(), ES6 arrow functions, play with linter

//GLOBAL VARIABLES
var $titleInput = $("#sidebar__form1-title-input");
var $sidebarTaskList = $(".sidebar__tasklist")
var $sidebarListItems = $(".sidebar__tasklist-insert");
var $itemInput = $("#sidebar__form1-item-input");
var $sidebarTaskAdd = $(".sidebar__form1-plus");
var $makeListButton = $(".sidebar__form1-make");
var $clearAllButton = $(".sidebar__form1-clear");
var $filterButton = $(".sidebar__form2-filter")
var $listPrompt = $(".todo__listprompt");
var $cardArea = $(".card__area");
var $searchInput = $(".header__search-input");
var $titleSearch = $(".todo__top");

var toDoCollection = JSON.parse(localStorage.getItem("savedTodos")) || [];


$(document).ready(function() {
loadPage();

//EVENT LISTENERS
$sidebarTaskAdd.on('click', displaySidebarTasks);
$makeListButton.on('click', addTaskToCollection);
$clearAllButton.on('click', clearSidebar);
$sidebarTaskList.on('click', deleteSidebarTasks);
$cardArea.on('click', cardButtons);
$searchInput.on('keypress', searchToDosTitles);

//FUNCTIONS
function loadPage() {
  $makeListButton.prop("disabled", true);
  $clearAllButton.prop("disabled", true);
  $filterButton.prop("disabled", true);
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
          <article class="card-bottom-urgent">
            <img class="todo__update-img" src="images/urgent.svg" alt="urgent">
            <p class="todo__urgent-p todo__bottom-style ">URGENT</p>
          </article>
          <article class="card-bottom-delete">
            <img class="todo__delete-img" src="images/delete.svg" alt="delete">
            <p class="todo__delete-p todo__bottom-style">DELETE</p>
          </article>
        </section>
    </div>`;
  $cardArea.prepend(toDoCard);
}

function hidePrompt() {
  if (toDoCollection.length > 0) {
    $listPrompt.addClass("hidden");
  }
}

function collectTaskList(toDoInstance, toDoCard) {
  var cardTasks = "";
  toDoInstance.task.forEach(function (data) {
    cardTasks += `
    <div class="todo__middle-div" data-id=${data.id}>
				<img class="todo__middle-checkbox" src="images/checkbox.svg">
				<p class="todo__middle-text">${data.text}</p>
		</div>`
  })
  return cardTasks;
}

function displaySidebarTasks() {
  // Can only add one, had to remove += that added all tasks
  $sidebarTaskList.html(`
	  <div class="sidebar__tasklist-insert">
		  <img class="task-item__icon-delete" src="images/delete.svg">
		  <p class="task-item__text" data-id=${Date.now()}>${$itemInput.val()}</p>
    </div>`);
  clearTaskInput();
  $makeListButton.prop("disabled", false);
  $clearAllButton.prop("disabled", false);
}

function clearTaskInput() {
  $itemInput.val("");
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
  var toDoInstance = new ToDo(Date.now(), $titleInput.val(), secondTaskArray);
  toDoCollection.push(toDoInstance);
  toDoInstance.saveToStorage(toDoCollection);
  displayToDos(toDoInstance);
  $makeListButton.prop("disabled", true);
}

function clearSidebar() {
  clearTitleInput();
  clearSidebarList();
}

function clearTitleInput() {
  $titleInput.val("");
  $clearAllButton.prop("disabled", true);
}

function clearSidebarList() {
  $sidebarTaskList.html("");
}

function deleteSidebarTasks(e) {
  e.target.closest("div").remove();
}

  // CARD "CLICK TO UPDATE" FUNCTIONS //

function cardButtons (e) {
  // var parentCard = e.target.parentNode.parentNode.parentNode.dataset.id; //delete?
  var parentCard = (e.target).closest(".todo__card");
  var clickTarget = e.target.className;
  // console.log("vanilla parentCard", parentCard); //delete?
  // console.log("$parentCard", $parentCard);
  switch (clickTarget) {
    case 'todo__update-img':
      updateToUrgent(e);
      break;
    case 'todo__delete-img':
      deleteDisplayedCards(parentCard, e);
      break;
    case 'todo__middle-checkbox':
      checkOffATask(parentCard, e);
      break;
  };
};

function updateToUrgent(e) {
  var currentTodoId = e.target.closest('.todo__card').dataset.id;
  var todo = toDoCollection.find(todo => todo.id === parseInt(currentTodoId));
  var urgentToggle = todo.urgent = !todo.urgent;
  // console.log('update function working', todo)
  if (todo.urgent) {
    updateButton(e);
    // savetoStorage();
  }
  console.log('inside if statement');
  return urgentToggle;
}

function updateButton(e) {
  // console.log(e.target.parentNode.childNodes[3])
  // var urgentPara = e.target.parentNode.childNodes[3];
  var $urgentPara = $(e.target).next('p');
  // .parentNode.children[3];
  // console.log('update para element: ', urgentPara);
  console.log('$update $para $element:', $urgentPara);

  var $urgentImg = $(e.target).next('img');
  // .parentNode.childNodes[1];
  // console.log("update image element:", $urgentImg);

  //update paragraph classes for text color:
  if ($urgentPara.hasClass('todo__urgent-p')) {
    $urgentPara.addClass("todo__bottom-urgent")
    $urgentPara.removeClass("todo__bottom-style")
  } else {
    $urgentPara.addClass("todo__bottom-style");
    $urgentPara.removeClass("todo__bottom-urgent");
  }

  //update image classes for image toggle:
  if ($urgentImg.hasClass('todo__update-img')) {
    $urgentImg.attr('src', "images/urgent-active.svg");
  } else {
    $urgentImg.attr('src', "images/urgent.svg");
  }
  //Need functionality to add class that toggles urgent card styling
}

function storeUrgentCard(index) {
  var card = toDoCollection[index];
  card.updateToDo();
  $cardArea.HTML("");
  reinstantiateToDos(toDoCollection);
}

// var button = e.target.closest('.card-bottom-urgent');
// var parentCard = parentCard;
// var matchingCard = toDoCollection.find(toDoCard => toDoCard.id == parentCard);
// console.log('the clicked card:', matchingCard);
// // console.log("e.target.etc:", e.target.parentNode.parentNode.parentNode);
// // var cardBottom = e.target.parentNode.parentNode.parentNode;
// var urgentButton = matchingCard.closest('.todo__bottom');
// // console.log("inside urgent");
// // var cardContainer = e.target.parentNode.parentNode.parentNode;
// // var def = cardContainer.matches(".todo__card");
// urgentButton.addClass("todo__bottom-urgent");
// matchingCard.addClass("todo__card-urgent");
// // var index = findCardIndex(card);
// // storeUrgentCard();

function deleteDisplayedCards(parentCard, e) {
  // this function needs to be unavailable(button is disabled) until all tasks on the list are checked
  // need function to check for this.checked of ALL task items
  // it it returns true, then delete button .disabled = false;
  console.log(e.target.className);
  if (e.target.className === "todo__delete-img") {
    e.target.closest('.todo__card').remove();
    var targetId = parseInt(e.target.closest('.todo__card').dataset.id);
    let foundObj = toDoCollection.find(function (foundObj) {
      foundObj.id === targetId;
      foundObj.deleteFromStorage();
    })

    showPrompt();
  }
}

function showPrompt() {
  $listPrompt.removeClass("hidden");
}

function checkOffATask(parentCard, e) {
  var currentTaskId = e.target.closest(".todo__middle-div").dataset.id;
  var currentTodoId = e.target.closest(".todo__card").dataset.id;
  var todo = toDoCollection.find(todo => todo.id === parseInt(currentTodoId));
  console.log('todo', todo)
  var task = todo.task.find(t => t.id === currentTaskId);
  console.log('task', task)
  if (task.id) {
    task.checked = !task.checked;
    //  return task;
  }
  console.log("task after if: ", task);
  addCheckMark(task.checked, e);
  savetoStorage();
}

function addCheckMark(task, e) {
  console.log("task.checked: ", task);
  var $task = $(e.target).next("p");
  console.log('$task: ', $task);
  var $image = $(".todo__middle-checkbox");
  console.log('$image', $image);
  if ($task.checked) {
    //Need to target innerHTML to switch checkmark image
    $image.attr('src', "images/checkbox-active.svg");
  } else {
    $image.attr('src', "images/checkbox.svg");
  }

  // Can also use ternary in the appended card
  // if task.checked ? display src="checkbox-active.svg" : display src="checkbox.svg"

//     if (task.checked) {
//       .innerHTML = "",
//       += `
//     <div class="todo__middle-div" data-id=${data.id}>
//   			<img class="todo__middle-checkbox" src="images/checkbox-active.svg">
//   			<p class="todo__middle-text">${data.text}</p>
//   	</div>`
//     }
// }

function findItemIndex(toDoObject, parentCard) {
  return toDoObject.task.findIndex(function (item) {
    return item.id == taskId;
  });
}

function findCardIndex(card) {
  var cardId = card.dataset.id;
  console.log("cardId in findCardIndex: ", cardId);
  return toDoCollection.findIndex(function (item) {
    return item.id == cardId;
  });
}

function searchToDosTitles(e) {
  e.preventDefault();
  var searchText = $searchInput.value.toLowerCase();
  var searchOutput = toDoCollection.filter(card => card.title.toLowerCase().includes(searchText));
  $cardArea.HTML("");
  searchOutput.forEach(toDo => displayToDos(toDo));
}

}
});