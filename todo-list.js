class ToDo {
    constructor(id, title, task, urgent) {
        this.id = id;
        this.title = title;
        this.task = task || [];
        this.urgent = urgent || false;
    }

    saveToStorage() {
        var stringifiedToDos = JSON.stringify(toDoCollection);
        localStorage.setItem("savedTodos", stringifiedToDos);
    }

    deleteFromStorage() {
        toDoCollection.splice(collectionIndex, 1);
        this.saveToStorage();
    }

    updateToDo() {
        //for title, tasks and urgency
        this.urgent = !this.urgent;
        this.saveToStorage();
    }
 
    updateTask() {
        //to update content and if completed (T/F)
        this.saveToStorage();
    }
}