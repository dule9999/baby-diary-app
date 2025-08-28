import React from "react"
import { View, Text, StyleSheet, Alert } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "@navigation"
import { Button, ScreenWrapper } from "@components"
import { deleteBaby } from "@services"
import { useGoBack } from "@hooks"

type Props = NativeStackScreenProps<RootStackParamList, "Baby">

const BabyScreen: React.FC<Props> = ({ route, navigation }) => {
  const { baby } = route.params
  const goBack = useGoBack()

  const handleDeleteBaby = async () => {
    Alert.alert(
      'Delete Baby',
      'Are you sure you want to delete this baby?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteBaby(baby.id)
              goBack()
            } catch (err) {
              console.error(err)
              Alert.alert('Error', 'Failed to delete baby')
            }
          },
        },
      ]
    )
  }

  const navigateToDiary = () => navigation.navigate('Diary', {baby})

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Baby {baby.name}</Text>
      <View style={styles.btnsHolder}>
        <Button text="Go Back" onPress={goBack} />
        <Button text="Remove" onPress={handleDeleteBaby} style={styles.removeBabyBtn} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>Name: {baby.name}</Text>
        <Text>ID: {baby.id}</Text>
      </View>

      <Button text="Open Diary" onPress={navigateToDiary} />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 16},
  btnsHolder: {flexDirection: 'row', justifyContent: 'space-between'},
  removeBabyBtn: {backgroundColor: 'red'},
  content: {margin:20},
  name: { fontSize: 24, fontWeight: "bold" },
})

export default BabyScreen
