import Employees from '../models/employees';

const bcrypt = require('bcrypt');
// const Firebase = require('../helpers/firebase');

const register = async (req, res) => {
  try {
    // encrypting pass
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // const newFirebaseUser = await Firebase.default.auth().createUser({
    //   email: req.body.email,
    //   password: hashedPassword,
    // });
    // firebaseUid = newFirebaseUser.uid;
    // await Firebase.default.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'EMPLOYEE' });
    const newEmployee = new Employees({
      firebaseUid: req.body.firebaseUid,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedPassword,
      active: req.body.active,
    });

    const result = await newEmployee.save();
    return res.status(201).json({
      message: 'Employee created',
      data: result,
      error: false,
    });
  } catch (error) {
    // if (firebaseUid) {
    //   await Firebase.default.auth().deleteUser(firebaseUid);
    // }
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
      data: employee[0].firstName,
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
// const login = async (req, res) => {
//   try {
//     // check email
//     const user = await employees.findOne({ email: req.body.email });
//     if (!user) {
//       throw new Error('Invalid user credentials');
//     }
//     // check passw match
//     const match = await bcrypt.compare(req.body.password, user.password);
//     if (match) {
//       // create new token
//       const { firebaseUid } = user;
//       // save the token on the DB
//       const updateUser = await employees.findOneAndUpdate(
//         { email: req.body.email },
//         { firebaseUid },
//         { new: true },
//       );
//       return res.status(200).json({
//         message: 'User Logged',
//         data: {
//           email: updateUser.email,
//           // eslint-disable-next-line no-underscore-dangle
//           _id: updateUser._id,
//           firebaseUid: updateUser.firebaseUid,
//         },
//       });
//     } // aca cierra el if del match
//     throw new Error('invalid credentials');
//   } catch (error) {
//     return res.status(400).json({
//       message: error.toString(),
//     });
//   }
// };

// const logout = async (req, res) => {
//   try {
//     // decodeo el token
//     const decoded = await jwt.verify(req.headers.token, process.env.JWT_KEY);
//     // busco el user
//     const user = await Users.findById(decoded.userId);
//     if (!user) {
//       throw new Error('Invalid user credentials');
//     }
//     // remuevo el token
//     const updatedUser = await Users.findByIdAndUpdate(
//       decoded.userId,
//       { token: '' },
//       { new: true },
//     );
//     return res.status(200).json({
//       message: 'Success logout',
//       data: {
//         email: updatedUser.email,
//         // eslint-disable-next-line no-underscore-dangle
//         _id: updatedUser._id,
//       },
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: error.toString(),
//     });
//   }
// };

export default { register, getEmployeeByEmail };
