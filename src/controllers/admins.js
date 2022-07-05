import Admin from '../models/admins';

const bcrypt = require('bcrypt');

const Firebase = require('../helpers/firebase');

const createAdmin = async (req, res) => {
  let firebaseUid;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newFirebaseUser = await Firebase.default.auth().createUser({
      email: req.body.email,
      password: hashedPassword,
    });
    firebaseUid = newFirebaseUser.uid;
    await Firebase.default.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });
    const newAdmin = new Admin({
      firebaseUid,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
      active: req.body.active,
    });
    const result = await newAdmin.save();
    return res.status(201).json({
      message: 'Admin created',
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

const getAdmin = async (req, res) => {
  try {
    const allAdmins = await Admin.find(req.body);
    if (allAdmins.length === 0) {
      return res.status(404).json({
        message: 'Not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin found',
      data: allAdmins,
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

const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (admin == null) {
      return res.status(404).json({
        message: 'Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin found',
      data: admin,
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

const updateAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Please enter an id',
        data: undefined,
        error: true,
      });
    }
    const result = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({
        message: 'Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Admin updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'There has been an error',
      data: undefined,
      error: true,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const result = await Admin.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json({
      message: 'Admin has been deleted',
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
  getAdmin,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
