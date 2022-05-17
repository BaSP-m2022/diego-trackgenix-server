import express from 'express';
import employeesRoute from './employees';
import timeSheetRoutes from './timesheetRoutes';

const router = express.Router();

router
  .use('/employees', employeesRoute)
  .use('/timesheet', timeSheetRoutes);

export default router;
