import Users from '../models/users';

const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    // lo decodeo
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    const user = await Users.findById(decoded.userId);
    // checkeo si matchea
    if (token !== user.token) {
      throw new Error('Invalid token');
    }
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorize',
      data: error.toString(),
    });
  }
};

export default checkAuth;
