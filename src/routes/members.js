import express from 'express';
import memberController from '../controllers/members';
import memberValidations from '../validations/members';
import { authorized } from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', authorized, memberController.getMembers)
  .get('/:id', authorized, memberController.getMemberById)
  .post('/', authorized, memberValidations.validateCreation, memberController.addMember)
  .put('/:id', authorized, memberValidations.validateCreation, memberController.updateMember)
  .delete('/:id', authorized, memberController.deleteMember);

export default router;
