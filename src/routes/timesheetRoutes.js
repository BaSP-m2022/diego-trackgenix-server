import express from 'express';
import timesheetController from '../controllers/timesheetsController';

const router = express.Router();

router
  .get('/', timesheetController.getAllTimesheet)
  .put('/', timesheetController.createTimesheet);

export default router;
