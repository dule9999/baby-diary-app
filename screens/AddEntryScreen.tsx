import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import { RootStackParamList } from '../App'

type Props = NativeStackScreenProps<RootStackParamList, 'AddEntry'>

const AddEntryScreen: React.FC<Props> = ({ navigation }) => {
  const [note, setNote] = useState('')

  const saveEntry = () => {
    // For now just log. Later we'll pass data back with context or params.
    console.log('New entry saved:', note)
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write a note..."
        value={note}
        onChangeText={setNote}
      />
      <Button title="Save Entry" onPress={saveEntry} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderRadius: 8, padding: 8, marginBottom: 12 },
})

export default AddEntryScreen