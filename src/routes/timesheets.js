import express from 'express';
import timesheetValidation from '../validations/timesheet';
import timesheetController from '../controllers/timesheets';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware, timesheetController.getAllTimesheet)
  .get('/:id', authMiddleware, timesheetController.getTimesheetById)
  .post('/', authMiddleware, timesheetValidation.createOrEditTimesheetValidations, timesheetController.createTimesheet)
  .put('/:id', authMiddleware, timesheetValidation.createOrEditTimesheetValidations, timesheetController.updateTimesheet)
  .delete('/:id', authMiddleware, timesheetController.deleteTimesheet);

export default router;
