import Joi from 'joi';

const adminValidationCreate = (req, res, next) => {
  const schemaConditions = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('male', 'female', 'polygender'),
    active: Joi.boolean(),
    password: Joi.string().min(3).required(),
  });
  const validation = schemaConditions.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `There has been an error during the validation of the request:${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  adminValidationCreate,
};
