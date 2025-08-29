import React from "react"
import { View, StyleSheet, Text, Image } from "react-native"
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@navigation'
import { ScreenWrapper } from "@components"
import BabiesList from "./components/BabiesList"
import { Button, Loader } from "@components"
import { userIcon } from "@assets"
import { useBabiesQuery } from "@reactquery"

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen: React.FC<Props> = ({ navigation }) => {
	const { data: babies = [], isLoading } = useBabiesQuery()

	const navigateToAddBaby = () => navigation.navigate('AddBaby')
	const navigateToProfile = () => navigation.navigate('Profile')

	if (isLoading) return <Loader testID='loader'/>

	return (
		<ScreenWrapper>
			<Text style={styles.title}>Babies Home</Text>
			<View style={styles.btnsHolder}>
				<Button 
					text="ADD BABY"
					onPress={navigateToAddBaby}
					style={styles.addBabyBtn}
					testID="add-baby-btn"
				/>
				<Button 
					onPress={navigateToProfile} 
					style={styles.profileBtn}
					testID="profile-btn"
				>
					<Image source={userIcon} style={styles.profileImg} />
				</Button>
			</View>
			
			{babies.length !== 0 ?
				<BabiesList 
					babies={babies} 
					navigateToBabyScreen={(baby) => navigation.navigate("Baby", { baby })} 
				/>
				:
				<Text style={styles.noBabiesCurrentlyText}>No babies added currently.</Text>
			}
		</ScreenWrapper>
	)
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  btnsHolder: {flexDirection: 'row', justifyContent: 'space-between'},
  addBabyBtn: {backgroundColor: 'green'},
  profileBtn: {width: 46, height: 46, borderRadius: 23, padding: 0, backgroundColor: 'beige'},
  profileImg: {width: 30, height: 30},
  noBabiesCurrentlyText: {fontSize: 20, margin: 20, textAlign: 'center'}
})

export default HomeScreen