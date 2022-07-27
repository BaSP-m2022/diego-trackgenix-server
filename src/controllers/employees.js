import Employee from '../models/employees';
import firebaseApp from '../helpers/firebase';

const bcrypt = require('bcrypt');

const createEmployee = async (req, res) => {
  try {
    // encrypting pass
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // creating new user in firebase
    const { email, password } = req.body;
    const newFirebaseUser = await firebaseApp.auth().createUser({
      password,
      email,
    });
    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'EMPLOYEE' });
    // get the data
    const newEmployee = new Employee({
      firebaseUid: newFirebaseUser.uid,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
      active: req.body.active,
    });
    // seteamos el displayName
    await firebaseApp.auth().updateUser(newFirebaseUser.uid, { displayName: `${req.body.firstName} ${req.body.lastName}` });
    // save the data
    const result = await newEmployee.save();
    return res.status(201).json(
      {
        message: 'Employee successfully registered',
        data: result,
        error: false,
      },
    );
  } catch (err) {
    return res.status(400).send(err);
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
      data: error,
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
  updateEmployee,
  getAllEmployees,
  getEmployeesById,
  deleteEmployee,
};
