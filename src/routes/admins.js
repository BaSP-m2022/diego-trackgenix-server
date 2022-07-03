import express from 'express';
import adminsController from '../controllers/admins';
import adminValidation from '../validations/admins';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware, adminsController.getAdmin)
  .get('/:id', authMiddleware, adminsController.getAdminById)
  .post('/', authMiddleware, adminValidation.adminValidationCreate, adminsController.createAdmin)
  .put('/:id', authMiddleware, adminValidation.adminValidationCreate, adminsController.updateAdmin)
  .delete('/:id', authMiddleware, adminsController.deleteAdmin);

export default router;
