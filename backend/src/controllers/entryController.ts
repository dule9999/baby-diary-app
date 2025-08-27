import { Request, Response } from 'express';
import {
  getEntriesForBaby,
  getEntryById,
  createEntryForBaby,
  updateEntry,
  deleteEntry,
  deleteAllEntriesForBaby,
} from '../models/entryModel';

// -------------------
// List entries for a baby
// -------------------
export async function listEntriesForBaby(req: Request, res: Response) {
  try {
    const { babyId } = req.params;
    const entries = await getEntriesForBaby(babyId);
    res.json(entries);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list entries' });
  }
}

// -------------------
// Get single entry
// -------------------
export async function getEntryForBaby(req: Request, res: Response) {
  try {
    const { babyId, entryId } = req.params;
    const entry = await getEntryById(babyId, entryId);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json(entry);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get entry' });
  }
}

// -------------------
// Create entry
// -------------------
export async function createEntryForBabyHandler(req: Request, res: Response) {
  try {
    const { babyId } = req.params;
    const { date, note } = req.body || {};

    if (!date || !note) {
      return res.status(400).json({ error: 'Body must include date and note' });
    }

    const entry = await createEntryForBaby({ date, note, babyId });
    res.status(201).json(entry);
  } catch (err: any) {
    console.error(err);
    const msg = err?.message?.includes('Invalid date')
      ? err.message
      : 'Failed to create entry';
    res.status(400).json({ error: msg });
  }
}

// -------------------
// Update entry
// -------------------
export async function updateEntryForBabyHandler(req: Request, res: Response) {
  try {
    const { babyId, entryId } = req.params;
    const { note } = req.body || {};

    if (!note) {
      return res.status(400).json({ error: 'Body must include note' });
    }

    const updated = await updateEntry(babyId, entryId, { note });
    if (!updated) return res.status(404).json({ error: 'Entry not found' });
    res.json(updated);
  } catch (err: any) {
    console.error(err);
    const msg = err?.message?.includes('Invalid date')
      ? err.message
      : 'Failed to update entry';
    res.status(400).json({ error: msg });
  }
}

// -------------------
// Delete entry
// -------------------
export async function deleteEntryForBabyHandler(req: Request, res: Response) {
  try {
    const { babyId, entryId } = req.params;
    const ok = await deleteEntry(babyId, entryId);
    if (!ok) return res.status(404).json({ error: 'Entry not found' });
    res.status(204).send();
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete entry' });
  }
}

// -------------------
// Delete all entries for a baby
// -------------------
export async function deleteAllEntriesForBabyHandler(req: Request, res: Response) {
  try {
    const { babyId } = req.params;
    const ok = await deleteAllEntriesForBaby(babyId);
    if (!ok) return res.status(404).json({ error: 'No entries to delete' });
    res.status(204).send();
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete all entries' });
  }
}
