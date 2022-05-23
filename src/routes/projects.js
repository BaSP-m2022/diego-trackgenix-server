import express from 'express';
import projectsvalidation from '../validations/projects';
import projectsController from '../controllers/projects';

const router = express.Router();

router
  .get('/', projectsController.getProject)
  .get('/:id', projectsController.getProjectById)
  .post('/', projectsvalidation.createOrEditProjectsValidations, projectsController.addProject)
  .put('/', projectsvalidation.createOrEditProjectsValidations, projectsController.updateProject)
  .delete('/', projectsController.deleteProject);

export default router;
