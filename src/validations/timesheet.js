import Joi from 'joi';

const createOrEditTimesheetValidations = (req, res, next) => {
  const requirementsSchema = Joi.object({
    description: Joi.string().min(5).required(),
    date: Joi.date().required(),
    task: Joi.string().min(5).required(),
    validated: Joi.boolean().required(),
    employee: Joi.string().min(5).required(),
    projectId: Joi.string().min(5).required(),
    projectManager: Joi.string().min(5).required(),
    role: Joi.string().min(2).max(3).required(),
    hours: Joi.number().required(),
  });
  const validation = requirementsSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of the request',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default {
  createOrEditTimesheetValidations,
};
