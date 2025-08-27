import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { listBabiesForUser, createBabyForUser, linkUserToBaby, deleteBaby } from '../models/babyModel';

export async function getMyBabies(req: AuthRequest, res: Response) {
  try {
    const user = req.user!;
    const babies = await listBabiesForUser(user.id);
    res.json(babies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch babies' });
  }
}

export async function addBaby(req: AuthRequest, res: Response) {
  try {
    const user = req.user!;
    const { name, img, date_of_birth, blood_group, address } = req.body || {};
    if (!name) return res.status(400).json({ error: 'name is required' });

    const baby = await createBabyForUser(user.id, { name, img, date_of_birth, blood_group, address });
    res.status(201).json(baby);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create baby' });
  }
}

export async function inviteUserToBaby(req: AuthRequest, res: Response) {
  try {
    const { babyId } = req.params;
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ error: 'email is required' });

    const linked = await linkUserToBaby(email, babyId);
    if (!linked) return res.status(404).json({ error: 'User not found or already linked' });
    res.json({ success: true, linked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to invite user' });
  }
}

export async function removeBaby(req: AuthRequest, res: Response) {
  try {
    const { babyId } = req.params;
    const user = req.user!;
    
    if (!babyId) return res.status(400).json({ error: 'babyId is required' });

    const deleted = await deleteBaby(babyId, user.id);
    if (!deleted) return res.status(404).json({ error: 'Baby not found or not authorized' });

    res.json({ success: true });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to remove baby'})
  }
  
}

