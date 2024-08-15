document.addEventListener('DOMContentLoaded', (event) => {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById('new-task');
    let taskText = taskInput.value;
    if (taskText.trim() === '') {
        alert('Please enter a task');
        return;
    }
    let task = {
        id: Date.now(),
        text: taskText,
        dateAdded: new Date().toLocaleString(),
        completed: false,
        dateCompleted: null
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
    renderTasks();
}

function completeTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = true;
        tasks[taskIndex].dateCompleted = new Date().toLocaleString();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function loadTasks() {
    renderTasks();
}

function renderTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskList = document.getElementById('task-list');
    let completedTaskList = document.getElementById('completed-task-list');

    taskList.innerHTML = '';
    completedTaskList.innerHTML = '';

    tasks.forEach(task => {
        let listItem = document.createElement('li');
        listItem.textContent = `${task.text} (Added on: ${task.dateAdded})`;

        if (!task.completed) {
            let completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.className = 'complete-button';
            completeButton.onclick = () => completeTask(task.id);
            listItem.appendChild(completeButton);
            taskList.appendChild(listItem);
        } else {
            listItem.textContent += ` (Completed on: ${task.dateCompleted})`;
            completedTaskList.appendChild(listItem);
        }
    });
}
