import Employee from '../models/employees';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Firebase = require('../helpers/firebase');

const createEmployee = async (req, res) => {
  let firebaseUid;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newFirebaseUser = await Firebase.default.auth().createUser({
      email: req.body.email,
      password: hashedPassword,
    });
    firebaseUid = newFirebaseUser.uid;
    await Firebase.default.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'EMPLOYEE' });
    const employee = new Employee({
      firebaseUid,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
      active: req.body.active,
    });
    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee created',
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
const login = async (req, res) => {
  try {
    // check email
    const user = await Employee.findOne({ email: req.body.email });
    if (!user) {
      throw new Error('Invalid user credentials');
    }
    // check passw match
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      // create new token
      const token = jwt.sign(
        {
          email: user.email,
          // eslint-disable-next-line no-underscore-dangle
          userId: user._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: '1d',
        },
      );
        // save the token on the DB
      const updateUser = await Employee.findOneAndUpdate(
        { email: req.body.email },
        { token },
        { new: true },
      );
      return res.status(200).json({
        message: 'User Logged',
        data: {
          email: updateUser.email,
          // eslint-disable-next-line no-underscore-dangle
          _id: updateUser._id,
          token: updateUser.token,
        },
      });
    } // aca cierra el if del match
    throw new Error('invalid credentials');
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

const logout = async (req, res) => {
  try {
    // decodeo el token
    const decoded = await jwt.verify(req.headers.token, process.env.JWT_KEY);
    // busco el user
    const user = await Employee.findById(decoded.userId);
    if (!user) {
      throw new Error('Invalid user credentials');
    }
    // remuevo el token
    const updatedUser = await Employee.findByIdAndUpdate(
      decoded.userId,
      { token: '' },
      { new: true },
    );
    return res.status(200).json({
      message: 'Success logout',
      data: {
        email: updatedUser.email,
        // eslint-disable-next-line no-underscore-dangle
        _id: updatedUser._id,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find(req.body);
    if (allEmployees.length === 0) {
      return res.status(404).json({
        message: 'Employee not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee found',
      data: allEmployees,
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

const updateEmployee = async (req, res) => {
  try {
    if (!req.params) {
      res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({
        message: 'Employee not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Employee information updated',
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

const getEmployeesById = async (req, res) => {
  try {
    if (req.params.id) {
      const employee = await Employee.findById(req.params.id);
      return res.status(200).json({
        message: 'Employee found',
        data: employee,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Missing id parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const result = await Employee.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Employee not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json({
      message: 'The employee has been deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  createEmployee,
  login,
  logout,
  updateEmployee,
  getAllEmployees,
  getEmployeesById,
  deleteEmployee,
};
