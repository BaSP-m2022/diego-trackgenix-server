import Joi from 'joi';

const contentValidation = (req, res, next) => {
  const schemaConditions = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    phone: Joi.number().min(10),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    active: Joi.boolean(),
  });
  const validation = schemaConditions.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  contentValidation,
};
