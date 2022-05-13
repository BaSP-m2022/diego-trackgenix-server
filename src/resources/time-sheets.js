import express from 'express';
import fs from 'fs';
import timesheets from '../data/time-sheets.json';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query) {
    const filter = req.query;
    const filters = Object.keys(req.query);
    const filteredTimesheets = timesheets.filter((timesheet) => {
      let isValid = true;
      filters.forEach((key) => {
        isValid = isValid && timesheet[key] === filter[key];
      });
      return isValid;
    });
    res.send(filteredTimesheets);
  } else {
    res.send(timesheets);
  }
});

router.post('/', (req, res) => {
  const timesheetData = req.body;
  timesheets.push(timesheetData);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheets), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Timesheet created');
    }
  });
});

router.put('/:id', (req, res) => {
  const timesheetUpdatedData = req.body;
  const timesheetsUpdated = timesheets.map((t) => {
    if (t.id === req.params.id) {
      return timesheetUpdatedData;
    }
    return t;
  });
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheetsUpdated), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Timesheet updated');
    }
  });
});

router.delete('/:id', (req, res) => {
  const timesheetId = req.params.id;
  const filteredTimesheets = timesheets.filter((t) => t.id !== timesheetId);
  if (timesheets.length === filteredTimesheets.length) {
    res.send('Could not delete timesheet, not found');
  } else {
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(filteredTimesheets), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Timesheets deleted');
      }
    });
  }
});

export default router;
