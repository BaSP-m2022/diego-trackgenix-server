const express = require('express');
const fs = require('fs');
const timesheets = require('../data/time-sheets.json');

const router = express.Router();

// router.get('/getAll', (res) => {
//     res.send(timesheets);
//   });

// router.get('/getFilter', (req, res) => {
//     const filters = req.query;
//     const filteredTimesheets = timesheets.filter(function(timesheet){
//     return timesheet.filters === key;
//     });
//     res.send(filteredTimesheets);
//   });

// router.get('/getById/:id', (req, res) => {
//     const timesheetId = req.params.id;
//     const timesheet = timesheets.find((timesheet) => {
//       return timesheet.id === timesheetId;
//     });
//       if (timesheet) {
//           res.send(timesheet);
//     } else {
//       res.send('timesheeet not found');
//     }
//   });

router.post('/Add', (req, res) => {
  const timesheetsData = req.body;
  if (timesheetsData.id && timesheetsData.date) {
    timesheets.push(timesheetsData);
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheets), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Timesheet created');
      }
    });
  }
});

module.exports = router;
