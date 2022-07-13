import express from 'express';
import projectsvalidation from '../validations/projects';
import projectsController from '../controllers/projects';
import authValidation from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authValidation, projectsController.getProject)
  .get('/:id', authValidation, projectsController.getProjectById)
  .post('/', authValidation, projectsvalidation.createOrEditProjectsValidations, projectsController.addProject)
  .put('/:id', authValidation, projectsvalidation.createOrEditProjectsValidations, projectsController.updateProject)
  .delete('/:id', authValidation, projectsController.deleteProject);

export default router;
