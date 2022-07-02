import express from 'express';
import taskController from '../controllers/tasks';
import taskValidation from '../validations/tasks';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .post('/', authMiddleware, taskValidation.createTaskValid, taskController.createTask)
  .get('/:id', authMiddleware, taskController.getTaskById)
  .get('/', authMiddleware, taskController.getAllTasks)
  .put('/:id', authMiddleware, taskValidation.createTaskValid, taskController.updateTask)
  .delete('/:id', authMiddleware, taskController.deleteTask);

export default router;
