import express from 'express';
import adminsController from '../controllers/admins';
import adminValidation from '../validations/admins';
import authValidation from '../middlewares/authMiddleware';
import adminRoleValidation from '../middlewares/adminRoleValidation';

const router = express.Router();

router
  .get('/', adminRoleValidation, authValidation, adminsController.getAdmin)
  .get('/:id', adminRoleValidation, authValidation, adminsController.getAdminById)
  .post('/', adminRoleValidation, authValidation, adminValidation.adminValidationCreate, adminsController.createAdmin)
  .put('/:id', adminRoleValidation, authValidation, adminValidation.adminValidationCreate, adminsController.updateAdmin)
  .delete('/:id', adminRoleValidation, authValidation, adminsController.deleteAdmin);

export default router;
