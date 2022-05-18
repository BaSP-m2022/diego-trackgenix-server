import Joi from 'joi';

const createTaskValid = (req, res, next) => {
  const conditions = Joi.object({
    description: Joi.string().min(10).max(240).required(),
  });
  const validationTask = conditions.validate(req.body);
  if (validationTask.error) {
    return res.status(400).json({
      message: 'The task description is invalid.',
      error: validationTask.error.datails[0].message,
    });
  }
  return next();
};

export default {
  createTaskValid,
};
