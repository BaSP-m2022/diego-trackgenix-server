import firebase from '../helpers/firebase';
// import Auth from '../models/auth';
import Employee from '../models/Employees';

// const Firebase = require('../helpers/firebase');
// const Auth = require('../models/Auth');

const register = async (req, res) => {
  try {
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    // const userCreated = new Auth({
    //   email: req.body.email,
    //   firebaseUid: newFirebaseUser.uid,
    // });
    // const userSaved = await userCreated.save();
    const userCreated = new Employee({
      email: req.body.email,
      firebaseUid: newFirebaseUser.uid,
    });
    const userSaved = await userCreated.save();
    console.log('saved', userSaved);
    console.log('created', userCreated);
    return res.status(201).json({
      message: 'User created !',
      data: userSaved,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: {},
      error: true,
    });
  }
};

// signIn() {
//   firebase.auth()
//   .signInWithEmailAndPassword("dummy@gmail.com", "pass123!")
//   .then(() => {
//     this.authStatus = 'Authorized'
//   }).catch((err) => {
//     this.authStatus = err
//   })
// },
// signOut() {
//   firebase.auth().signOut().then(() => {
//     this.authStatus = 'Unauthorized'
//   }).catch((err) => {
//     this.authStatus = err
//   })
// }

// const login = async (req, res) => {
//   try {
//     console.log('req: ', req);
//     const loginRes = firebase.auth()
//       .signInWithEmailAndPassword(req.body.email, req.body.password);
//     console.log('loginRes: ', loginRes);
//     return loginRes;
//   } catch (error) {
//     console.log('error: ', error);
//     return res.status(400).json({
//       message: error.message,
//       data: {},
//       error: true,
//     });
//   }
// };

export default { register };
