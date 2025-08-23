import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../App"

type Props = NativeStackScreenProps<RootStackParamList, "Baby">

const BabyScreen: React.FC<Props> = ({ route }) => {
  const { baby } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{baby.name}</Text>
      <Text>ID: {baby.id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
})

export default BabyScreen
