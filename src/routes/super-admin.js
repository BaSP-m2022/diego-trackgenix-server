import express from 'express';
import superAdminController from '../controllers/super-admins';
import superAdminValidations from '../validations/super-admin';
// import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', superAdminController.getSuperAdmins)
  .get('/:id', superAdminController.getSuperAdminById)
  .post('/', superAdminValidations.validateCreation, superAdminController.createSuperAdmin)
  .put('/:id', superAdminValidations.validateCreation, superAdminController.updateSuperAdmin)
  .delete('/:id', superAdminController.deleteSuperAdmin);

export default router;
