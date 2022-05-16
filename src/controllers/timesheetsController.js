import TimesheetModel from '../models/Timesheet';

const getAllTimesheet = async (req, res) => {
  try {
    const filteredTimesheets = await TimesheetModel.find(req.body);
    if (filteredTimesheets.length === 0) {
      return res.status(400).json({
        message: 'Error on the search\'s criteria',
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Request done',
      data: filteredTimesheets,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
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
