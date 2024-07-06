document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const totalTasksSpan = document.getElementById('total-tasks');
    const completedTasksSpan = document.getElementById('completed-tasks');

    let tasks = [
        { id: 1, description: 'Tarea 1', completed: false },
        { id: 2, description: 'Tarea 2', completed: false },
        { id: 3, description: 'Tarea 3', completed: false }
    ];

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.description}</span>
                <div>
                    <button onclick="toggleTask(${task.id})">${task.completed ? 'Desmarcar' : 'Marcar'}</button>
                    <button onclick="deleteTask(${task.id})">Eliminar</button>
                </div>
            `;
            taskList.appendChild(li);
        });
        updateSummary();
    };

    const updateSummary = () => {
        totalTasksSpan.textContent = tasks.length;
        completedTasksSpan.textContent = tasks.filter(task => task.completed).length;
    };

    const addTask = () => {
        const description = taskInput.value.trim();
        if (description) {
            const newTask = {
                id: Date.now(),
                description,
                completed: false
            };
            tasks.push(newTask);
            taskInput.value = '';
            renderTasks();
        }
    };

    const toggleTask = (id) => {
        tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
        renderTasks();
    };

    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    };

    window.toggleTask = toggleTask;
    window.deleteTask = deleteTask;

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
