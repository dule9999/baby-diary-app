import { pool } from '../db';
import { v4 as uuidv4 } from 'uuid';

export type Entry = {
  id: string;
  date: string; // ISO
  note: string;
};

function rowToEntry(row: any): Entry {
  return {
    id: row.id,
    date: new Date(row.date).toISOString(),
    note: row.note,
  };
}

export async function getAllEntries(): Promise<Entry[]> {
  const res = await pool.query(
    `SELECT id, date, note FROM entries ORDER BY date DESC;`
  );
  return res.rows.map(rowToEntry);
}

export async function getEntryById(id: string): Promise<Entry | null> {
  const res = await pool.query(
    `SELECT id, date, note FROM entries WHERE id = $1;`,
    [id]
  );
  if (res.rowCount === 0) return null;
  return rowToEntry(res.rows[0]);
}

export async function createEntry(input: { date: string; note: string }): Promise<Entry> {
  const d = new Date(input.date);
  if (Number.isNaN(d.getTime())) {
    throw new Error('Invalid date. Provide an ISO-like string, e.g. 2025-08-20T10:00:00Z');
  }

  const id = uuidv4();
  const res = await pool.query(
    `INSERT INTO entries (id, date, note)
     VALUES ($1, $2, $3)
     RETURNING id, date, note;`,
    [id, d, input.note]
  );
  return rowToEntry(res.rows[0]);
}

export async function updateEntry(
  id: string,
  input: { date: string; note: string }
): Promise<Entry | null> {
  const d = new Date(input.date);
  if (Number.isNaN(d.getTime())) {
    throw new Error('Invalid date. Provide an ISO-like string, e.g. 2025-08-20T10:00:00Z');
  }

  const res = await pool.query(
    `UPDATE entries
     SET date = $2, note = $3, updated_at = now()
     WHERE id = $1
     RETURNING id, date, note;`,
    [id, d, input.note]
  );

  if (res.rowCount === 0) return null;
  return rowToEntry(res.rows[0]);
}

export async function deleteEntry(id: string): Promise<boolean> {
  const res = await pool.query(`DELETE FROM entries WHERE id = $1;`, [id]);
  return (res.rowCount ?? 0) > 0;
}
