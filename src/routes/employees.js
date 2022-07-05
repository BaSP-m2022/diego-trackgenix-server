import express from 'express';
import employeesController from '../controllers/employees';
import employeesValidations from '../validations/employees';
import authMiddleware from '../middlewares/authMiddleware';
import validations from '../validations/auth';

const router = express.Router();

router
  .post('/', employeesValidations.contentValidation, employeesController.createEmployee)
  .put('/:id', authMiddleware, employeesValidations.contentValidation, employeesController.updateEmployee)
  .get('/', authMiddleware, employeesController.getAllEmployees)
  .get('/:id', authMiddleware, employeesController.getEmployeesById)
  .delete('/:id', authMiddleware, employeesController.deleteEmployee)
  .post('/register', validations.required, employeesController.createEmployee);

export default router;
