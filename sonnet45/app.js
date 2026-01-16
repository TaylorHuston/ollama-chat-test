// Constants
const STORAGE_KEY = 'todoAppTasks';

// Data model and localStorage functions
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function createTask(text) {
    return {
        id: generateUniqueId(),
        text: text,
        completed: false,
        createdAt: Date.now()
    };
}

function saveTasks(tasks) {
    try {
        const tasksJson = JSON.stringify(tasks);
        localStorage.setItem(STORAGE_KEY, tasksJson);
        return true;
    } catch (error) {
        console.error('Failed to save tasks to localStorage:', error);
        showError('Unable to save tasks. Your browser may have storage disabled or be out of space.');
        return false;
    }
}

function loadTasks() {
    try {
        const tasksJson = localStorage.getItem(STORAGE_KEY);
        if (!tasksJson) {
            return [];
        }
        const tasks = JSON.parse(tasksJson);
        // Sort by creation timestamp to maintain creation order
        return tasks.sort((a, b) => a.createdAt - b.createdAt);
    } catch (error) {
        console.error('Failed to load tasks from localStorage:', error);
        showError('Unable to load tasks. Your browser may have storage disabled or the data may be corrupted.');
        return [];
    }
}

function isLocalStorageAvailable() {
    try {
        const testKey = '__localStorage_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
}

// UI functions
function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function hideError() {
    const errorElement = document.getElementById('error-message');
    errorElement.classList.add('hidden');
}

function renderTaskItem(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.taskId = task.id;

    // Create checkbox
    const checkbox = document.createElement('div');
    checkbox.className = 'task-checkbox';
    checkbox.setAttribute('role', 'checkbox');
    checkbox.setAttribute('aria-checked', task.completed.toString());
    checkbox.setAttribute('tabindex', '0');
    if (task.completed) {
        checkbox.classList.add('checked');
    }

    // Create task text
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    if (task.completed) {
        taskText.classList.add('completed');
    }
    // Use textContent to prevent HTML injection and properly display special characters
    taskText.textContent = task.text;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.setAttribute('aria-label', 'Delete task');
    deleteButton.textContent = '×';

    // Assemble the task item
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);

    return li;
}

function renderTaskList(tasks) {
    const taskListElement = document.getElementById('task-list');
    const emptyStateElement = document.getElementById('empty-state');

    // Clear existing tasks
    taskListElement.innerHTML = '';

    // Handle empty state
    if (tasks.length === 0) {
        emptyStateElement.classList.remove('hidden');
        return;
    } else {
        emptyStateElement.classList.add('hidden');
    }

    // Render each task
    tasks.forEach(task => {
        const taskElement = renderTaskItem(task);
        taskListElement.appendChild(taskElement);
    });
}

// Task management functions
function addTask(taskText) {
    // Validate input - trim and check for empty or whitespace-only
    const trimmedText = taskText.trim();
    if (!trimmedText) {
        return false;
    }

    // Load existing tasks
    const tasks = loadTasks();

    // Create new task
    const newTask = createTask(trimmedText);

    // Add to tasks array
    tasks.push(newTask);

    // Save to localStorage
    if (!saveTasks(tasks)) {
        return false;
    }

    // Re-render task list
    renderTaskList(tasks);

    return true;
}

function toggleTaskComplete(taskId) {
    // Load existing tasks
    const tasks = loadTasks();

    // Find the task by ID
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return false;
    }

    // Toggle completed state
    task.completed = !task.completed;

    // Save to localStorage
    if (!saveTasks(tasks)) {
        return false;
    }

    // Re-render task list
    renderTaskList(tasks);

    return true;
}

function deleteTask(taskId) {
    // Load existing tasks
    const tasks = loadTasks();

    // Filter out the task with the given ID
    const filteredTasks = tasks.filter(t => t.id !== taskId);

    // Save to localStorage
    if (!saveTasks(filteredTasks)) {
        return false;
    }

    // Re-render task list
    renderTaskList(filteredTasks);

    return true;
}

// Event handlers
function handleAddButtonClick() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value;

    if (addTask(taskText)) {
        // Clear input and refocus
        taskInput.value = '';
        taskInput.focus();
    }
}

function handleInputKeypress(event) {
    // Check if Enter key was pressed
    if (event.key === 'Enter') {
        const taskInput = document.getElementById('task-input');
        const taskText = taskInput.value;

        if (addTask(taskText)) {
            // Clear input and refocus
            taskInput.value = '';
            taskInput.focus();
        }
    }
}

function handleTaskListClick(event) {
    const target = event.target;
    const taskItem = target.closest('.task-item');
    
    if (!taskItem) {
        return;
    }

    const taskId = taskItem.dataset.taskId;

    // Handle checkbox click
    if (target.classList.contains('task-checkbox')) {
        toggleTaskComplete(taskId);
    }

    // Handle delete button click
    if (target.classList.contains('delete-button')) {
        deleteTask(taskId);
    }
}

function handleTaskListKeydown(event) {
    const target = event.target;
    
    // Handle Enter or Space on checkbox for accessibility
    if (target.classList.contains('task-checkbox') && 
        (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        const taskItem = target.closest('.task-item');
        if (taskItem) {
            const taskId = taskItem.dataset.taskId;
            toggleTaskComplete(taskId);
        }
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Check localStorage availability
    if (!isLocalStorageAvailable()) {
        showError('localStorage is not available. Tasks will not be saved between sessions.');
    } else {
        // Load tasks from localStorage
        const tasks = loadTasks();
        renderTaskList(tasks);
    }

    // Attach event listeners
    const addButton = document.getElementById('add-button');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    addButton.addEventListener('click', handleAddButtonClick);
    taskInput.addEventListener('keypress', handleInputKeypress);
    taskList.addEventListener('click', handleTaskListClick);
    taskList.addEventListener('keydown', handleTaskListKeydown);

    // Focus input on page load
    taskInput.focus();
});