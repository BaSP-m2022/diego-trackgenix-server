import Joi from 'joi';

const createTaskValid = (req, res, next) => {
  const conditions = Joi.object({
    description: Joi.string().min(10).max(200).required(),
    workedHours: Joi.number().min(1).required(),
  });
  const validationTask = conditions.validate(req.body);
  if (validationTask.error) {
    return res.status(400).json({
      message: validationTask.error.message,
      error: true,
      data: undefined,
    });
  }
  return next();
};

export default {
  createTaskValid,
};
