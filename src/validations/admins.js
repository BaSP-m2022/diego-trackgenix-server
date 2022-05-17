import Joi from 'joi';

const adminValidation = (req, res, next) => {
  const schemaConditions = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('male', 'female', 'polygender').required(),
    active: Joi.boolean().required(),
  });
  const validation = schemaConditions.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      error: validation.error.message,
    });
  }
  return next();
};

export default {
  adminValidation,
};