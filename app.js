import express from 'express';
import taskRoutes from './routes/tasks.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API de Tareas Avanzadas funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

export default app;
