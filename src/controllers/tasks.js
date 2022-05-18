import TaskModel from '../models/tasks';

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await TaskModel.find(req.body);
    if (allTasks.length === 0) {
      return res.status(404).json({
        messages: 'Not found',
      });
    }
    return res.status(200).json({
      message: 'found',
      data: allTasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'not found',
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    if (req.params.id) {
      const task = await TaskModel.findById(req.params.id);
      return res.status(200).json({
        error: false,
        message: 'found',
        data: task,
      });
    } return res.status(400).json({
      error: true,
      message: 'incorrect id',
      data: null,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
      data: null,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = new TaskModel({
      description: req.body.description,
    });
    const newTaskDone = await newTask.save();
    return res.status(200).json({
      error: false,
      message: 'done',
      data: newTaskDone,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: 'not valid',
      data: null,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        error: true,
        message: 'please specify id',
        data: null,
      });
    }
    const updateResult = TaskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updateResult) {
      return res.status(404).json({
        error: true,
        message: 'not found',
        data: null,
      });
    }
    return res.status(200).json({
      error: false,
      message: 'done',
      data: null,
    });
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
      data: null,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        error: true,
        message: 'please specify id',
        data: null,
      });
    }
    const taskResult = await TaskModel.findByIdAndDelete(req.params.id);
    if (!taskResult) {
      return res.status(404).json({
        error: true,
        message: 'not found',
        data: null,
      });
    }
    return res.status(200).json({
      error: false,
      message: 'done',
      date: taskResult,
    });
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
      data: null,
    });
  }
};

export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
