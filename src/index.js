#!/usr/bin/env node

import { addTask, loadTasks, deleteTask, updateTask, markInProgress, markDone, muestraDetalleGlobal, filter } from './tasks.js';

async function main() {
  const [,, command, ...args] = process.argv;
  
  try {
    switch(command) {
      case 'add':
        if (args.length === 0) {
          console.error('Error: Debes proporcionar una descripción para la tarea');
          process.exit(1);
        }
        const description = args.join(' ');
        const newTaskId = await addTask(description);
        console.log(`Tarea agregada exitosamente (ID: ${newTaskId})`);
        break;
      
      case 'list':
        const tasksData = await loadTasks();
        console.log('Tareas actuales:');
        if (args.length === 0) {
          tasksData.tasks.filter(task => task !== null).forEach(task => {
            console.log(`ID: ${task.id}, Descripción: ${task.description}, Estado: ${task.status}`);
          });
        } else if (args.length === 1) {
          const filtrado = await filter(args[0]);
          filtrado.forEach(task => {
            console.log(`ID: ${task.id}, Descripción: ${task.description}, Estado: ${task.status}`);
          });
        }
        break;

      case 'delete':
        if (args.length === 0) {
            console.error('Error: Debes proporcionar un id para ser eliminado');
            process.exit(1);
          }
        
        const id = parseInt(args[0]);
        const identificador = await deleteTask(id);
        console.log(`Tarea eliminada exitosamente (ID: ${identificador})`);
        break;
      
      case 'update':
        if (args.length < 2) {
            console.error('Error: Debes proporcionar un id y una nueva descripción para ser actualizado');
            process.exit(1);
        }
        
        const id2 = parseInt(args[0]);
        // Tomamos todos los argumentos después del ID y los unimos para formar la descripción
        const nuevaDescripcion = args.slice(1).join(' ');
        const identificador2 = await updateTask(id2, nuevaDescripcion);
        console.log(`Se actualizó el ID ${identificador2}`);
        break;

      case 'mark-in-progress':
        if (args.length === 0) {
            console.log("Ingresa un id válido para cambiar el estado")
        }

        const id3 = parseInt(args[0]);
        const identificador3 = await markInProgress(id3);
        console.log(`Se ha cambiado el estado (ID: ${identificador3})`);
        break;

      case 'mark-done':
        if (args.length === 0) {
            console.log("Ingresa un id válido para cambiar el estado")
        }
    
        const id4 = parseInt(args[0]);
        const identificador4 = await markDone(id4);
        console.log(`Se ha cambiado el estado (ID: ${identificador4})`);
        break;

      case 'global':
        muestraDetalleGlobal().then(x => console.log(x));


      default:
        console.log('Comando no reconocido.');
    }
  } catch (error) {
    console.error('Ocurrió un error:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);