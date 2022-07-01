import Task from '../models/tasks';

async function getAllTasks(req, res) {
  try {
    const allTasks = await Task.find(req.body);
    if (allTasks.length === 0) {
      return res.status(404).json({
        message: 'No tasks found.',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Request Successful. All tasks.',
      data: allTasks,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error: ${error}`,
      data: error,
      error: true,
    });
  }
}

const getTaskById = async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const taskById = await Task.findById(req.params.id);
      if (taskById) {
        return res.status(200).json({
          message: (`Request Successful. Task with Id: ${req.params.id} found.`),
          data: taskById,
          error: false,
        });
      }
      return res.status(404).json({
        message: (`Id: ${req.params.id} doesn't exist.`),
        data: undefined,
        error: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: (`An error has ocurred: ${error}`),
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

const createTask = async (req, res) => {
  try {
    const newTask = new Task({
      description: req.body.description,
      workedHours: req.body.workedHours,
      date: req.body.date,
    });
    const newTaskDone = await newTask.save();
    return res.status(200).json({
      message: 'Task Added',
      data: newTaskDone,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Please include employee ID, project ID, title, description, date and done.',
      data: undefined,
      error: true,
    });
  }
};

const updateTask = async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const { id } = req.params;
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

      if (updatedTask) {
        return res.status(200).json({
          message: 'Task Modified',
          data: updatedTask,
          error: false,
        });
      }
      return res.status(400).json({
        message: (`Id: ${id} doesn't exist.`),
        data: undefined,
        error: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: (`Error: ${error}`),
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

const deleteTask = async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const { id } = req.params;
    try {
      const deleteTaskById = await Task.findByIdAndDelete(id);
      if (deleteTaskById) {
        return res.status(200).json({
          message: 'Task Deleted',
          data: deleteTaskById,
          error: false,
        });
      }
      return res.status(404).json({
        message: `Task with id: ${id} not found`,
        data: undefined,
        error: true,
      });
    } catch (error) {
      return res.status(400).json({
        message: `Error: ${error}`,
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
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
