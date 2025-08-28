import { useNavigation, NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '@navigation'

export const useNavigator = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const navigateToScreen = <T extends keyof RootStackParamList>(
    screen: T,
    params?: RootStackParamList[T]
  ) => {
    return () => {
      if (params) {
        navigation.navigate(screen as any, params as any)
      } else {
        navigation.navigate(screen as any)
      }
    }
  }

  return { navigateToScreen }
}


export function useGoBack() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return () => navigation.goBack();
}
