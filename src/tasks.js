import fs from 'fs/promises';
import path from 'path';
import os from 'os';

// Usar una ruta absoluta al directorio home del usuario
const TASK_FILE = path.join(os.homedir(), '.tasks.json');

async function loadTasks() {
    try {
        const data = await fs.readFile(TASK_FILE, "utf8");
        return JSON.parse(data);
    } catch(error) {
        return { tasks: []};
    }
}

async function saveTasks(tasks) {
    return await fs.writeFile(TASK_FILE, JSON.stringify(tasks, null, 2));
}

async function addTask(description) {
    const tasksData = await loadTasks();
    
    // Filtrar las tareas null antes de calcular el nuevo ID
    const validTasks = tasksData.tasks.filter(task => task !== null);
    
    const newId = validTasks.length > 0
        ? Math.max(...validTasks.map(task => task.id)) + 1
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
}

async function deleteTask(id) {
    const taskData = await loadTasks();

    const posicion = encontrarIndex(id, taskData.tasks);
    
    if (posicion === -1) {
        throw new Error(`No se encontró tarea con ID: ${id}`);
    }

    taskData.tasks[posicion] = null;

    await saveTasks(taskData);
    return id;
}

async function updateTask(id, nuevaDescripcion) {
    const taskData = await loadTasks();
    const posicion = encontrarIndex(id, taskData.tasks);
    
    if (posicion === -1) {
        throw new Error(`No se encontró tarea con ID: ${id}`);
    }
    
    // Verificar que la tarea no sea null antes de intentar actualizarla
    if (taskData.tasks[posicion] === null) {
        throw new Error(`La tarea con ID ${id} ha sido eliminada`);
    }

    taskData.tasks[posicion].description = nuevaDescripcion;
    taskData.tasks[posicion].updatedAt = new Date().toISOString();

    await saveTasks(taskData);
    return id;
}

async function markInProgress(id) {
    const taskData = await loadTasks();
    const posicion = encontrarIndex(id, taskData.tasks);
    
    if (posicion === -1) {
        throw new Error(`No se encontró tarea con ID: ${id}`);
    }
    
    // Verificar que la tarea no sea null antes de intentar actualizarla
    if (taskData.tasks[posicion] === null) {
        throw new Error(`La tarea con ID ${id} ha sido eliminada`);
    }

    taskData.tasks[posicion].status = 'in-progress';
    taskData.tasks[posicion].updatedAt = new Date().toISOString();

    await saveTasks(taskData);
    return id;
}

async function markDone(id) {
    const taskData = await loadTasks();
    const posicion = encontrarIndex(id, taskData.tasks);
    
    if (posicion === -1) {
        throw new Error(`No se encontró tarea con ID: ${id}`);
    }
    
    // Verificar que la tarea no sea null antes de intentar actualizarla
    if (taskData.tasks[posicion] === null) {
        throw new Error(`La tarea con ID ${id} ha sido eliminada`);
    }

    taskData.tasks[posicion].status = 'done';
    taskData.tasks[posicion].updatedAt = new Date().toISOString();

    await saveTasks(taskData);
    return id;
}

async function filter(estado) {
    const taskData = await loadTasks();
    return taskData.tasks.filter(task => task !== null && task.status === estado);
}

async function muestraDetalleGlobal() {
    const tasksData = await loadTasks();

    return tasksData
}

// funciones auxiliares 
function encontrarIndex(id, lista) {
    return lista.findIndex(x => x !== null && x.id === id);
}

export { loadTasks, saveTasks, addTask, deleteTask, updateTask, markInProgress, markDone, filter, muestraDetalleGlobal };