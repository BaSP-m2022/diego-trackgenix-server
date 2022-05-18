import express from 'express';
import taskController from '../controllers/tasks';
import taskValidation from '../validations/tasks';

const router = express.Router();

router
  .post('/', taskValidation.createTaskValid, taskController.createTask)
  .get('/:id', taskController.getTaskById)
  .put('/:id', taskValidation.createTaskValid, taskController.updateTask)
  .delete('/:id', taskController.deleteTask);

export default router;
