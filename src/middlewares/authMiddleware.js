const firebase = require('../helpers/firebase');

const authValidation = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized. Provide a token' });
  }
  return firebase.default.auth().verifyIdToken(token)
    .then((decodedToken) => {
      console.log(decodedToken);
      req.user = decodedToken;
      next();
    }).catch((error) => res.status(401).send({ message: error.toString() }));
};

export default authValidation;
