import express from 'express';
import adminsController from '../controllers/admins';
import adminValidation from '../validations/admins';
// import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', adminsController.getAdmin)
  .get('/:id', adminsController.getAdminById)
  .post('/', adminValidation.adminValidationCreate, adminsController.createAdmin)
  .put('/:id', adminValidation.adminValidationCreate, adminsController.updateAdmin)
  .delete('/:id', adminsController.deleteAdmin);

export default router;
