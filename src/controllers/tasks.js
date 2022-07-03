import Task from '../models/tasks';

async function getAllTasks(req, res) {
  try {
    const allTasks = await Task.find(req.body);
    if (allTasks.length === 0) {
      return res.status(404).json({
        message: 'Not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Tasks found',
      data: allTasks,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: error,
      error: true,
    });
  }
}

const getTaskById = async (req, res) => {
  try {
    if (req.params.id) {
      const employee = await Task.findById(req.params.id);
      return res.status(200).json(employee);
    }
    return res.status(400).json({
      message: 'Missing parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: 'Error',
      data: error,
      error: true,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = new Task({
      description: req.body.description,
      workedHours: req.body.workedHours,
      date: req.body.date,
    });
    const newTaskDone = await newTask.save();
    return res.status(200).json({
      message: 'Task created',
      data: newTaskDone,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error',
      data: error,
      error: true,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!req.params) {
      res.status(400).json({
        message: 'Missing params',
        data: undefined,
        error: true,
      });
    }
    const result = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({
        message: 'Task not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Task edited',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'Error',
      data: error,
      error: true,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Task not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Task deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'Error',
      data: error.message,
      error: true,
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
