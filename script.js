var tasks = [];

function addTask() {
    var input = document.getElementById("taskInput");
    var taskText = input.value.trim();

    if (taskText == "") {
        alert("Please type a task.");
        return;
    }

    var task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    input.value = "";

    saveTasks();
    renderTasks(tasks);
}

function renderTasks(list) {
    var taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    if (list.length == 0) {
        taskList.innerHTML = "<li>No tasks found.</li>";
        return;
    }

    for (var i = 0; i < list.length; i++) {
        var task = list[i];

        var className = task.completed ? "completed" : "";

        taskList.innerHTML +=
            "<li>" +
                "<span class='" + className + "'>" + task.text + "</span>" +
                "<div class='task-buttons'>" +
                    "<button class='complete-btn' onclick='toggleTask(" + task.id + ")'>Done</button>" +
                    "<button class='delete-btn' onclick='deleteTask(" + task.id + ")'>Delete</button>" +
                "</div>" +
            "</li>";
    }
}

function toggleTask(id) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].completed = !tasks[i].completed;
        }
    }

    saveTasks();
    renderTasks(tasks);
}

function deleteTask(id) {
    var updatedTasks = [];

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id != id) {
            updatedTasks.push(tasks[i]);
        }
    }

    tasks = updatedTasks;

    saveTasks();
    renderTasks(tasks);
}

function filterTasks(filter) {
    if (filter == "All") {
        renderTasks(tasks);
        return;
    }

    var filtered = [];

    for (var i = 0; i < tasks.length; i++) {
        if (filter == "Completed" && tasks[i].completed) {
            filtered.push(tasks[i]);
        }

        if (filter == "Pending" && !tasks[i].completed) {
            filtered.push(tasks[i]);
        }
    }

    renderTasks(filtered);
}

function saveTasks() {
    localStorage.setItem("simpleTasks", JSON.stringify(tasks));
}

function updateCounter() {
    document.getElementById("taskCounter").innerText =
        tasks.length + " tasks total";
}

function loadTasks() {
    var saved = localStorage.getItem("simpleTasks");

    if (saved) {
        tasks = JSON.parse(saved);
    }

    renderTasks(tasks);
}

loadTasks();
