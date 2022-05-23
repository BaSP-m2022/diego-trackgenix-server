import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const memberValidation = Joi.object({
    employeeId: Joi.string().min(5).required(),
    role: Joi.string().min(2).required(),
    rate: Joi.number().required(),
  });
  const validation = memberValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during the validation of the request',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const memberValidation = Joi.object({
    employeeId: Joi.string().min(5).optional(),
    role: Joi.string().min(2).optional(),
    rate: Joi.number().optional(),
  });
  const validation = memberValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during the validation of the request',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default { validateCreation, validateUpdate };
