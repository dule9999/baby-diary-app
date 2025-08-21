import React, { useState } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { Button } from '@components'
import { Entry } from '@types';
import { formatNewEntryDate, saveEntry } from '@helpers'

type Props = NativeStackScreenProps<RootStackParamList, 'NewEntry'>

const NewEntryScreen: React.FC<Props> = ({ navigation }) => {
  const [newNote, setNewNote] = useState<string>('')



  const addNewEntry = async () => {
    if(!newNote) return

    const newEntry: Entry = {
      id: Date.now().toString(),
      date: formatNewEntryDate(new Date()),
      note: newNote,
    }

    await saveEntry(newEntry)
    setNewNote('')
  }

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
              title='ADD'
              style={styles.addNoteBtn}
              onPress={async () => {
                await addNewEntry()
                navigation.goBack()
              }}
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
