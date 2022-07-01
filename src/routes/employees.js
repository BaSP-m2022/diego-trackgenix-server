import express from 'express';
import employeesController from '../controllers/employees';
import employeesValidations from '../validations/employees';
// import controllers from '../controllers/auth';
import validations from '../validations/auth';

const router = express.Router();
// const { register } = employeesController;

router
  .post('/register', validations.required, employeesController.createEmployee)
  .post('/', employeesValidations.contentValidation, employeesController.createEmployee)
  .put('/:id', employeesValidations.contentValidation, employeesController.updateEmployee)
  .get('/', employeesController.getAllEmployees)
  .get('/:id', employeesController.getEmployeesById)
  .delete('/:id', employeesController.deleteEmployee);

export default router;
