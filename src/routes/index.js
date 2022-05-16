import express from 'express';
import timeSheetRoutes from './timesheetRoutes';

const router = express.Router();

router
  .use('/timesheet', timeSheetRoutes);

export default router;
