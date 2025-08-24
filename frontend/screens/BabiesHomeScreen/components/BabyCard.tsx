import React from "react"
import { View, Image, Text, StyleSheet } from "react-native"
import { Baby } from "@sharedTypes"

interface BabyCardProps {
  baby: Baby
}

const placeholderImg = require("../../../assets/baby_placeholder.png")

const BabyCard: React.FC<BabyCardProps> = ({ baby }) => {
  const imageSource = baby.img
    ? { uri: baby.img }
    : placeholderImg

  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{baby.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#eee",
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
})

export default BabyCard
