import { Request, Response } from 'express';
import {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
} from '../models/entryModel';

export async function listEntries(req: Request, res: Response) {
  try {
    const entries = await getAllEntries();
    res.json(entries);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list entries' });
  }
}

export async function getEntry(req: Request, res: Response) {
  try {
    const entry = await getEntryById(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json(entry);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get entry' });
  }
}

export async function createEntryHandler(req: Request, res: Response) {
  try {
    const { date, note } = req.body || {};
    if (typeof date !== 'string' || typeof note !== 'string') {
      return res.status(400).json({ error: 'Body must include date (string) and note (string)' });
    }
    const entry = await createEntry({ date, note });
    res.status(201).json(entry);
  } catch (err: any) {
    console.error(err);
    const msg = err?.message?.includes('Invalid date')
      ? err.message
      : 'Failed to create entry';
    res.status(400).json({ error: msg });
  }
}

export async function updateEntryHandler(req: Request, res: Response) {
  try {
    const { date, note } = req.body || {};
    if (typeof date !== 'string' || typeof note !== 'string') {
      return res.status(400).json({ error: 'Body must include date (string) and note (string)' });
    }
    const updated = await updateEntry(req.params.id, { date, note });
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

export async function deleteEntryHandler(req: Request, res: Response) {
  try {
    const ok = await deleteEntry(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Entry not found' });
    res.status(204).send();
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete entry' });
  }
}
