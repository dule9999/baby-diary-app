import { pool } from '../db';

export async function findUserByEmail(email: string) {
  const res = await pool.query(
    'SELECT id, email, username, password_hash FROM users WHERE email=$1 LIMIT 1',
    [email]
  );
  return res.rows[0] || null;
}

export async function createUser(email: string, username: string, passwordHash: string) {
  const res = await pool.query(
    `INSERT INTO users (email, username, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, email, username`,
    [email, username, passwordHash]
  );
  return res.rows[0];
}
