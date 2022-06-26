import express from 'express';
import tasks from './tasks';
import employees from './employees';
import timesheets from './timesheets';
import projects from './projects';
import admins from './admins';
import superAdminRoutes from './super-admin';
import members from './members';
import auth from './auth';

const router = express.Router();

router
  .use('/tasks', tasks)
  .use('/employees', employees)
  .use('/timesheets', timesheets)
  .use('/projects', projects)
  .use('/admins', admins)
  .use('/super-admins', superAdminRoutes)
  .use('/members', members)
  .use('/auth', auth);

export default router;
