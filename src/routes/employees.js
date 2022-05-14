import express from 'express';
import employeesController from '../controllers/employees';
import employeesValidations from '../validations/employees';

const router = express.Router();

router
  .get('/', employeesController)
  .post('/', employeesValidations)
  .get('/:id', employeesController)
  .put('/:id', employeesController)
  .delete('/:id', employeesController);
export default router;
