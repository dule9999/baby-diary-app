import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from '@contexts'
import { AppContent } from '@navigation'
 
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
}
