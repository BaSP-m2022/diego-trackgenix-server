import express from 'express';
import employeesController from '../controllers/employees';
import employeesValidations from '../validations/employees';

const router = express.Router();

router
  .post('/', employeesValidations.contentValidation, employeesController.createEmployee)
  .put('/:id', employeesValidations.contentValidation, employeesController.updateEmployee)
  .get('/', employeesController.getAllEmployees)
  .get('/:id', employeesController.getEmployeesById)
  .delete('/:id', employeesController.deleteEmployee);

export default router;
