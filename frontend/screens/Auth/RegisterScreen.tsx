import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { ScreenWrapper, Loader } from '@components'
import { register as registerService } from '@services'
import { useAuth } from '@contexts'

const RegisterScreen: React.FC<any> = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const { login } = useAuth()

  const onRegister = async () => {
    setLoading(true)
    try {
      await registerService(email.trim(), password, username.trim())
      try {
        await login(email.trim(), password)
      } catch (loginErr: any) {
        Alert.alert('Could not log in after registration')
      }
      
    } catch (e: any) {
      Alert.alert('Register failed', e.message)
    } finally {
      setLoading(false)
    }
  }

  const navigateToLogin = () => navigation.navigate('Login')

  if (loading) return <Loader/>

  return (
    <ScreenWrapper style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={onRegister} disabled={loading}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={navigateToLogin}
        disabled={loading}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Back to Login
        </Text>
      </TouchableOpacity>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 40,
  },
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
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#f1f1f1',
  },
  secondaryButtonText: {
    color: '#007bff',
  },
});

export default RegisterScreen
