import React from "react"
import { FlatList, TouchableOpacity, StyleSheet } from "react-native"
import BabyCard from "./BabyCard"
import { Baby } from "@sharedTypes"

interface BabiesListProps {
	babies: Baby[],
	navigateToBabyScreen: (baby: Baby) => void;
}

const BabiesList: React.FC<BabiesListProps> = ({ babies, navigateToBabyScreen }) => {
	return(
		<FlatList
				data={babies}
				keyExtractor={(baby) => baby.id}
				renderItem={({ item }) => (
						<TouchableOpacity
								onPress={() => navigateToBabyScreen(item)}
						>
								<BabyCard baby={item} />
						</TouchableOpacity>
						)}
				style={styles.babiesList}
		/>
	)
}

const styles = StyleSheet.create({
  babiesList: { marginTop: 16 },
})

export default BabiesList