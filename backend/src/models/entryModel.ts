import { pool } from '../db';
import { v4 as uuidv4 } from 'uuid';
import { Entry } from '@sharedTypes';

function rowToEntry(row: any): Entry {
  return {
    id: row.id,
    date: new Date(row.date).toISOString(),
    note: row.note,
    babyId: row.baby_id,
  };
}

// ----------------------
// Get entries for a baby
// ----------------------
export async function getEntriesForBaby(babyId: string): Promise<Entry[]> {
  const res = await pool.query(
    `SELECT id, date, note, baby_id 
     FROM entries 
     WHERE baby_id = $1
     ORDER BY date DESC`,
    [babyId]
  );
  return res.rows.map(rowToEntry);
}

export async function getEntryById(babyId: string, entryId: string): Promise<Entry | null> {
  const res = await pool.query(
    `SELECT id, date, note, baby_id 
     FROM entries 
     WHERE id = $1 AND baby_id = $2`,
    [entryId, babyId]
  );
  if (res.rowCount === 0) return null;
  return rowToEntry(res.rows[0]);
}

// ----------------------
// Create entries
// ----------------------
export async function createEntryForBaby(input: { date: string; note: string; babyId: string }): Promise<Entry> {
  const d = new Date(input.date);
  if (Number.isNaN(d.getTime())) {
    throw new Error(
      'Invalid date. Provide an ISO-like string, e.g. 2025-08-20T10:00:00Z'
    );
  }

  const id = uuidv4();
  const res = await pool.query(
    `INSERT INTO entries (id, date, note, baby_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id, date, note, baby_id;`,
    [id, d, input.note, input.babyId]
  );
  return rowToEntry(res.rows[0]);
}

// ----------------------
// Update entries
// ----------------------
export async function updateEntry(
  babyId: string,
  entryId: string,
  input: { note: string }
): Promise<Entry | null> {

  const res = await pool.query(
    `UPDATE entries
     SET note = $3, updated_at = now()
     WHERE id = $1 AND baby_id = $2
     RETURNING id, date, note, baby_id;`,
    [entryId, babyId, input.note]
  );

  if (res.rowCount === 0) return null;
  return rowToEntry(res.rows[0]);
}


// ----------------------
// Delete entries
// ----------------------
export async function deleteEntry(babyId: string, entryId: string): Promise<boolean> {
  const res = await pool.query(
    `DELETE FROM entries WHERE id = $1 AND baby_id = $2;`,
    [entryId, babyId]
  );
  return (res.rowCount ?? 0) > 0;
}

export async function deleteAllEntriesForBaby(babyId: string): Promise<boolean> {
  const res = await pool.query(
    `DELETE FROM entries WHERE baby_id = $1;`,
    [babyId]
  );
  return (res.rowCount ?? 0) > 0;
}
