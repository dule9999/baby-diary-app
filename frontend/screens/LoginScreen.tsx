import React, { useState } from 'react'
import { View, TextInput, Button, Alert } from 'react-native'
import { login } from '@services'
import { useAuth } from '@contexts'

const LoginScreen: React.FC<any> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthed } = useAuth();

  const onLogin = async () => {
    try {
      await login(email.trim(), password)
      setAuthed(true)
    } catch (e: any) {
      Alert.alert('Login failed', e.message)
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
        placeholder="Password" 
        secureTextEntry 
        onChangeText={setPassword} 
        value={password} 
      />
      <Button title="Login" onPress={onLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen
