import TimesheetModel from '../models/timesheets';

const getAllTimesheet = async (req, res) => {
  try {
    const filteredTimesheets = await TimesheetModel.find(req.body);
    if (filteredTimesheets.length === 0) {
      return res.status(400).json({
        message: "Error on the search's criteria",
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
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const timesheet = await TimesheetModel.findById(req.params.id);
      if (!timesheet) {
        return res.status(404).json({
          message: 'Timesheet not found.',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Request done',
        data: timesheet,
        error: false,
      });
    } catch (error) {
      return res.json({
        message: error.message,
        data: undefined,
        error: true,
      });
    }
  }
  return res.status(404).json({
    message: 'Invalid ID',
    data: undefined,
    error: true,
  });
};

const createTimesheet = async (req, res) => {
  try {
    const newTimesheet = new TimesheetModel({
      description: req.body.description,
      taskId: req.body.taskId,
      validated: req.body.validated,
      employeeId: req.body.employeeId,
      projectId: req.body.projectId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
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
      message: 'Some error ocurred, check the body of the request.',
      data: undefined,
      error: true,
    });
  }
};

const updateTimesheet = async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          message: "You've to specify an id",
          data: null,
          error: true,
        });
      }

      const result = await TimesheetModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        },
      );
      if (!result) {
        return res.status(404).json({
          message: 'Timesheet not found',
          data: null,
          error: true,
        });
      }
      return res.status(201).json({
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
  }
  return res.status(404).json({
    message: 'Invalid ID',
    data: undefined,
    error: true,
  });
};

const deleteTimesheet = async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
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
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Timesheet deleted',
        data: result,
        error: false,
      });
    } catch (error) {
      return res.json({
        message: error.message,
        data: undefined,
        error: true,
      });
    }
  }
  return res.status(404).json({
    message: 'Invalid ID',
    data: undefined,
    error: true,
  });
};

export default {
  createTimesheet,
  getAllTimesheet,
  getTimesheetById,
  updateTimesheet,
  deleteTimesheet,
};
