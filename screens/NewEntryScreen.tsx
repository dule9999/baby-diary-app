import React from 'react'
import { View, Text, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import ScreenWrapper from '@/components/ScreenWrapper'

type Props = NativeStackScreenProps<RootStackParamList, 'NewEntry'>

const NewEntryScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.modal}>
            <Text style={styles.title}>Add New Entry</Text>

            <Pressable
              style={styles.button}
              onPress={() => {
                navigation.goBack()
                navigation.navigate('NewEntry')
              }}
            >
              <Text>Add Note</Text>
            </Pressable>

            <Pressable
              style={styles.button}
              onPress={() => console.log('Add Feed or Nap')}
            >
              <Text>Add Feed</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={() => navigation.goBack()}
            >
              <Text>Cancel</Text>
            </Pressable>
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
  button: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f88',
  },
})

export default NewEntryScreen
