import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { getMyBabies, addBaby, inviteUserToBaby, removeBaby } from '../controllers/babyController';

const r = Router();
r.use(authMiddleware);
r.get('/', getMyBabies);
r.post('/', addBaby);
r.post('/:babyId/invite', inviteUserToBaby);
r.delete('/:babyId', removeBaby);

export default r;
