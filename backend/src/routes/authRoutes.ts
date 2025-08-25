import { Router } from 'express';
import { authMiddleware } from '../middleware/auth'
import { login, register, getCurrentUser } from '../controllers/authController';

const r = Router();

r.post('/register', register);
r.post('/login', login);
r.get('/me', authMiddleware, getCurrentUser)

export default r;
