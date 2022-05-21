import express from 'express';
import projectsvalidation from '../validations/projects';
import projectsController from '../controllers/projects';

const router = express.Router();

router
  .get('/', projectsController.getAllProjects)
  .get('/:id', projectsController.getProjectsById)
  .post(
    '/',
    projectsvalidation.createOrEditProjectsValidations,
    projectsController.createProjects,
  )
  .put(
    '/:id',
    projectsvalidation.createOrEditProjectsValidations,
    projectsController.updateProjects,
  )
  .delete('/:id', projectsController.deleteProjects);

export default router;
