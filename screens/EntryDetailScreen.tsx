import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { RootStackParamList } from '../App'
import { ScreenWrapper } from '@components'

type Props = NativeStackScreenProps<RootStackParamList, 'EntryDetail'>

const EntryDetailScreen: React.FC<Props> = ({ route }) => {
  const { entryId } = route.params

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Entry Detail</Text>
      <Text>Entry ID: {entryId}</Text>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
})

export default EntryDetailScreen