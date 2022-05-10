// use "import" to import libraries
const express = require('express');
const admins = require('./data/admins.json');
const employees = require('./data/employees.json');
const employeeRouter = require('./resources/employees');

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
