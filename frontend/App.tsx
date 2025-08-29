import React from 'react'
import { Snack } from '@components'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from '@contexts'
import { AppContent } from '@navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useSnackStore } from '@stores'

const queryClient = new QueryClient()
 
export default function App() {
  const { message, type, visible, hideSnack } = useSnackStore()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <AppContent />
          {visible && <Snack message={message} type={type} onDismiss={hideSnack} />}
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}
