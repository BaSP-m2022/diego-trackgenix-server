import express from 'express';
import memberController from '../controllers/members';
import memberValidations from '../validations/members';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authMiddleware, memberController.getMembers)
  .get('/:id', authMiddleware, memberController.getMemberById)
  .post('/', authMiddleware, memberValidations.validateCreation, memberController.addMember)
  .put('/:id', authMiddleware, memberValidations.validateCreation, memberController.updateMember)
  .delete('/:id', authMiddleware, memberController.deleteMember);

export default router;
