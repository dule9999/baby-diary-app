import React from "react"
import { View, Image, Text, StyleSheet } from "react-native"
import { Baby } from '@sharedTypes'

interface BabyCardProps {
    baby: Baby
}

const BabyCard: React.FC<BabyCardProps> = ({ baby }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: baby.img }} style={styles.image} />
            <Text style={styles.name}>{baby.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {margin: 5},
    image: {margin: 5},
    name: {fontSize: 16},
})

export default BabyCard