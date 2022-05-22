import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const validation = superAdminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of the request',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const superAdminValidation = Joi.object({
    firstName: Joi.string().min(1).max(50).optional(),
    lastName: Joi.string().min(1).max(50).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(8).optional(),
  });
  const validation = superAdminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of the update request',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default { validateCreation, validateUpdate };
