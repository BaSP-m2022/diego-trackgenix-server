import Users from '../models/users';
import employees from '../models/employees';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    // encrypting pass
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // create user
    const userCreated = new Users({
      email: req.body.email,
      password: hashedPassword,
    });
    // save it
    const userSaved = await userCreated.save();
    // res
    return res.status(201).json({
      message: 'User created',
      data: userSaved,
    });
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};

const login = async (req, res) => {
  try {
    // check email
    const user = await employees.findOne({ email: req.body.email });
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
      const updateUser = await employees.findOneAndUpdate(
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
    const user = await Users.findById(decoded.userId);
    if (!user) {
      throw new Error('Invalid user credentials');
    }
    // remuevo el token
    const updatedUser = await Users.findByIdAndUpdate(
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

export default { register, login, logout };
