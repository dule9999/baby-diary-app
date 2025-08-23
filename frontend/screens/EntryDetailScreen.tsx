import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import { RootStackParamList } from '../App'
import { ScreenWrapper, Button } from '@components'
import { Entry } from '@types'
import { fetchEntry, updateEntry, deleteEntry } from '@services'

type Props = NativeStackScreenProps<RootStackParamList, 'EntryDetail'>

const EntryDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { entryId } = route.params
  const [entry, setEntry] = useState<Entry | null>(null)
  const [editedNote, setEditedNote] = useState<string>('')

  const loadEntry = async () => {
    try {
      const res = await fetchEntry(entryId)
      setEntry(res)
      setEditedNote(res.note || '')
    } catch (err) {
      console.error(err)
      Alert.alert("Error", "Could not load entry")
    }
  }

  useEffect(() => {
    loadEntry()
  }, [])

  const saveEditedEntry = async () => {
    if (!entry) return
    const updatedEntry: Entry = { ...entry, note: editedNote }

    try {
      const res = await updateEntry(entryId, updatedEntry)
      setEntry(res)
      Alert.alert("Success", "Entry updated successfully!")
    } catch (err) {
      console.error(err)
      Alert.alert("Error", "Failed to update entry")
    }
  }

  const handleDelete = async () => {
    try {
      await deleteEntry(entryId)
      Alert.alert("Success", "Entry deleted successfully!")
      navigation.goBack()
    } catch (err) {
      console.error(err)
      Alert.alert("Error", "Failed to delete entry")
    }
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
