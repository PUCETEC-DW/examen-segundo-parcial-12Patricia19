import { TaskModel } from '../models/Task.js';

export const TaskController = {
  getAllTasks(req, res) {
    try {
      const tasks = TaskModel.getAll();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createTask(req, res) {
    try {
      const { id, title, description, priority } = req.body;
      
      if (!title || !description || !priority) {
        return res.status(400).json({ 
          error: 'El título, descripción y prioridad son requeridos' 
        });
      }

      if (typeof priority !== 'number' || priority < 1 || priority > 5) {
        return res.status(400).json({ 
          error: 'La prioridad debe ser un número entre 1 y 5' 
        });
      }

      const task = TaskModel.create({ id, title, description, priority });
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateTask(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const task = TaskModel.update(id, updateData);
      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }

      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteTask(req, res) {
    try {
      const { id } = req.params;
      
      const deleted = TaskModel.delete(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }

      res.status(200).json({ message: 'Tarea eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTasksSummary(req, res) {
    try {
      const summary = TaskModel.getSummary();
      res.status(200).json(summary);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
