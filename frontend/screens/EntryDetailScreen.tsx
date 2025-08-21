import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import { RootStackParamList } from '../App'
import { ScreenWrapper, Button } from '@components'
import { Entry } from '@types'
import { getEntries, saveEntry, deleteEntry, updateEntry } from '@helpers'

type Props = NativeStackScreenProps<RootStackParamList, 'EntryDetail'>

const EntryDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { entryId } = route.params
  const [entry, setEntry] = useState<Entry | null>(null)
  const [editedNote, setEditedNote] = useState<string>('')

  // Load entry from storage
  const loadEntry = async () => {
    const entries = await getEntries()
    const current = entries.find(e => e.id === entryId) || null
    setEntry(current)
    setEditedNote(current?.note || '')
  }

  useEffect(() => {
    loadEntry()
  }, [])

  const saveEditedEntry = async () => {
  if (!entry) return
  const updatedEntry: Entry = { ...entry, note: editedNote }

  try {
    await updateEntry(updatedEntry)
    setEntry(updatedEntry)
    Alert.alert('Success', 'Entry updated successfully!')
  } catch (err) {
    console.error(err)
    Alert.alert('Error', 'Failed to update entry.')
  }
}

  const handleDelete = async () => {
    await deleteEntry(entryId)
    navigation.goBack()
  }

  return (
    <ScreenWrapper>
      <Button title="Back" onPress={() => navigation.goBack()} style={styles.backBtn} />
      <Text style={styles.title}>Entry Detail</Text>
      {entry && (
        <View>
          <Text style={styles.date}>{entry.date}</Text>
          <TextInput
            style={styles.input}
            value={editedNote}
            onChangeText={setEditedNote}
            multiline
          />
          <Button title="Save" onPress={saveEditedEntry} style={styles.saveBtn} />
          <Button title="Delete" onPress={handleDelete} style={styles.deleteBtn} />
        </View>
      )}
      {!entry && <Text>Entry not found</Text>}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  date: { marginBottom: 8, fontSize: 16, color: '#555' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  backBtn: { marginBottom: 12, backgroundColor: '#888' },
  saveBtn: { backgroundColor: 'green', marginBottom: 8 },
  deleteBtn: { backgroundColor: 'red' },
})

export default EntryDetailScreen
