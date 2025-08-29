import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { RootStackParamList } from '@navigation'
import { ScreenWrapper, Button, SnackType } from '@components'
import { Entry } from '@sharedTypes'
import { fetchEntry, updateEntry, deleteEntry } from '@services'
import { formatEntryDate } from '@helpers'
import { useGoBack } from '@hooks'
import { useSnackStore } from '@stores'
import { 
  cannotLoadEntryMsg, 
  updateEntrySuccessMsg, 
  updateEntryFailedMsg, 
  deleteEntrySuccessMsg, 
  deleteEntryFailedMsg 
} from '@constants'

type Props = NativeStackScreenProps<RootStackParamList, 'EntryDetail'>

const EntryDetailScreen: React.FC<Props> = ({ route }) => {
  const { babyId, entryId } = route.params
  const [entry, setEntry] = useState<Entry | null>(null)
  const [editedNote, setEditedNote] = useState<string>('')
  const goBack = useGoBack()
  const { showSnack } = useSnackStore()

  const loadEntry = async () => {
    try {
      const res = await fetchEntry(babyId, entryId)
      setEntry(res)
      setEditedNote(res.note || '')
    } catch (err) {
      console.error(err)
      showSnack(`${cannotLoadEntryMsg}${err}`, SnackType.Error)
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
      showSnack(updateEntrySuccessMsg, SnackType.Success)
    } catch (err) {
      console.error(err)
      showSnack(`${updateEntryFailedMsg}${err}`, SnackType.Error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteEntry(babyId, entryId)
      showSnack(deleteEntrySuccessMsg, SnackType.Success)
      goBack()
    } catch (err) {
      console.error(err)
      showSnack(deleteEntryFailedMsg, SnackType.Error)
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
