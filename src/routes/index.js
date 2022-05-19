import express from 'express';
import employees from './employees';
import timesheets from './timesheets';
import projects from './projects';

const router = express.Router();

router
  .use('/employees', employees)
  .use('/timesheets', timesheets)
  .use('/projects', projects);

export default router;
