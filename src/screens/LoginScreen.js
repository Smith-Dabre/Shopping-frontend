import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //   useEffect(() => {
  //   const checkUserSession = async () => {
  //     const token = await AsyncStorage.getItem('token');
  //     if (token) {
  //       console.log("works fine");
  //       navigation.replace('Home');
  //     } else {

  //       navigation.replace('Login');
  //     }
  //   };

  //   checkUserSession();
  // }, []);

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      // const { token, _id, name, role, email } = res.data;
      // await AsyncStorage.setItem('token', token);
      // await AsyncStorage.setItem('user', JSON.stringify({ _id, name, email, role }));
      
      login(res.data);
      console.log('User logged in with token:', res.data.token);
    } catch (err) {
      console.log(err);
      alert('Login failed');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#cdc2c2ff' }}>
      <View style={{ flex: 1, padding: 20, marginTop: 160 }}>
        <Text style={{ fontSize: 28, marginBottom: 20 }}>Login</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{ marginBottom: 30, borderBottomWidth: 1 }}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{ marginBottom: 30, borderBottomWidth: 1 }}
        />

        <View style={{ marginBottom: 20 }}>
          <Button title="Login" onPress={handleLogin} />
        </View>

        <View>
          <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
        </View>
      </View>
    </SafeAreaView>
  );
}
