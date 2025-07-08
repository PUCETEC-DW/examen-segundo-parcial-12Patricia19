class Task {
  constructor(id, title, description, priority) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = false;
    this.priority = priority;
  }
}

let tasks = [];
let nextId = 1;

export const TaskModel = {
  create(taskData) {
    if (taskData.priority < 1 || taskData.priority > 5) {
      throw new Error('La prioridad debe estar entre 1 y 5');
    }

    if (taskData.id && tasks.find(task => task.id === taskData.id)) {
      throw new Error('El ID de la tarea ya existe');
    }

    const id = taskData.id || nextId++;
    const task = new Task(id, taskData.title, taskData.description, taskData.priority);
    
    if (taskData.id && taskData.id >= nextId) {
      nextId = taskData.id + 1;
    }
    
    tasks.push(task);
    return task;
  },

  getAll() {
    return tasks;
  },

  getById(id) {
    return tasks.find(task => task.id === parseInt(id));
  },

  update(id, updateData) {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) {
      return null;
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updateData };
    return tasks[taskIndex];
  },

  delete(id) {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) {
      return false;
    }

    tasks.splice(taskIndex, 1);
    return true;
  },

  getSummary() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pendingTasks = tasks.filter(task => !task.completed);
    
    let averagePriority = 0;
    if (pendingTasks.length > 0) {
      const totalPriority = pendingTasks.reduce((sum, task) => sum + task.priority, 0);
      averagePriority = totalPriority / pendingTasks.length;
    }

    return {
      total,
      completed,
      averagePriority: parseFloat(averagePriority.toFixed(2))
    };
  }
};
