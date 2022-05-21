import SuperAdmin from '../models/Super-admin';

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
  try {
    if (req.params.id) {
      const superAdmin = await SuperAdmin.findById(req.params.id);
      return res.status(200).json(superAdmin);
    }
    return res.status(400).json({
      msg: 'missing id parameter',
    });
  } catch (error) {
    return res.json({
      msg: error,
    });
  }
};

const addSuperAdmin = async (req, res) => {
  try {
    const superAdmin = new SuperAdmin({
      name: req.body.name,
      srname: req.body.srname,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
    });
    const result = await superAdmin.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
    });
  }
};

const updateSuperAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    }
    const result = await SuperAdmin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'SuperAdmin not found',
      });
    }
    return res.status(201).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
      // error: error.details[0].message
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    }
    const result = await SuperAdmin.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'SuperAdmin not found',
      });
    }
    return res.status(204).json({
      msg: 'SuperAdmin succesfully deleted.',
    });
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
    });
  }
};

export default {
  getSuperAdmins, getSuperAdminById, addSuperAdmin, updateSuperAdmin, deleteSuperAdmin,
};
