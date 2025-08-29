import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from '@contexts'
import { AppContent } from '@navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
 
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}
