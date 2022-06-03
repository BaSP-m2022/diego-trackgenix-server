import SuperAdmin from '../models/super-admins';

const getSuperAdmins = async (req, res) => {
  try {
    const allSuperAdmins = await SuperAdmin.find(req.body);
    if (allSuperAdmins.length === 0) {
      return res.status(404).json({
        message: 'Not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admin found',
      data: allSuperAdmins,
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

const getSuperAdminById = async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const superAdmin = await SuperAdmin.findById(req.params.id);
      if (!superAdmin) {
        return res.status(404).json({
          message: 'Super Admin not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Super Admin found',
        data: superAdmin,
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

const addSuperAdmin = async (req, res) => {
  try {
    const superAdmin = new SuperAdmin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await superAdmin.save();
    return res.status(201).json({
      message: 'Super Admin created',
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

const updateSuperAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await SuperAdmin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({
        message: 'Super Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Super Admin updated',
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

const deleteSuperAdmin = async (req, res) => {
  try {
    const result = await SuperAdmin.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Super Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json();
  } catch (error) {
    return res.json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getSuperAdmins,
  getSuperAdminById,
  addSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
};
