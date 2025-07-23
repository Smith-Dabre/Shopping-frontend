import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

export default function SignupScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      login(res.data);
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 28, marginBottom: 20 }}>Signup</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ marginBottom: 10, borderBottomWidth: 1 }} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 10, borderBottomWidth: 1 }} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{ marginBottom: 20, borderBottomWidth: 1 }} />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}
