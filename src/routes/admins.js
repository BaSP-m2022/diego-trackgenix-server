import express from 'express';
import adminsController from '../controllers/admins';
import adminValidation from '../validations/admins';

const router = express.Router();

router
  .get('/', adminsController.getAdmin)
  .get('/:id', adminsController.getAdminById)
  .post('/', adminValidation.adminValidationCreate, adminsController.createAdmin)
  .put('/:id', adminValidation.adminValidationUpdate, adminsController.updateAdmin)
  .delete('/:id', adminsController.deleteAdmin);

export default router;
