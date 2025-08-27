import { pool } from '../db';

export async function listBabiesForUser(userId: string) {
  const res = await pool.query(
    `SELECT b.id, b.name, b.img, b.date_of_birth, b.blood_group, b.address
     FROM babies b
     JOIN baby_users bu ON bu.baby_id = b.id
     WHERE bu.user_id = $1
     ORDER BY b.created_at DESC`,
    [userId]
  );
  return res.rows;
}

export async function createBabyForUser(userId: string, data: {
  name: string; img?: string; date_of_birth?: string; blood_group?: string; address?: string;
}) {
  const res = await pool.query(
    `WITH inserted AS (
       INSERT INTO babies (name, img, date_of_birth, blood_group, address)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, img, date_of_birth, blood_group, address
     )
     INSERT INTO baby_users (user_id, baby_id, role)
     SELECT $6, inserted.id, 'owner' FROM inserted
     ON CONFLICT DO NOTHING
     RETURNING (SELECT id FROM inserted) AS id`,
    [data.name, data.img || null, data.date_of_birth || null, data.blood_group || null, data.address || null, userId]
  );
  const babyId = res.rows[0].id;
  const full = await pool.query(
    'SELECT id, name, img, date_of_birth, blood_group, address FROM babies WHERE id=$1',
    [babyId]
  );
  return full.rows[0];
}

export async function linkUserToBaby(byEmail: string, babyId: string) {
  const u = await pool.query('SELECT id FROM users WHERE email=$1 LIMIT 1', [byEmail]);
  if (!u.rows[0]) return null;
  const userId = u.rows[0].id;

  const res = await pool.query(
    `INSERT INTO baby_users (user_id, baby_id, role)
     VALUES ($1, $2, 'viewer')
     ON CONFLICT DO NOTHING
     RETURNING user_id, baby_id, role`,
    [userId, babyId]
  );
  return res.rows[0] || null; // null means already linked
}
