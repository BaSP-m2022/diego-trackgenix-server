import express from 'express';
import controllers from '../controllers/auth';
// import validations from '../validations/auth';

const router = express.Router();
const { register, getEmployeeByEmail } = controllers;
router.post('/register', register);
router.get('/employees/:email', getEmployeeByEmail);

export default router;
