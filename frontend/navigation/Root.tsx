import { useAuth } from '@contexts'
import { MainNavigator } from './MainStack'
import { AuthNavigator } from './AuthStack'
import { AuthStackParamList } from './AuthStack'
import { MainStackParamList } from './MainStack'

export type RootStackParamList = AuthStackParamList & MainStackParamList

export const AppContent: React.FC = () => {
  const { authed } = useAuth()
  return authed ? <MainNavigator /> : <AuthNavigator />
}