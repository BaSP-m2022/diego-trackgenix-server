import ProjectsModel from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await ProjectsModel.find(req.body);
    if (allProjects.length === 0) {
      return res.status(404).json({
        msg: 'Project not found',
      });
    }
    return res.status(200).json({
      msg: 'Project found',
      result: allProjects,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There has been an error',
    });
  }
};

const getProjectsById = async (req, res) => {
  try {
    if (req.params.id) {
      const projects = await ProjectsModel.findById(req.params.id);
      return res.status(200).json(projects);
    }
    return res.status(400).json({
      msg: 'The id parameter is wrong',
    });
  } catch (error) {
    return res.json({
      msg: error,
    });
  }
};

const createProjects = async (req, res) => {
  try {
    const newProjects = new ProjectsModel({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      active: req.body.active,
      devRate: req.body.devRate,
      qaRate: req.body.qaRate,
      pmRate: req.body.pmRate,
      tlRate: req.body.tlRate,
      devs: req.body.devs,
      qas: req.body.qas,
      projectManager: req.body.projectManager,
      techLeader: req.body.techLeader,
      admin: req.body.admin,
    });
    const result = await newProjects.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.json({
      msg: 'Some error was ocurred, check the body of the request.',
    });
  }
};

const updateProjects = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'You have to specify an id',
      });
    }

    const result = await ProjectsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'Project not found',
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error was ocurred',
      error: error.details[0].message,
    });
  }
};

const deleteProjects = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'You have to specify an id',
      });
    }

    const result = await ProjectsModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'Project not found',
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error was ocurred',
      error: error.details[0].message,
    });
  }
};

export default {
  createProjects,
  getAllProjects,
  getProjectsById,
  updateProjects,
  deleteProjects,
};
