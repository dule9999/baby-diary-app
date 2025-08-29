import React, { useState } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@navigation'
import { Button, SnackType } from '@components'
import { createEntry } from '@services'
import { useGoBack } from '@hooks'
import { useSnackStore } from '@stores'
import { noteCannotBeEmptyMsg, createEntrySuccessMsg, createEntryFailedMsg } from '@constants'

type Props = NativeStackScreenProps<RootStackParamList, 'NewEntry'>

const NewEntryScreen: React.FC<Props> = ({ route, navigation }) => {
  const { baby } = route.params
  const [newNote, setNewNote] = useState<string>('')
  const goBack = useGoBack()
  const { showSnack } = useSnackStore()

  const addNewEntry = async () => {
    if (!newNote.trim()) {
      showSnack(noteCannotBeEmptyMsg, SnackType.Error)
      return
    }

    const newEntry = {
      date: new Date().toISOString(),
      note: newNote,
      babyId: baby.id,
    }

    try {
      await createEntry(baby.id, newEntry)
      setNewNote('')
      navigation.goBack()
      showSnack(createEntrySuccessMsg, SnackType.Success)
    } catch (err) {
      console.error(err)
      showSnack(`${createEntryFailedMsg}${err}`, SnackType.Error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={goBack}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.modal}>
            <TextInput
              style={styles.input}
              placeholder="Add a new note..."
              value={newNote}
              onChangeText={setNewNote}
            />
            <Button
              text='ADD'
              style={styles.addNoteBtn}
              onPress={addNewEntry}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    height: '70%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  button: {margin: 5},
  addNoteBtn: {
    backgroundColor: 'green'
  },
  cancelBtn: {
    backgroundColor: 'red',
  },
  input: { borderWidth: 1, padding: 8, marginBottom: 8, borderRadius: 8 },
})

export default NewEntryScreen
