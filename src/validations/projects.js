import joi from 'joi';

const createOrEditProjectsValidations = (req, res, next) => {
  const requirementSchema = joi.object({
    name: joi.string().min(3).required(),
    isActive: joi.boolean().required(),
    description: joi.string().min(5).required(),
    client: joi.string().min(3).required(),
    startDate: joi.date().required(),
    endDate: joi.date().required(),
    members: joi.array().required(),
  });
  const validation = requirementSchema.validate(req.body);

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
  createOrEditProjectsValidations,
};
