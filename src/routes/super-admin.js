import express from 'express';
import superAdminController from '../controllers/super-admins';
import superAdminValidations from '../validations/super-admin';
import { superAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', superAdmin, superAdminController.getSuperAdmins)
  .get('/:id', superAdmin, superAdminController.getSuperAdminById)
  .post('/', superAdmin, superAdminValidations.validateCreation, superAdminController.createSuperAdmin)
  .put('/:id', superAdmin, superAdminValidations.validateCreation, superAdminController.updateSuperAdmin)
  .delete('/:id', superAdmin, superAdminController.deleteSuperAdmin);

export default router;
