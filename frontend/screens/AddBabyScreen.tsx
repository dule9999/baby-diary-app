import React, { useState } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, TextInput, Alert, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@navigation'
import { Button } from '@components'
import { createBaby } from '@services'

type Props = NativeStackScreenProps<RootStackParamList, 'AddBaby'>

const AddBabyScreen: React.FC<Props> = ({ navigation, route }) => {
  const [name, setName] = useState('')
  const [img, setImg] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const addNewBaby = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Baby name is required")
      return
    }

    setLoading(true)
    try {
      await createBaby({ name, img, date_of_birth: dateOfBirth, blood_group: bloodGroup, address })
      Alert.alert("Success", "Baby added successfully")
      setName('')
      setImg('')
      setDateOfBirth('')
      setBloodGroup('')
      setAddress('')
      navigation.goBack()
    } catch (err: any) {
      console.error(err)
      Alert.alert("Error", err.message || "Failed to add baby")
    } finally {
      setLoading(false)
    }
  }

  const goBack = () => {
    navigation.goBack()
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
                text={loading ? "Adding..." : "ADD BABY"}
                style={styles.addBabyBtn}
                onPress={addNewBaby}
                disabled={loading}
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
