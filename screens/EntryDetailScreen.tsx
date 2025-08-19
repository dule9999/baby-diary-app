import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootStackParamList } from '../App'

type Props = NativeStackScreenProps<RootStackParamList, 'EntryDetail'>

const EntryDetailScreen: React.FC<Props> = ({ route }) => {
  const { entryId } = route.params

  // Later we’ll fetch entry details from context or storage. For now, just show the ID.
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entry Detail</Text>
      <Text>Entry ID: {entryId}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
})

export default EntryDetailScreen