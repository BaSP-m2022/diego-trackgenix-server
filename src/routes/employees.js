import express from 'express';
import employeesController from '../controllers/employees';
import employeesValidations from '../validations/employees';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .post('/', employeesValidations.contentValidation, employeesController.createEmployee)
  .put('/:id', authMiddleware, employeesValidations.contentValidation, employeesController.updateEmployee)
  .get('/', employeesController.getAllEmployees)
  .get('/:id', authMiddleware, employeesController.getEmployeesById)
  .delete('/:id', employeesController.deleteEmployee);

export default router;
