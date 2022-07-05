import SuperAdmin from '../models/super-admins';

const bcrypt = require('bcrypt');

const Firebase = require('../helpers/firebase');

const createSuperAdmin = async (req, res) => {
  let firebaseUid;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newFirebaseUser = await Firebase.default.auth().createUser({
      email: req.body.email,
      password: hashedPassword,
    });
    firebaseUid = newFirebaseUser.uid;
    await Firebase.default.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'SUPERADMIN' });
    const newSuperAdmin = new SuperAdmin({
      firebaseUid,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
      active: req.body.active,
    });
    const result = await newSuperAdmin.save();
    return res.status(201).json({
      message: 'Super Admin created',
      data: result,
      firebase: firebaseUid,
      error: false,
    });
  } catch (error) {
    if (firebaseUid) {
      await Firebase.default.auth().deleteUser(firebaseUid);
    }
    return res.status(400).json({
      message: 'Error',
      data: error,
      error: true,
    });
  }
};

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
    const superAdmin = await SuperAdmin.findById(req.params.id);
    if (superAdmin == null) {
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
  createSuperAdmin,
  getSuperAdmins,
  getSuperAdminById,
  updateSuperAdmin,
  deleteSuperAdmin,
};
