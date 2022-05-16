import TimesheetModel from '../models/Timesheet';

const getAllTimesheet = async (req, res) => {
  try {
    const allTimesheet = await TimesheetModel.find({});
    if (req.query) {
      const filter = req.query;
      const filters = Object.keys(req.query);
      const filteredTimesheets = allTimesheet.filter((timesheet) => {
        let isValid = true;
        filters.forEach((key) => {
          if (key === 'validated' || key === 'hours') {
            isValid = (JSON.stringify(timesheet[key])).toLowerCase()
                            === filter[key].toLowerCase();
          } else {
            isValid = timesheet[key] === filter[key];
          }
        });
        return isValid;
      });
      return res.status(200).json({
        message: 'Request done',
        data: filteredTimesheets,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Request done',
      data: allTimesheet,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.details.message,
      data: null,
      error: true,
    });
  }
};

const getTimesheetById = async (req, res) => {
  try {
    if (req.params.id) {
      const timesheet = await TimesheetModel.findById(req.params.id);
      return res.status(200).json({
        message: 'Request done',
        data: timesheet,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'The id is wrong',
      data: null,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      data: null,
      error: true,
    });
  }
};

const createTimesheet = async (req, res) => {
  try {
    const newTimesheet = new TimesheetModel({
      description: req.body.description,
      date: req.body.date,
      task: req.body.task,
      validated: req.body.validated,
      employee: req.body.employee,
      projectId: req.body.projectId,
      projectManager: req.body.projectManager,
      role: req.body.role,
      hours: req.body.hours,
    });
    const result = await newTimesheet.save();
    return res.status(201).json({
      message: 'Request done',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      msg: 'Some error was ocurred, check the body of the request.',
    });
  }
};

const updateTimesheet = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'You\'ve to specify an id',
        data: null,
        error: true,
      });
    }

    const result = await TimesheetModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({
        message: 'Timesheet not found',
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Request done',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      data: null,
      error: true,
    });
  }
};

const deleteTimesheet = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: "You've to specify an id.",
        data: null,
        error: true,

      });
    }

    const result = await TimesheetModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Timesheet not found',
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'request done',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      data: null,
      error: true,
    });
  }
};

export default {
  createTimesheet,
  getAllTimesheet,
  getTimesheetById,
  updateTimesheet,
  deleteTimesheet,
};

// router.get('/', (req, res) => {
//     if (req.query) {
//       const filter = req.query;
//       const filters = Object.keys(req.query);
//       const filteredTimesheets = timesheets.filter((timesheet) => {
//         let isValid = true;
//         filters.forEach((key) => {
//           isValid = isValid && timesheet[key] === filter[key];
//         });
//         return isValid;
//       });
//       res.send(filteredTimesheets);
//     } else {
//       res.send(timesheets);
//     }
//   });

//   router.post('/', (req, res) => {
//     const timesheetData = req.body;
//     timesheets.push(timesheetData);
//     fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheets), (err) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send('Timesheet created');
//       }
//     });
//   });

//   router.put('/:id', (req, res) => {
//     const timesheetUpdatedData = req.body;
//     const timesheetsUpdated = timesheets.map((t) => {
//       if (t.id === req.params.id) {
//         return timesheetUpdatedData;
//       }
//       return t;
//     });
//     fs.writeFile('src/data/time-sheets.json', JSON.stringify(timesheetsUpdated), (err) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send('Timesheet updated');
//       }
//     });
//   });

//   router.delete('/:id', (req, res) => {
//     const timesheetId = req.params.id;
//     const filteredTimesheets = timesheets.filter((t) => t.id !== timesheetId);
//     if (timesheets.length === filteredTimesheets.length) {
//       res.send('Could not delete timesheet, not found');
//     } else {
//       fs.writeFile('src/data/time-sheets.json', JSON.stringify(filteredTimesheets), (err) => {
//         if (err) {
//           res.send(err);
//         } else {
//           res.send('Timesheets deleted');
//         }
//       });
//     }
//   });
