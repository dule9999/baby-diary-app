import { useAuth } from '@contexts'
import { MainNavigator, AuthNavigator} from '@navigation'
import { AuthStackParamList, MainStackParamList } from '@navigation'

export type RootStackParamList = AuthStackParamList & MainStackParamList

export const AppContent: React.FC = () => {
  const { authed } = useAuth()
  return authed ? <MainNavigator /> : <AuthNavigator />
}