import React from "react"
import { StyleSheet, Text } from "react-native"
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { ScreenWrapper } from "@components"
import BabiesList from "./components/BabiesList"
import { Button } from "@components"

type Props = NativeStackScreenProps<RootStackParamList, 'BabiesHome'>

export const mockBabies = [
    {id: '1', name: 'Ogi', img: '', diary: []},
    {id: '2', name: 'Test Baby', img: '', diary: []},
]

const BabiesHomeScreen: React.FC<Props> = ({ navigation }) => {
    const navigateToAddBaby = () => {
        navigation.navigate('AddBaby')
    }

    return (
        <ScreenWrapper>
            <Text style={styles.title}>Babies Home Screen</Text>
            <Button 
                title="ADD BABY"
                onPress={navigateToAddBaby}
            />
            <BabiesList 
                babies={mockBabies} 
                navigateToBabyScreen={(baby) => navigation.navigate("Baby", { baby })} 
            />
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
})

export default BabiesHomeScreen