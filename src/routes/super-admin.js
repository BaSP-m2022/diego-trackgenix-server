import express from 'express';
import superAdminController from '../controllers/super-admins';
import superAdminValidations from '../validations/super-admin';

const router = express.Router();

router
  .get('/', superAdminController.getSuperAdmins)
  .get('/:id', superAdminController.getSuperAdminById)
  .post('/', superAdminValidations.validateCreation, superAdminController.addSuperAdmin)
  .put('/:id', superAdminValidations.validateCreation, superAdminController.updateSuperAdmin)
  .delete('/:id', superAdminController.deleteSuperAdmin);

export default router;
