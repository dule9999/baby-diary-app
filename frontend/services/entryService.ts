import { Entry } from '@sharedTypes';
import { apiFetch } from './api';
import { getToken } from './auth';

// Fetch all entries for a baby
export async function fetchEntries(babyId: string): Promise<Entry[]> {
  const token = await getToken();
  return apiFetch(`/api/babies/${babyId}/entries`, {}, token || undefined);
}

// Fetch a single entry
export async function fetchEntry(babyId: string, entryId: string): Promise<Entry> {
  const token = await getToken();
  return apiFetch(`/api/babies/${babyId}/entries/${entryId}`, {}, token || undefined);
}

// Create entry
export async function createEntry(babyId: string, entry: Omit<Entry, 'id'>): Promise<Entry> {
  const token = await getToken();
  return apiFetch(`/api/babies/${babyId}/entries`, {
    method: 'POST',
    body: JSON.stringify(entry),
  }, token || undefined);
}

// Update entry
export async function updateEntry(
  babyId: string,
  entryId: string,
  noteUpdate: {note: string}
): Promise<Entry> {
  const token = await getToken();
  return apiFetch(`/api/babies/${babyId}/entries/${entryId}`, {
    method: 'PUT',
    body: JSON.stringify(noteUpdate),
  }, token || undefined);
}

// Delete entry
export async function deleteEntry(babyId: string, entryId: string): Promise<void> {
  const token = await getToken();
  return apiFetch(`/api/babies/${babyId}/entries/${entryId}`, {
    method: 'DELETE',
  }, token || undefined);
}

// Delete all entries
export async function deleteAllEntries(babyId: string): Promise<void> {
  const token = await getToken();
  return apiFetch(`/api/babies/${babyId}/entries`, {
    method: 'DELETE',
  }, token || undefined);
}
