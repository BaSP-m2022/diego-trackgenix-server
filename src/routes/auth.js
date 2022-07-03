import express from 'express';
import controllers from '../controllers/auth';
import validations from '../validations/auth';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();
const { register, login, logout } = controllers;
router.post('/register', validations.required, register);
router.post('/login', validations.required, login);
router.patch('/logout', authMiddleware, logout);

export default router;
