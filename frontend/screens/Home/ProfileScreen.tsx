import React, { useState } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@navigation'
import { ScreenWrapper, Button, Loader } from "@components"
import { useAuth } from "@contexts"
import { userIcon } from "@assets"	
import { useGoBack } from "@hooks"

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>

const ProfileScreen: React.FC<Props> = () => {
		const [loading, setLoading] = useState(false)
    const { logout, user } = useAuth()
    const goBack = useGoBack()

    const doLogout = async () => {
        setLoading(true)
        // wait a tick so React can render Loader TODO Remove before publish
        setTimeout(async () => {
            try {
            await logout()
            } catch (err: any) {
            console.log('Error while logging out:', err)
            } finally {
            setLoading(false)
            }
        }, 400)
    }

    if(loading) return <Loader />

    return (
        <ScreenWrapper>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.buttonsContainer}>
                <Button text="Go Back" onPress={goBack} style={styles.goBackBtn}/>
                <Button text="Log Out" onPress={doLogout} style={styles.logOutBtn} disabled={loading} />
            </View>
            <View style={styles.card}>
                <Image 
                    source={user?.avatarUrl ? { uri: user.avatarUrl } : userIcon}
                    style={styles.avatar} 
                />
                <Text style={styles.username}>{user?.username}</Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    goBackBtn: {
        marginBottom: 12,
    },
    logOutBtn: {
        backgroundColor: '#E53E3E',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 40,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
})

export default ProfileScreen
