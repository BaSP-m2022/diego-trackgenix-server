import Joi from 'joi';

const contentValidation = (req, res, next) => {
  const schemaConditions = Joi.object({
    first_Name: Joi.string().min(3).required(),
    last_Name: Joi.string().min(3).required(),
    phone: Joi.string().min(9).pattern(/^[0-9]+$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
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
  contentValidation,
};
