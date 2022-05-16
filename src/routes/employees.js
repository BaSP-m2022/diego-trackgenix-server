import express from 'express';
import employeesController from '../controllers/employees';
// import employeesValidations from '../validations/employees';

const router = express.Router();

router
  .get('/', employeesController.getAllEmployees)
  .post('/', employeesController.createEmployee)
  .get('/:id', employeesController.getEmployeesById)
  .put('/:id', employeesController.updateEmployee)
  .delete('/:id', employeesController.deleteEmployee)
  .get('/', employeesController.getEmployeesByFilter);
export default router;
