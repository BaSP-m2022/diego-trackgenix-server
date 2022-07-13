import express from 'express';
import superAdminController from '../controllers/super-admins';
import superAdminValidations from '../validations/super-admin';
import authValidation from '../middlewares/authMiddleware';
import adminRoleValidation from '../middlewares/adminRoleValidation';

const router = express.Router();

router
  .get('/', adminRoleValidation, authValidation, superAdminController.getSuperAdmins)
  .get('/:id', adminRoleValidation, authValidation, superAdminController.getSuperAdminById)
  .post('/', adminRoleValidation, authValidation, superAdminValidations.validateCreation, superAdminController.createSuperAdmin)
  .put('/:id', adminRoleValidation, authValidation, superAdminValidations.validateCreation, superAdminController.updateSuperAdmin)
  .delete('/:id', adminRoleValidation, authValidation, superAdminController.deleteSuperAdmin);

export default router;
