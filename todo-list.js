class ToDo {
    constructor(id, title, task, urgent) {
        this.id = id;
        this.title = title;
        this.task = task;
        this.urgent = false;
    }

    saveToStorage() {
        var stringifiedTasks = JSON.stringify(taskCollection);
        localStorage.setItem("tasks", stringifiedTasks);
    }

    deleteFromStorage() {
        taskCollection.splice(collectionIndex, 1);
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