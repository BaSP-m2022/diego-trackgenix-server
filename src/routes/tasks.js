import express from 'express';
import taskController from '../controllers/tasks';
import taskValidation from '../validations/tasks';
import authValidation from '../middlewares/authMiddleware';

const router = express.Router();

router
  .post('/', authValidation, taskValidation.createTaskValid, taskController.createTask)
  .get('/:id', authValidation, taskController.getTaskById)
  .get('/', authValidation, taskController.getAllTasks)
  .put('/:id', authValidation, taskValidation.createTaskValid, taskController.updateTask)
  .delete('/:id', authValidation, taskController.deleteTask);

export default router;
