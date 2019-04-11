class ToDo {
    constructor(id, title, tasks, urgent) {
        this.id = id;
        this.title = "";
        this.tasks = [//array of objects];
        this.urgent = this.urgent || false;
    }

    saveToStorage() {

    }

    deleteFromStorage() {

    }

    updateToDo() {
        //for title and urgency
    }

    updateTask() {
        //to update content and if completed (T/F)
    }
}