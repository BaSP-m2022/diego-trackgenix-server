import express from 'express';
import adminsController from '../controllers/admins';
import adminValidation from '../validations/admins';
import { admin } from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', admin, adminsController.getAdmin)
  .get('/:id', admin, adminsController.getAdminById)
  .post('/', admin, adminValidation.adminValidationCreate, adminsController.createAdmin)
  .put('/:id', admin, adminValidation.adminValidationCreate, adminsController.updateAdmin)
  .delete('/:id', admin, adminsController.deleteAdmin);

export default router;
