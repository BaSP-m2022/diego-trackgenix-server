import express from 'express';
import employeesRoute from './employees';

const router = express.Router();

router
  .use('/employees', employeesRoute);

export default router;
