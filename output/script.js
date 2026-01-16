let tasks = loadTasks();

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function addTask(text) {
    if (text.trim() === '') return;
    const task = {
        id: generateUniqueId(),
        text,
        completed: false,
        createdAt: new Date()
    };
    tasks.push(task);
    renderTasks();
    saveTasks();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        saveTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    saveTasks();
}

function renderTasks() {
    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = '';
    if (tasks.length === 0) {
        document.getElementById('emptyState').style.display = 'block';
    } else {
        document.getElementById('emptyState').style.display = 'none';
    }
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div>
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                <span class="task-text">${escapeHtml(task.text)}</span>
            </div>
            <button class="delete-btn" data-id="${task.id}">Delete</button>
        `;
        li.querySelector('.checkbox').addEventListener('change', () => {
            toggleComplete(task.id);
        });
        li.querySelector('.delete-btn').addEventListener('click', (event) => {
            event.stopPropagation();
            deleteTask(task.id);
        });
        taskListElement.appendChild(li);
    });
}

// Helper function to escape HTML
function escapeHtml(text) {
    return text.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
}

// Wire up UI events
document.getElementById('addButton').addEventListener('click', () => {
    const input = document.getElementById('taskInput');
    addTask(input.value);
    input.value = '';
});

document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask(e.target.value);
        e.target.value = '';
    }
});

// Initial render
renderTasks();