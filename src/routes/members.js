import express from 'express';
import memberController from '../controllers/members';
import memberValidations from '../validations/members';

const router = express.Router();

router
  .get('/', memberController.getMembers)
  .get('/:id', memberController.getMemberById)
  .post('/', memberValidations.validateCreation, memberController.addMember)
  .put('/:id', memberValidations.validateUpdate, memberController.updateMember)
  .delete('/:id', memberController.deleteMember);

export default router;
