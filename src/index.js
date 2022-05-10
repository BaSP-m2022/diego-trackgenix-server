// use 'import' to import libraries
import express from 'express';
import admins from './data/admins.json';
import timesheets from './data/time-sheets.json';
import timesheetRouter from './resources/time-sheets';

// use 'require' to import JSON files

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/timesheets', timesheetRouter);

// app.get('/', async (req, res) => {
//   res.send('Hello World!');
// });

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.get('/timesheets', (req, res) => {
  res.status(200).json({
    data: timesheets,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
