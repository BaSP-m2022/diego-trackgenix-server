const firebase = require('../helpers/firebase');

export const authorized = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized. Provide a token' });
  }
  return firebase.default.auth().verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    }).catch((error) => res.status(401).send({ message: error.toString() }));
};

export const superAdmin = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized. Provide a token' });
  }
  return firebase.default.auth().verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      if (decodedToken.role === 'SUPERADMIN') {
        return next();
      }
      return res.status(401).send({ message: 'Unauthorized. You are not an admin' });
    }).catch((error) => res.status(401).send({ message: error.toString() }));
};

export const admin = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized. Provide a token' });
  }
  return firebase.default.auth().verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      if (decodedToken.role === 'ADMIN') {
        return next();
      }
      return res.status(401).send({ message: 'Unauthorized. You are not an admin' });
    }).catch((error) => res.status(401).send({ message: error.toString() }));
};

export default { authorized, superAdmin, admin };
