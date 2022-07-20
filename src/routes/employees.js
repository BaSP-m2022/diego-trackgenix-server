import express from 'express';
import employeesController from '../controllers/employees';
import employeesValidations from '../validations/employees';
import { authorized } from '../middlewares/authMiddleware';

const router = express.Router();

router
  .post('/', authorized, employeesValidations.contentValidation, employeesController.createEmployee)
  .put('/:id', authorized, employeesValidations.contentValidation, employeesController.updateEmployee)
  .get('/', authorized, employeesController.getAllEmployees)
  .get('/:id', authorized, employeesController.getEmployeesById)
  .delete('/:id', authorized, employeesController.deleteEmployee);

export default router;
