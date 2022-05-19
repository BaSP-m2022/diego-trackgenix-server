import express from 'express';
import adminsController from '../controllers/admins';
import adminValidation from '../validations/admins';

const router = express.Router();

router
  .get('/', adminsController.getAdmin)
  .get('/:id', adminsController.getAdminById)
  .post('/', adminValidation.adminValidation, adminsController.createAdmin)
  .put('/:id', adminValidation.adminValidation, adminsController.updateAdmin)
  .delete('/:id', adminsController.deleteAdmin);

export default router;
