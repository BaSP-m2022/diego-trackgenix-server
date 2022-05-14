import express from 'express';
import employeesRoute from './employees';

const router = express.Router();

router
  .use('/employess', employeesRoute);

export default router;
