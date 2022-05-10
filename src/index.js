// use "import" to import libraries
import express from 'express';
// use "require" to import JSON files
import admins from './data/admins.json';

import employees from './data/employees.json';

import employeeRouter from './resources/employees';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/employees', employeeRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.get('/employees', (req, res) => {
  res.status(200).json({
    data: employees,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
