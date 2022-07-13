import express from 'express';
import timesheetValidation from '../validations/timesheet';
import timesheetController from '../controllers/timesheets';
import authValidation from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authValidation, timesheetController.getAllTimesheet)
  .get('/:id', authValidation, timesheetController.getTimesheetById)
  .post('/', authValidation, timesheetValidation.createOrEditTimesheetValidations, timesheetController.createTimesheet)
  .put('/:id', authValidation, timesheetValidation.createOrEditTimesheetValidations, timesheetController.updateTimesheet)
  .delete('/:id', authValidation, timesheetController.deleteTimesheet);

export default router;
