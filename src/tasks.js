import fs from 'fs/promises';
import path from 'path';

const TASK_FILE = path.resolve("./tasks.json")

async function loadTasks() {
    try {
        const data = await fs.readFile(TASK_FILE, "utf8");
        return JSON.parse(data) 
    } catch(error) {
        return { tasks: []}
    }
};

async function saveTasks(tasks) {
    return await fs.writeFile(TASK_FILE, JSON.stringify(tasks, null, 2))
};

async function addTask(description) {
    const tasksData = await loadTasks();

    const newId = tasksData.tasks.length > 0
    ? Math.max(...tasksData.tasks.map(task => task.id)) + 1
    : 1;

    const newTask = {
        id: newId,
        description: description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tasksData.tasks.push(newTask);

    await saveTasks(tasksData);

    return newId;
};


export { loadTasks, saveTasks, addTask};