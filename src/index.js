import express from 'express';
import mongoose from 'mongoose';

import employeeRouter from './controllers/employees';
import superadminsRouter from './controllers/super-admins';
import projectsRouter from './controllers/projects';
import adminsRouter from './controllers/admins';
import timesheetRouter from './controllers/time-sheets';

const MONGO_URL = 'mongodb+srv://BaSP-2022:ZZXZy7c0QaLlWbYR@basp-database.tp3ys.mongodb.net/BaSP-database?retryWrites=true&w=majority';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/timesheets', timesheetRouter);
app.use('/projects', projectsRouter);
app.use('/employees', employeeRouter);
app.use('/superadmins', superadminsRouter);
app.use('/projects', projectsRouter);
app.use('/admins', adminsRouter);
app.use('/timesheets', timesheetRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(
  MONGO_URL,
  (error) => {
    if (error) {
      console.log('Fail to connect', error);
    } else {
      console.log('Connected to database');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Example app listening on port ${port}`);
      });
    }
  },
);
