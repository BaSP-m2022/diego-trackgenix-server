import express from 'express';
import timesheetController from '../controllers/timesheetsController';

const router = express.Router();

router
  .get('/', timesheetController.getAllTimesheet)
  .get('/:id', timesheetController.getTimesheetById)
  .post('/', timesheetController.createTimesheet);

export default router;
