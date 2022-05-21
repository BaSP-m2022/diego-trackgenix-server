import express from 'express';
import tasks from './tasks';
import employees from './employees';
import timesheets from './timesheets';
import projects from './projects';
import admins from './admins';

const router = express.Router();

router
  .use('/tasks', tasks)
  .use('/employees', employees)
  .use('/timesheets', timesheets)
  .use('/projects', projects)
  .use('/admins', admins);

export default router;
