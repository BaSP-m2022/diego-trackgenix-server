import express from 'express';
import employeesController from '../controllers/employees';
import employeesValidations from '../validations/employees';

const router = express.Router();

router
  .post('/', employeesValidations.contentValidation, employeesController.createEmployee)
  .put('/:id', employeesValidations.contentValidation, employeesController.updateEmployee);

export default router;
