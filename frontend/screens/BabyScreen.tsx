import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "@navigation"
import { Button, ScreenWrapper } from "@components"

type Props = NativeStackScreenProps<RootStackParamList, "Baby">

const BabyScreen: React.FC<Props> = ({ route, navigation }) => {
  const { baby } = route.params

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Baby</Text>
      <Button text="Go Back" onPress={goBack} />
      <View style={styles.content}>
        <Text style={styles.name}>{baby.name}</Text>
        <Text>ID: {baby.id}</Text>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 16},
  content: {margin:20},
  name: { fontSize: 24, fontWeight: "bold" },
})

export default BabyScreen
