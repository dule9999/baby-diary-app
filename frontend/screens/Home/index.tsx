import React, { useState, useCallback } from "react"
import { View, StyleSheet, Text, Image } from "react-native"
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useFocusEffect } from '@react-navigation/native'
import { RootStackParamList } from '@navigation'
import { ScreenWrapper } from "@components"
import BabiesList from "./components/BabiesList"
import { Button, Loader } from "@components"
import { userIcon } from "@assets"
import { getBabies } from "@services"

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [babies, setBabies] = useState([])
    const [loading, setLoading] = useState(true)

    useFocusEffect(
        useCallback(() => {
            let isActive = true
            const fetchBabies = async () => {
            setLoading(true) // start loader
            try {
                const data = await getBabies()
                if (isActive) setBabies(data)
                } catch (err) {
                    console.error('Failed to fetch babies', err)
                } finally {
                    if (isActive) setLoading(false) // stop loader
                }
            }

            fetchBabies()

            return () => {
                isActive = false // cleanup on blur
            }
        }, [])
    )

    const navigateToAddBaby = () => navigation.navigate('AddBaby')
    const navigateToProfile = () => navigation.navigate('Profile')

    if (loading) return <Loader />

    return (
        <ScreenWrapper>
            <Text style={styles.title}>Babies Home</Text>
            <View style={styles.btnsHolder}>
                <Button 
                    text="ADD BABY"
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