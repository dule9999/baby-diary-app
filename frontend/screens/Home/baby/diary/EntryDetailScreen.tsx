import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import { RootStackParamList } from '@navigation'
import { ScreenWrapper, Button } from '@components'
import { Entry } from '@sharedTypes'
import { fetchEntry, updateEntry, deleteEntry } from '@services'
import { formatEntryDate } from '@helpers'
import { useGoBack } from '@hooks'

type Props = NativeStackScreenProps<RootStackParamList, 'EntryDetail'>

const EntryDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { babyId, entryId } = route.params
  const [entry, setEntry] = useState<Entry | null>(null)
  const [editedNote, setEditedNote] = useState<string>('')
  const goBack = useGoBack()

  const loadEntry = async () => {
    try {
      const res = await fetchEntry(babyId, entryId)
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

    try {
      const updatedEntry = await updateEntry(babyId, entryId, { note: editedNote})
      setEntry(updatedEntry)
      Alert.alert("Success", "Entry updated successfully!")
    } catch (err) {
      console.error(err)
      Alert.alert("Error", "Failed to update entry")
    }
  }

  const handleDelete = async () => {
    try {
      await deleteEntry(babyId, entryId)
      Alert.alert("Success", "Entry deleted successfully!")
      goBack()
    } catch (err) {
      console.error(err)
      Alert.alert("Error", "Failed to delete entry")
    }
  }

  return (
    <ScreenWrapper>
      <Button text="Back" onPress={goBack} style={styles.backBtn} />
      <Text style={styles.title}>Entry Detail</Text>
      {entry ? (
        <View>
          <Text style={styles.date}>{formatEntryDate(entry.date)}</Text>
          <TextInput
            style={styles.input}
            value={editedNote}
            onChangeText={setEditedNote}
            multiline
          />
          <Button text="Save" onPress={saveEditedEntry} style={styles.saveBtn} />
          <Button text="Delete" onPress={handleDelete} style={styles.deleteBtn} />
        </View>
      ) : (
        <Text>Entry not found</Text>
      )}
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
