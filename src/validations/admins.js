import Joi from 'joi';

const adminValidationCreate = (req, res, next) => {
  const schemaConditions = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('male', 'female', 'polygender').required(),
    active: Joi.boolean().required(),
    password: Joi.string().min(3).required(),
  });
  const validation = schemaConditions.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There has been an error during the validation of the creation',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

const adminValidationUpdate = (req, res, next) => {
  const schemaConditions = Joi.object({
    firstName: Joi.string().min(3).optional(),
    lastName: Joi.string().min(3).optional(),
    email: Joi.string().email().optional(),
    gender: Joi.string().valid('male', 'female', 'polygender').optional(),
    active: Joi.boolean().optional(),
    password: Joi.string().min(3).optional(),
  });
  const validation = schemaConditions.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There has been an error during the validation of the update',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default {
  adminValidationCreate,
  adminValidationUpdate,
};
