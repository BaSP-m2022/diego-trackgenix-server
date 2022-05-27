import Task from '../models/tasks';

async function getAllTasks(req, res) {
  try {
    const allTasks = await Task.find(req.body);
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
}

const getTaskById = async (req, res) => {
  try {
    if (req.params.id) {
      const employee = await Task.findById(req.params.id);
      return res.status(200).json(employee);
    }
    return res.status(400).json({
      msg: 'Missing id parameter',
    });
  } catch (error) {
    return res.json({
      msg: error,
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
      msg: 'Tasks has been created',
      newTaskDone,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'not valid',
      error,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!req.params) {
      res.status(400).json({
        msg: 'Missing id parameter',
      });
    }
    const result = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({
        msg: 'Task not found',
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.json({
      msg: 'There has been an error',
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'Task not found',
      });
    }
    return res.status(204).json({
      msg: 'Task has been deleted',
    });
  } catch (error) {
    return res.json({
      msg: 'There has been an error',
      error: error.message,
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
