import * as SecureStore from 'expo-secure-store';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getToken } from '@services';

interface AuthContextType {
  authed: boolean;
  setAuthed: (value: boolean) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setAuthed(!!token);
      setReady(true);
    })();
  }, []);

  const logout = async () => {
    await SecureStore.deleteItemAsync('auth_token'); // remove token
    setAuthed(false); // switch back to AuthNavigator
  };

  if (!ready) return null;

  return (
    <AuthContext.Provider value={{ authed, setAuthed, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
