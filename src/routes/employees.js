import express from 'express';
import employeesController from '../controllers/employees';
import employeesValidations from '../validations/employees';
import authValidation from '../middlewares/authMiddleware';

const router = express.Router();

router
  .post('/', authValidation, employeesValidations.contentValidation, employeesController.createEmployee)
  .put('/:id', authValidation, employeesValidations.contentValidation, employeesController.updateEmployee)
  .get('/', authValidation, employeesController.getAllEmployees)
  .get('/:id', authValidation, employeesController.getEmployeesById)
  .delete('/:id', authValidation, employeesController.deleteEmployee);

export default router;
