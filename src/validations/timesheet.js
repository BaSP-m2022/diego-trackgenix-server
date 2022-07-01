import Joi from 'joi';

const createOrEditTimesheetValidations = (req, res, next) => {
  const requirementsSchema = Joi.object({
    description: Joi.string().min(5).required(),
    taskId: Joi.string().min(5).required(),
    validated: Joi.boolean().required(),
    employeeId: Joi.string().min(5).required(),
    projectId: Joi.string().min(5).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    hours: Joi.number().required(),
  });
  const validation = requirementsSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during the validation of the request',
      data: undefined,
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default {
  createOrEditTimesheetValidations,
};
