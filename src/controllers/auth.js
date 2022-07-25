import Employees from '../models/employees';
import firebaseApp from '../helpers/firebase';

const bcrypt = require('bcrypt');

const register = async (req, res) => {
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
    const newEmployee = new Employees({
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
    // eslint-disable-next-line no-underscore-dangle
    return res.status(201).json(
      {
        message: 'Employee created',
        data: result,
        error: false,
      },
    );
  } catch (error) {
    return res.status(400).json({
      message: 'Error',
      data: error,
      error: true,
    });
  }
};

const getEmployeeByEmail = async (req, res) => {
  try {
    const employee = await Employees.find({ email: req.params.email });
    if (employee.length === 0) {
      return res.status(404).json({
        message: 'Employee not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee found',
      data: employee,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error',
      data: error,
      error: true,
    });
  }
};

export default { register, getEmployeeByEmail };
