import express from 'express';
import taskController from '../controllers/tasks';
import taskValidation from '../validations/tasks';
import { authorized } from '../middlewares/authMiddleware';

const router = express.Router();

router
  .post('/', authorized, taskValidation.createTaskValid, taskController.createTask)
  .get('/:id', authorized, taskController.getTaskById)
  .get('/', authorized, taskController.getAllTasks)
  .put('/:id', authorized, taskValidation.createTaskValid, taskController.updateTask)
  .delete('/:id', authorized, taskController.deleteTask);

export default router;
