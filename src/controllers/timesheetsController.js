import TimesheetModel from '../models/Timesheet';

const getAllTimesheet = async (req, res) => {
  try {
    const allTimesheet = await TimesheetModel.find({});
    return res.status(200).json(allTimesheet);
  } catch (error) {
    return res.status(500).json({
      msg: 'Something went wrong, review your request.',
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
    return res.status(201).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error was ocurred',
    });
  }
};

export default {
  createTimesheet,
  getAllTimesheet,

};
