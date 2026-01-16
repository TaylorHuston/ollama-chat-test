let tasks = [];

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function loadTasks() {
    try {
        const storedTasks = localStorage.getItem('todos');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        } else {
            tasks = [];
        }
    } catch (error) {
        console.error("Failed to load tasks from localStorage:", error);
        alert("Error loading tasks. Please try again later.");
    }
}

function saveTasks() {
    try {
        localStorage.setItem('todos', JSON.stringify(tasks));
    } catch (error) {
        console.error("Failed to save tasks to localStorage:", error);
        alert("Error saving tasks. Please try again later.");
    }
}