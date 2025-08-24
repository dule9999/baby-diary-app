import React, { useState } from 'react'
import { View, TextInput, Button, Alert } from 'react-native'
import { register } from '@services'
import { useAuth } from '@contexts'

const RegisterScreen: React.FC<any> = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setAuthed } = useAuth()

  const onRegister = async () => {
    try {
      await register(email.trim(), password, username.trim())
      setAuthed(true)
    } catch (e: any) {
      Alert.alert('Register failed', e.message)
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput 
        placeholder="Email" 
        autoCapitalize="none" 
        onChangeText={setEmail} 
        value={email} 
      />
      <TextInput 
        placeholder="Username" 
        onChangeText={setUsername} 
        value={username} 
      />
      <TextInput 
        placeholder="Password" 
        secureTextEntry 
        onChangeText={setPassword} 
        value={password} 
      />
      <Button title="Create account" onPress={onRegister} />
    </View>
  );
};

export default RegisterScreen
