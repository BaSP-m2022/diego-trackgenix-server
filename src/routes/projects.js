import express from 'express';
import projectsvalidation from '../validations/projects';
import projectsController from '../controllers/projects';
import { authorized } from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authorized, projectsController.getProject)
  .get('/:id', authorized, projectsController.getProjectById)
  .post('/', authorized, projectsvalidation.createOrEditProjectsValidations, projectsController.addProject)
  .put('/:id', authorized, projectsvalidation.createOrEditProjectsValidations, projectsController.updateProject)
  .delete('/:id', authorized, projectsController.deleteProject);

export default router;
