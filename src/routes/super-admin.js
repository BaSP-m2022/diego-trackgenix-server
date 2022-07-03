import express from 'express';
import superAdminController from '../controllers/super-admins';
import superAdminValidations from '../validations/super-admin';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware, superAdminController.getSuperAdmins)
  .get('/:id', authMiddleware, superAdminController.getSuperAdminById)
  .post('/', authMiddleware, superAdminValidations.validateCreation, superAdminController.addSuperAdmin)
  .put('/:id', authMiddleware, superAdminValidations.validateCreation, superAdminController.updateSuperAdmin)
  .delete('/:id', authMiddleware, superAdminController.deleteSuperAdmin);

export default router;
