function saveTasks() {
    if (window.localStorage) {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (e) {
            console.error('Error saving tasks to localStorage:', e);
        }
    } else {
        console.error('LocalStorage is not available.');
        document.getElementById('emptyState').textContent = 'localStorage is unavailable. Tasks will not persist.';
    }
}

function loadTasks() {
    if (window.localStorage) {
        let savedTasks = [];
        try {
            const storedTasks = localStorage.getItem('tasks');
            if (storedTasks) {
                savedTasks = JSON.parse(storedTasks);
            } else {
                console.warn('No tasks found in localStorage.');
            }
        } catch (e) {
            console.error('Error parsing tasks from localStorage:', e);
            savedTasks = [];
        }
        return savedTasks;
    } else {
        console.error('LocalStorage is not available.');
        document.getElementById('emptyState').textContent = 'localStorage is unavailable. Tasks will not persist.';
        return [];
    }
}