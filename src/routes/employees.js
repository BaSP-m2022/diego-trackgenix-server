import express from 'express';
import employeesController from '../controllers/employees';

const router = express.Router();

router
  .get('/', employeesController.getAllEmployees)
  .get('/:id', employeesController.getEmployeesById)
  .delete('/:id', employeesController.deleteEmployee)
export default router;
