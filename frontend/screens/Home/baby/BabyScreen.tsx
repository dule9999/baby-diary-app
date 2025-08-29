import React from "react"
import { View, Text, StyleSheet, Alert } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "@navigation"
import { Button, ScreenWrapper } from "@components"
import { useGoBack } from "@hooks"
import { useDeleteBabyMutation } from "@reactquery"

type Props = NativeStackScreenProps<RootStackParamList, "Baby">

const BabyScreen: React.FC<Props> = ({ route, navigation }) => {
  const { baby } = route.params
  const goBack = useGoBack()
  const deleteBabyMutation = useDeleteBabyMutation()

  const handleDeleteBaby = () => {
    Alert.alert(
      "Remove Baby",
      "Are you sure you want to remove this baby from the list?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>  deleteBabyMutation.mutate(baby.id, {
            onSuccess: () => {
              Alert.alert("Success", "Baby removed from the list successfully")
              goBack()
            },
            onError: () => {
              Alert.alert("Error", "Failed to remove the baby from the list")
            },
          })
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
