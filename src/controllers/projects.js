import Project from '../models/projects';

const getProject = async (req, res) => {
  try {
    const allProjects = await Project.find(req.body);
    if (allProjects.length === 0) {
      return res.status(404).json({
        message: 'Not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Project found',
      data: allProjects,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There has been an error',
      data: undefined,
      error: true,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({
        message: 'Project not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Project found',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const addProject = async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      isActive: req.body.isActive,
      description: req.body.description,
      client: req.body.client,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      members: req.body.members,
    });
    const result = await project.save();
    return res.status(201).json({
      message: 'Project created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({
        message: 'Project not found',
        data: null,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Project updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Project.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Project not found',
        data: null,
        error: true,
      });
    }
    return res.status(204).json({
      message: 'Project has been deleted',
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
};

export default {
  getProject,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
