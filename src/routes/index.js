import express from 'express';
import employeesRoutes from './employees';
import timeSheetRoutes from './timesheetRoutes';
import adminsRoutes from './admins';

const router = express.Router();

router
  .use('/timesheet', timeSheetRoutes)
  .use('/employees', employeesRoutes)
  .use('/admins', adminsRoutes);

export default router;
