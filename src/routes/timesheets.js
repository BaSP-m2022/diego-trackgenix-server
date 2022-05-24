import express from 'express';
import timesheetValidation from '../validations/timesheet';
import timesheetController from '../controllers/timesheets';

const router = express.Router();

router
  .get('/', timesheetController.getAllTimesheet)
  .get('/:id', timesheetController.getTimesheetById)
  .post('/', timesheetValidation.createOrEditTimesheetValidations, timesheetController.createTimesheet)
  .put('/:id', timesheetValidation.createOrEditTimesheetValidations, timesheetController.updateTimesheet)
  .delete('/:id', timesheetController.deleteTimesheet);

export default router;
