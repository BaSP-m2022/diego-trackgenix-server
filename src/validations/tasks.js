import Joi from 'joi';

const createTaskValid = (req, res, next) => {
  const conditions = Joi.object({
    description: Joi.string().max(100),
    workedHours: Joi.number().min(1),
    date: Joi.date(),
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
