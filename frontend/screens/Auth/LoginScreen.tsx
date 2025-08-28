import React, { useState, useEffect } from 'react'
import { TextInput, StyleSheet, Alert } from 'react-native'
import { ScreenWrapper, Loader, BcgGradient, Button } from '@components'
import { useAuth } from '@contexts'
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
} from 'react-native-reanimated'

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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

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
      <BcgGradient
        progress={progress}
        colorsStart={['#FFD6E0', '#B3E5FC']}
        colorsEnd={['#FFB6C1', '#81D4FA']}
      />

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

      <Animated.View entering={FadeInUp.delay(600).duration(600)}>
        <Animated.View style={animatedStyle}>
          <Button
            text="Login"
            style={styles.button}
            onPress={onLogin}
          />
        </Animated.View>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(800).duration(600)}>
        <Animated.View style={animatedStyle}>
          <Button
            text="Create Account"
            textStyle={[styles.buttonText, styles.secondaryButtonText]}
            style={[styles.button, styles.secondaryButton]}
            onPress={navigateToRegister}
          />
        </Animated.View>
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
    alignSelf: 'auto',
    backgroundColor: '#007bff',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonText: { color: '#fff', fontWeight: '600', textAlign: 'center', fontSize: 16 },
  secondaryButton: { backgroundColor: '#f1f1f1' },
  secondaryButtonText: { color: '#007bff' },
})

export default LoginScreen