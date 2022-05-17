import express from 'express';
import employeesRoutes from './employees';
import timeSheetRoutes from './timesheetRoutes';

const router = express.Router();

router
  .use('/timesheet', timeSheetRoutes)
  .use('/employees', employeesRoutes);

export default router;
