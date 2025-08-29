import React, { useState } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@navigation'
import { Button, SnackEnum } from '@components'
import { useGoBack } from '@hooks'
import { useCreateBabyMutation } from '@reactquery'
import { addBabySuccessMsg, addBabyFailureMsg, addBabyNameReqMsg } from '@constants'
import { useSnackStore } from '@stores'

type Props = NativeStackScreenProps<RootStackParamList, 'AddBaby'>

const AddBabyScreen: React.FC<Props> = () => {
  const [name, setName] = useState('')
  const [img, setImg] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [address, setAddress] = useState('')
  const goBack = useGoBack()
  const createBabyMutation = useCreateBabyMutation()
  const { showSnack } = useSnackStore()

  const addNewBaby = () => {
    if (!name.trim()) {
      showSnack(addBabyNameReqMsg, SnackEnum.Info)
      return
    }
    createBabyMutation.mutate({ name, img, date_of_birth: dateOfBirth, blood_group: bloodGroup, address }, {
      onSuccess: () => {
        goBack()
        showSnack(addBabySuccessMsg, SnackEnum.Success)
      },
      onError: (err: any) => {
        console.error(err)
        showSnack(err.message || addBabyFailureMsg, SnackEnum.Error)
      },
    })
  }

  return (
    <TouchableWithoutFeedback onPress={goBack}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.modal}>
            <ScrollView>
              <TextInput
                style={styles.input}
                placeholder="Baby Name *"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Image URL"
                value={img}
                onChangeText={setImg}
              />
              <TextInput
                style={styles.input}
                placeholder="Date of Birth (YYYY-MM-DD)"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
              />
              <TextInput
                style={styles.input}
                placeholder="Blood Group"
                value={bloodGroup}
                onChangeText={setBloodGroup}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
              />
              <Button
                text={createBabyMutation.isPending ? "Adding..." : "ADD BABY"}
                style={styles.addBabyBtn}
                onPress={addNewBaby}
                disabled={createBabyMutation.isPending}
              />
            </ScrollView>
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
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  addBabyBtn: {
    backgroundColor: 'green',
    marginTop: 10,
  },
})

export default AddBabyScreen
