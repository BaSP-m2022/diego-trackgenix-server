import express from 'express';
import projectsvalidation from '../validations/projects';
import projectsController from '../controllers/projects';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware, projectsController.getProject)
  .get('/:id', authMiddleware, projectsController.getProjectById)
  .post('/', authMiddleware, projectsvalidation.createOrEditProjectsValidations, projectsController.addProject)
  .put('/:id', authMiddleware, projectsvalidation.createOrEditProjectsValidations, projectsController.updateProject)
  .delete('/:id', authMiddleware, projectsController.deleteProject);

export default router;
