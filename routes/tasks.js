import express from 'express';
import { TaskController } from '../controllers/TaskController.js';

const router = express.Router();

// GET /tasks/summary debe ir antes que GET /tasks/:id para evitar conflictos
router.get('/summary', TaskController.getTasksSummary);

// GET /tasks - Listar todas las tareas
router.get('/', TaskController.getAllTasks);

// POST /tasks - Crear una nueva tarea
router.post('/', TaskController.createTask);

// PUT /tasks/:id - Actualizar el estado de una tarea
router.put('/:id', TaskController.updateTask);

// DELETE /tasks/:id - Eliminar una tarea
router.delete('/:id', TaskController.deleteTask);

export default router;
