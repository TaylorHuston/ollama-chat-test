let tasks = [];

function renderTasks() {
    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = '';
    if (tasks.length === 0) {
        showEmptyState();
    } else {
        hideEmptyState();
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="checkbox ${task.completed ? 'checked' : ''}"></span>
                <span>${task.text}</span>
                <button class="delete-button" onclick="deleteTask(${index})">×</button>
            `;
            li.addEventListener('click', () => {
                const checkbox = li.querySelector('.checkbox');
                checkbox.classList.toggle('checked');
                task.completed = !task.completed;
                saveTasks();
                updateTaskStyles(li, task.completed);
            });
            // Add focus and blur event listeners to the list item
            li.addEventListener('focus', () => {
                const checkbox = li.querySelector('.checkbox');
                checkbox.style.outline = '2px solid #2563eb';
            });
            li.addEventListener('blur', () => {
                const checkbox = li.querySelector('.checkbox');
                checkbox.style.outline = 'none';
            });
            taskListElement.appendChild(li);
        });
    }
}

function addTask() {
    const inputField = document.querySelector('input[type="text"]');
    const taskText = inputField.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        inputField.value = '';
        inputField.focus();
    }
}

function deleteTask(index) {
    if (confirm(`Are you sure you want to delete "${tasks[index].text}"?`)) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

function showEmptyState() {
    const taskListElement = document.getElementById('taskList');
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No tasks yet! Add one above.';
    emptyMessage.style.color = '#666666';
    emptyMessage.style.textAlign = 'center';
    taskListElement.appendChild(emptyMessage);
}

function hideEmptyState() {
    const emptyMessage = document.querySelector('#taskList p');
    if (emptyMessage) {
        emptyMessage.remove();
    }
}

function saveTasks() {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error("LocalStorage is unavailable:", error);
        alert("Sorry, but it seems that local storage is not available.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    renderTasks();
});

document.querySelector('input[type="text"]').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function updateTaskStyles(li, completed) {
    const checkbox = li.querySelector('.checkbox');
    if (completed) {
        li.style.color = '#666666';
        li.style.textDecoration = 'line-through';
        li.style.opacity = '0.7';
        checkbox.style.backgroundColor = '#16a34a';
        checkbox.style.borderColor = '#16a34a';
        checkbox.style.color = '#ffffff';
    } else {
        li.style.color = '';
        li.style.textDecoration = 'none';
        li.style.opacity = '';
        checkbox.style.backgroundColor = '';
        checkbox.style.borderColor = '';
        checkbox.style.color = '';
    }
}