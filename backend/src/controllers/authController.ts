import { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../models/userModel';
import { hashPassword, verifyPassword } from '../utils/hash';
import { signJwt } from '../utils/jwt';

export async function register(req: Request, res: Response) {
  try {
    const { email, password, username } = req.body || {};
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'email, password, username are required' });
    }

    const exists = await findUserByEmail(email);
    if (exists) return res.status(409).json({ error: 'Email already in use' });

    const pwHash = await hashPassword(password);
    const user = await createUser(email, username, pwHash);

    const token = signJwt({ id: user.id, email: user.email, username: user.username });
    res.status(201).json({ token, user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Registration failed' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signJwt({ id: user.id, email: user.email, username: user.username });
    res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Login failed' });
  }
}
