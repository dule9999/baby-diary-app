import * as SecureStore from 'expo-secure-store';
import { apiFetch } from './api';

const TOKEN_KEY = 'auth_token';

export async function register(email: string, password: string, username: string) {
  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, username }),
  });
  await SecureStore.setItemAsync(TOKEN_KEY, data.token);
  return data.user;
}

export async function login(email: string, password: string) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  await SecureStore.setItemAsync(TOKEN_KEY, data.token);
  return data.user;
}

export async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function logout() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
