# TaskTracker CLI

TaskTracker es una aplicación de línea de comandos para gestionar tareas, desarrollada en JavaScript.

## Requisitos

- Node.js (versión 14 o superior)
- npm (normalmente se instala con Node.js)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tasktracker.git
   cd tasktracker
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Instala la aplicación globalmente (opcional):
   ```bash
   npm link
   ```

## Uso

### Si has instalado globalmente con npm link:

```bash
task [comando] [opciones]
```

### Si no has instalado globalmente:

```bash
npm start -- [comando] [opciones]
```

o

```bash
node src/index.js [comando] [opciones]
```

## Comandos disponibles

### Agregar una nueva tarea

```bash
task add "Descripción de la tarea"
```

### Listar todas las tareas

```bash
task list
```

### Filtrar tareas por estado

```bash
task list todo        # Muestra solo tareas pendientes
task list in-progress # Muestra tareas en progreso
task list done        # Muestra tareas completadas
```

### Eliminar una tarea

```bash
task delete [id]
```

### Actualizar la descripción de una tarea

```bash
task update [id] "Nueva descripción"
```

### Marcar una tarea como en progreso

```bash
task mark-in-progress [id]
```

### Marcar una tarea como completada

```bash
task mark-done [id]
```

### Ver detalles globales

```bash
task global
```

## Estructura de archivos

- `src/index.js`: Punto de entrada de la aplicación, maneja los comandos CLI
- `src/tasks.js`: Contiene la lógica para gestionar las tareas
- `package.json`: Configuración del proyecto y dependencias

## Almacenamiento de datos

Las tareas se almacenan en un archivo JSON ubicado en el directorio home del usuario (`~/.tasks.json`).

## Estados de tareas

- `todo`: Tarea pendiente
- `in-progress`: Tarea en progreso
- `done`: Tarea completada

## Ejemplos de uso

### Flujo básico de trabajo

```bash
# Agregar algunas tareas
task add "Preparar presentación para la reunión"
task add "Enviar correo al cliente"
task add "Actualizar documentación"

# Ver todas las tareas
task list

# Marcar la primera tarea como en progreso
task mark-in-progress 1

# Actualizar la descripción de una tarea
task update 2 "Enviar correo al cliente sobre el nuevo proyecto"

# Marcar una tarea como completada
task mark-done 3

# Ver solo las tareas completadas
task list done

# Eliminar una tarea
task delete 2
```
## Proyecto original

Este proyecto está basado en: https://roadmap.sh/projects/task-tracker


## Licencia

ISC
