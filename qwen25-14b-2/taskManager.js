const TASKS_KEY = 'tasks';

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function loadTasks() {
    try {
        const tasksJson = localStorage.getItem(TASKS_KEY);
        return tasksJson ? JSON.parse(tasksJson) : [];
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        alert('Failed to load tasks. Please check your browser settings.');
        return [];
    }
}

function saveTasks(tasks) {
    try {
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
        alert('Failed to save tasks. Please check your browser settings.');
    }
}

let tasks = loadTasks();

function addTask() {
    const input = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');

    if (input.value.trim() !== '') {
        const task = {
            id: generateUniqueId(),
            text: input.value,
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.push(task);
        saveTasks(tasks);

        renderTask(task);
        input.value = '';
        emptyState.style.display = 'none';
    }
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function renderTask(task) {
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');

    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('role', 'checkbox');
    checkbox.setAttribute('aria-checked', task.completed);
    taskItem.appendChild(checkbox);

    const text = document.createElement('span');
    text.innerHTML = escapeHtml(task.text); // Escape HTML to prevent XSS
    if (task.completed) {
        text.style.color = '#666666';
        text.style.textDecoration = 'line-through';
        text.style.opacity = '0.7';
    }
    taskItem.appendChild(text);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('role', 'button');
    deleteButton.onclick = () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks(tasks);
        renderTaskList(); // Re-render the list after deletion
    };
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);

    checkbox.addEventListener('change', () => {
        const isChecked = checkbox.checked;
        checkbox.setAttribute('aria-checked', isChecked);
        task.completed = isChecked;
        saveTasks(tasks);
        if (isChecked) {
            text.style.color = '#666666';
            text.style.textDecoration = 'line-through';
            text.style.opacity = '0.7';
        } else {
            text.style.color = '#1a1a1a';
            text.style.textDecoration = 'none';
            text.style.opacity = '1';
        }
    });

    // Add keydown event listener for Space and Enter keys
    checkbox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            checkbox.click();
        }
    });

    deleteButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            deleteButton.click();
        }
    });
}

function renderTaskList() {
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');

    // Clear existing tasks
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        emptyState.style.display = '';
        return;
    }

    emptyState.style.display = 'none';

    tasks.forEach(task => {
        renderTask(task);
    });
}

function initTasks() {
    renderTaskList(); // Render tasks on initialization

    // Add event listener for the Add button
    const addButton = document.querySelector('.input-area button');
    addButton.addEventListener('click', addTask);

    // Add keydown event listener to input for Enter key
    const taskInput = document.getElementById('task-input');
    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Add keydown event listener to Add button for Space and Enter keys
    addButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            addTask();
        }
    });
}

window.onload = initTasks;