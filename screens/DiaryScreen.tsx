import EntryCard from '@/components/EntryCard'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { RootStackParamList } from '../App'

type Props = NativeStackScreenProps<RootStackParamList, 'Diary'>

interface Entry {
  id: string
  date: string
  note: string
}

const DiaryScreen: React.FC<Props> = ({ navigation }) => {
  const [entries, setEntries] = useState<Entry[]>([
    { id: '1', date: '2025-08-18', note: 'First nap of the day' },
    { id: '2', date: '2025-08-18', note: 'Fed 60ml formula' },
    { id: '3', date: '2025-08-18', note: 'Played tummy time' },
  ])
  const [newNote, setNewNote] = useState('')

  const addEntry = () => {
    if (!newNote) return
    const newEntry: Entry = {
      id: (entries.length + 1).toString(),
      date: new Date().toISOString().slice(0, 10),
      note: newNote,
    }
    setEntries([newEntry, ...entries])
    setNewNote('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Baby Diary</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new note..."
        value={newNote}
        onChangeText={setNewNote}
      />
      <Button title="Add Entry" onPress={addEntry} />

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EntryDetail', { entryId: item.id })
            }
          >
            <EntryCard entry={item} />
          </TouchableOpacity>
        )}
        style={{ marginTop: 16 }}
      />

      {/* Optional: navigate to a separate AddEntry screen */}
      {/* <View style={{ marginTop: 12 }}>
        <Button title="Go to Add Entry screen" onPress={() => navigation.navigate('AddEntry')} />
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 8 },
})

export default DiaryScreen
