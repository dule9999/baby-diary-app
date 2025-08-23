import { Entry } from '@sharedTypes';
import { API_ENTRIES } from '@constants';

export async function fetchEntries(): Promise<Entry[]> {
  const res = await fetch(`${API_ENTRIES}`);
  if (!res.ok) throw new Error('Failed to fetch entries');
  return res.json();
}

export async function fetchEntry(id: string): Promise<Entry> {
  const res = await fetch(`${API_ENTRIES}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch entry');
  return res.json();
}

export async function createEntry(entry: Omit<Entry, 'id'>): Promise<Entry> {
  const res = await fetch(`${API_ENTRIES}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  if (!res.ok) throw new Error('Failed to create entry');
  return res.json();
}

export async function updateEntry(id: string, entry: Omit<Entry, 'id'>): Promise<Entry> {
  const res = await fetch(`${API_ENTRIES}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  if (!res.ok) throw new Error('Failed to update entry');
  return res.json();
}

export async function deleteEntry(id: string): Promise<void> {
  const res = await fetch(`${API_ENTRIES}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete entry');
}

export async function deleteAllEntries(): Promise<void> {
  const res = await fetch(`${API_ENTRIES}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete all entries') 
}
