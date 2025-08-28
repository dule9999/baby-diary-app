import { useNavigation, NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '@navigation'

export function useGoBack() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return () => navigation.goBack();
}
