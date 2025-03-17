import { addTask, loadTasks } from './tasks.js';

async function main() {
  const [,, command, ...args] = process.argv;
  
  try {
    switch(command) {
      case 'agregar':
        if (args.length === 0) {
          console.error('Error: Debes proporcionar una descripción para la tarea');
          process.exit(1);
        }
        const description = args.join(' ');
        const newTaskId = await addTask(description);
        console.log(`Tarea agregada exitosamente (ID: ${newTaskId})`);
        break;
      
      case 'listar':
        const tasksData = await loadTasks();
        console.log('Tareas actuales:');
        tasksData.tasks.forEach(task => {
          console.log(`ID: ${task.id}, Descripción: ${task.description}, Estado: ${task.status}`);
        });
        break;
      
      default:
        console.log('Comando no reconocido. Usa "agregar" o "listar".');
    }
  } catch (error) {
    console.error('Ocurrió un error:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);