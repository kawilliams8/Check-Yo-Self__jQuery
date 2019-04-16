class ToDo {
  constructor(id, title, taskObj, urgent) {
    this.id = id;
    this.title = title;
    this.task = taskObj || [];
    this.urgent = urgent || false;
  }

  saveToStorage(toDoCollection) {
    localStorage.setItem("savedTodos", JSON.stringify(toDoCollection));
  }

  deleteFromStorage(index) {
    toDoCollection.splice(index, 1);
      this.saveToStorage();
  }

  updateToDo() {
    // this.urgent = !this.urgent;
    this.saveToStorage();
  }
 
  updateTask(editedTitle, completed) {
    //this.completed = completed || false;
    //this.title = editedTitle;
    this.saveToStorage();
  }
}