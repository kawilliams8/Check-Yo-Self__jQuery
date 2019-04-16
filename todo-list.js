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

    deleteFromStorage(collectionIndex) {
        //toDoCollection.splice(collectionIndex, 1);
        this.saveToStorage();
    }

    updateToDo() {
        //for title, tasks and urgency
        // this.urgent = !this.urgent;
        this.saveToStorage();
    }
 
    updateTask(editedTitle, completed) {
        //to update content and if completed (T/F)
        //this.title = editedTitle;
        //this.completed = completed || false;
        this.saveToStorage();
    }
}