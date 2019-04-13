class ToDo {
    constructor(id, title, task, urgent) {
        this.id = id;
        this.title = title;
        this.task = task;
        this.urgent = urgent || false;
    }

    saveToStorage() {
        var stringifiedToDos = JSON.stringify(toDoCollection);
        localStorage.setItem("tasks", stringifiedToDos);
    }

    deleteFromStorage() {
        toDoCollection.splice(collectionIndex, 1);
        this.saveToStorage();
    }

    updateToDo() {
        //for title and urgency
    }
 
    updateTask() {
        //to update content and if completed (T/F)
        this.saveToStorage();
    }
}