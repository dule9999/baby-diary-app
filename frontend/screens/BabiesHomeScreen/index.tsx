import React from "react"
import { StyleSheet, Text } from "react-native"
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { ScreenWrapper } from "@components"
import BabiesList from "./components/BabiesList"

type Props = NativeStackScreenProps<RootStackParamList, 'BabiesHome'>

export const mockBabies = [
    {id: '1', name: 'Ogi', img: ''},
    {id: '2', name: 'Test Baby', img: ''},
]

const BabiesHomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <ScreenWrapper>
            <Text style={styles.title}>Babies Home Screen</Text>
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