import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { listBabiesForUser, createBabyForUser, linkUserToBaby } from '../models/babyModel';

export async function getMyBabies(req: AuthRequest, res: Response) {
  const user = req.user!;
  const babies = await listBabiesForUser(user.id);
  res.json(babies);
}

export async function addBaby(req: AuthRequest, res: Response) {
  const user = req.user!;
  const { name, img, date_of_birth, blood_group, address } = req.body || {};
  if (!name) return res.status(400).json({ error: 'name is required' });

  const baby = await createBabyForUser(user.id, { name, img, date_of_birth, blood_group, address });
  res.status(201).json(baby);
}

export async function inviteUserToBaby(req: AuthRequest, res: Response) {
  const { babyId } = req.params;
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'email is required' });

  const linked = await linkUserToBaby(email, babyId);
  if (!linked) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true });
}
