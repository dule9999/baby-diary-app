import React, { useState, useEffect } from 'react'
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { ScreenWrapper, Loader } from '@components'
import { useAuth } from '@contexts'
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withRepeat, 
  withTiming, 
  interpolateColor 
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

const LoginScreen: React.FC<any> = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const scale = useSharedValue(1)
  const progress = useSharedValue(0)

  // Animate gradient
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 4000 }),
      -1,
      true
    )
  }, [])

  const animatedBackground = useAnimatedStyle(() => {
    const color1 = interpolateColor(progress.value, [0, 1], ['#FFD6E0', '#FFB6C1']) // soft pink shades
    const color2 = interpolateColor(progress.value, [0, 1], ['#B3E5FC', '#81D4FA']) // soft blue shades
    return { colors: [color1, color2] } as any
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const onPressIn = () => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 200 })
  }

  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 })
  }

  const onLogin = async () => {
    setLoading(true)
    try {
      await login(email.trim(), password)
    } catch (e: any) {
      Alert.alert('Login failed', e.message)
    } finally {
      setLoading(false)
    }
  }

  const navigateToRegister = () => navigation.navigate('Register')

  if (loading) return <Loader />

  return (
    <ScreenWrapper style={styles.container}>
      {/* Animated Gradient Background */}
      <Animated.View style={[StyleSheet.absoluteFill, animatedBackground]}>
        <LinearGradient
          colors={['#FFD6E0', '#B3E5FC']}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* Animated Title */}
      <Animated.Text entering={FadeInDown.duration(600)} style={styles.title}>
        Baby Diary
      </Animated.Text>

      {/* Inputs */}
      <Animated.View entering={FadeInUp.delay(200).duration(600)}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
        />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400).duration(600)}>
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          style={styles.input}
        />
      </Animated.View>

      {/* Buttons */}
      <Animated.View entering={FadeInUp.delay(600).duration(600)} style={animatedStyle}>
        <TouchableOpacity
          style={styles.button}
          onPress={onLogin}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(800).duration(600)} style={animatedStyle}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={navigateToRegister}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Create Account
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '600', textAlign: 'center', marginBottom: 40 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonText: { color: '#fff', fontWeight: '600', textAlign: 'center', fontSize: 16 },
  secondaryButton: { backgroundColor: '#f1f1f1' },
  secondaryButtonText: { color: '#007bff' },
})

export default LoginScreen
