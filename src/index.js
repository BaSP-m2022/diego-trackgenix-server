// use 'import' to import libraries
import express from 'express';

// use 'require' to import JSON files
const admins = require('./data/admins.json');
const timesheets = require('./data/time-sheets.json');
const timesheetRouter = require('./resources/time-sheets');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/timesheets', timesheetRouter);

// app.get('/', async (req, res) => {
//   res.send('Hello World!');
// });

app.get('/timesheets', (req, res) => {
  res.status(200).json({
    data: timesheets,
  });
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
