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
import {ScreenWrapper, EntryCard} from '@components'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { formatNewEntryDate } from '@/helpers/formatDate'

type Props = NativeStackScreenProps<RootStackParamList, 'Diary'>

interface Entry {
  id: string
  date: string
  note: string
}

const DiaryScreen: React.FC<Props> = ({ navigation }) => {
  const [entries, setEntries] = useState<Entry[]>([
    { id: '1', date: 'March 13th 2025, 09:30', note: 'First nap of the day' },
    { id: '2', date: 'April 7th 2025, 12:45', note: 'Fed 60ml formula' },
    { id: '3', date: 'August 18th 2025, 15:20', note: 'Played tummy time' },
  ])
  const [newNote, setNewNote] = useState('')

  const addEntry = () => {
    if (!newNote) return

    const newEntry: Entry = {
      id: (entries.length + 1).toString(),
      date: formatNewEntryDate(new Date()),
      note: newNote,
    }
    setEntries([newEntry, ...entries])
    setNewNote('')
  }

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Baby Diary</Text>
      <View style={styles.newEntryBtnHolder}>
        <Button title="New Entry" onPress={() => navigation.navigate('NewEntry')} />
      </View>
      {/* <TextInput
        style={styles.input}
        placeholder="Add a new note..."
        value={newNote}
        onChangeText={setNewNote}
      /> */}

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
        style={styles.entriesList}
      />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  newEntryBtnHolder: { marginTop: 12 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 8 },
  entriesList: { marginTop: 16 },
})

export default DiaryScreen
