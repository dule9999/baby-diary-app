import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider, useAuth } from '@contexts'
import { MainNavigator, AuthNavigator} from '@navigation'

const AppContent: React.FC = () => {
  const { authed } = useAuth()
  return authed ? <MainNavigator /> : <AuthNavigator />
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
}
