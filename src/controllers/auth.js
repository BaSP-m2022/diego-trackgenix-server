// import Employees from '../models/Employees';
// const Firebase = require('../helpers/firebase');
import firebaseApp from '../helpers/firebase';

const Employees = require('../models/Employees');

const register = async (req, res) => {
  try {
    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    const userCreated = new Employees({
      email: req.body.email,
      firebaseUid: newFirebaseUser.uid,
    });
    const userSaved = await userCreated.save();

    return res.status(201).json({
      message: 'User created !',
      data: userSaved,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

export default register;
