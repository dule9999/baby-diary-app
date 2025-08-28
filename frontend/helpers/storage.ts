//CURRENTLY NOT IN USE; TRANSFERRED THIS LOGIC TO API

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entry } from '@sharedTypes';
import { DIARY_ENTRIES } from '@constants';

export const saveEntry = async (entry: Entry) => {
  try {
    const stored = await AsyncStorage.getItem(DIARY_ENTRIES);
    const entries: Entry[] = stored ? JSON.parse(stored) : [];
    const newEntries = [entry, ...entries];
    await AsyncStorage.setItem(DIARY_ENTRIES, JSON.stringify(newEntries));
  } catch (error) {
    console.error('Error saving entry', error);
  }
};

export const getEntries = async (): Promise<Entry[]> => {
  try {
    const stored = await AsyncStorage.getItem(DIARY_ENTRIES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading entries', error);
    return [];
  }
};

export const clearEntries = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(DIARY_ENTRIES);
  } catch (error) {
    console.error('Error clearing entries', error);
  }
};

export const updateEntry = async (updatedEntry: Entry): Promise<void> => {
  try {
    const stored = await AsyncStorage.getItem(DIARY_ENTRIES);
    const entries: Entry[] = stored ? JSON.parse(stored) : [];

    const newEntries = entries.map(e => e.id === updatedEntry.id ? updatedEntry : e);

    await AsyncStorage.setItem(DIARY_ENTRIES, JSON.stringify(newEntries));
  } catch (error) {
    console.error('Error updating entry', error);
  }
};

export const deleteEntry = async (id: string): Promise<void> => {
  try {
    const stored = await AsyncStorage.getItem(DIARY_ENTRIES);
    const entries: Entry[] = stored ? JSON.parse(stored) : [];
    const filtered = entries.filter(entry => entry.id !== id);
    await AsyncStorage.setItem(DIARY_ENTRIES, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting entry', error);
  }
};

