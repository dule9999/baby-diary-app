import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { getMyBabies, addBaby, inviteUserToBaby } from '../controllers/babyController';

const r = Router();
r.use(authMiddleware);
r.get('/', getMyBabies);
r.post('/', addBaby);
r.post('/:babyId/invite', inviteUserToBaby);

export default r;
