import React from "react"
import { View, StyleSheet, Text, Image } from "react-native"
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@navigation'
import { ScreenWrapper } from "@components"
import BabiesList from "./components/BabiesList"
import { Button } from "@components"
import { userIcon } from "@assets"

type Props = NativeStackScreenProps<RootStackParamList, 'BabiesHome'>

export const mockBabies = [
    {id: '1', name: 'Ogi', img: '', diary: []},
    {id: '2', name: 'Test Baby', img: '', diary: []},
]

const BabiesHomeScreen: React.FC<Props> = ({ navigation }) => {


    const navigateToAddBaby = () => {
        navigation.navigate('AddBaby')
    }

    const navigateToProfile = () => {
        navigation.navigate('Profile')
    }

    return (
        <ScreenWrapper>
            <Text style={styles.title}>Babies Home Screen</Text>
            <View style={styles.btnsHolder}>
                <Button 
                    title="ADD BABY"
                    onPress={navigateToAddBaby}
                    style={styles.addBabyBtn}
                />
                <Button 
                    onPress={navigateToProfile} 
                    style={styles.profileBtn} 
                >
                    <Image source={userIcon} style={styles.profileImg} />
                </Button>
            </View>
            
            <BabiesList 
                babies={mockBabies} 
                navigateToBabyScreen={(baby) => navigation.navigate("Baby", { baby })} 
            />
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  btnsHolder: {flexDirection: 'row', justifyContent: 'space-between'},
  addBabyBtn: {backgroundColor: 'green'},
  profileBtn: {width: 46, height: 46, borderRadius: 23, padding: 0, backgroundColor: 'beige'},
  profileImg: {width: 30, height: 30}
})

export default BabiesHomeScreen