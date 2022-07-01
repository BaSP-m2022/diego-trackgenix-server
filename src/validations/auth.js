const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const required = (req, res, next) => {
  if (!req.body.email || !req.body.email.match(emailRegex) || !req.body.password) {
    return res.status(400).send({ message: 'Authentification error' });
  }
  return next();
};

export default { required };
