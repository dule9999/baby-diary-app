import React from "react"
import { View, Text, StyleSheet, Alert } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "@navigation"
import { Button, ScreenWrapper, SnackType } from "@components"
import { useGoBack } from "@hooks"
import { useDeleteBabyMutation } from "@reactquery"
import { useSnackStore } from "@stores"
import { 
  removeFromListSuccessMsg, 
  removeFromListFailedMsg, 
  deleteText, 
  cancelText, 
  removeBabyTittleMsg, 
  removeBabyTextMsg 
} from "@constants"

type Props = NativeStackScreenProps<RootStackParamList, "Baby">

const BabyScreen: React.FC<Props> = ({ route, navigation }) => {
  const { baby } = route.params
  const goBack = useGoBack()
  const deleteBabyMutation = useDeleteBabyMutation()
  const { showSnack } = useSnackStore()

  const handleDeleteBaby = () => {
    Alert.alert(
      removeBabyTittleMsg,
      removeBabyTextMsg,
      [
        { text: cancelText, style: "cancel" },
        {
          text: deleteText,
          style: "destructive",
          onPress: () =>  deleteBabyMutation.mutate(baby.id, {
            onSuccess: () => {
              showSnack(removeFromListSuccessMsg, SnackType.Success)
              goBack()
            },
            onError: (error) => {
              showSnack(`${removeFromListFailedMsg}${error.message}`, SnackType.Error)
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
