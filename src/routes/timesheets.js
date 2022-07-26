import express from 'express';
import timesheetValidation from '../validations/timesheet';
import timesheetController from '../controllers/timesheets';
import { authorized } from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authorized, timesheetController.getAllTimesheet)
  .get('/:id', authorized, timesheetController.getTimesheetById)
  .post('/', authorized, timesheetValidation.createOrEditTimesheetValidations, timesheetController.createTimesheet)
  .put('/:id', authorized, timesheetValidation.createOrEditTimesheetValidations, timesheetController.updateTimesheet)
  .patch('/:id', authorized, timesheetController.updateComment)
  .delete('/:id', authorized, timesheetController.deleteTimesheet);

export default router;
