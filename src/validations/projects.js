import joi from 'joi';

const createOrEditProjectsValidations = (req, res, next) => {
  const requirementSchema = joi.object({
    name: joi.string().min(3).required(),
    description: joi.string().min(5).required(),
    startDate: joi.string().required(),
    endDate: joi.string().optional(),
    clientName: joi.string().min(3).required(),
    active: joi.boolean().required(),
    devRate: joi.number().min(0),
    qaRate: joi.number().min(0),
    pmRate: joi.number().min(0),
    tlRate: joi.number().min(0),
    devs: [{
      employeeId: joi.string(),
      name: joi.string(),
    }],
    qas: [{
      qasId: joi.string(),
      qasName: joi.string(),
    }],
    projectManager: joi.string(),
    techLeader: joi.string(),
    admin: joi.string(),
  });
  const validation = requirementSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of the request',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default {
  createOrEditProjectsValidations,
};
