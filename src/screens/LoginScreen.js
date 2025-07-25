import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, KeyboardAvoidingView, Platform, } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from '../context/CartContext';

export default function LoginScreen({ navigation }) {
  const { fetchCart } = useContext(CartContext);
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password }); 
      login(res.data);
      fetchCart(res.data);
      console.log('User logged in with token:', res.data.token);
    } catch (err) {
      console.log(err);
      alert('Login failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Logo */}
        <Image
          source={{ uri: 'https://i.imgur.com/u6IqC9q.png' }}
          style={styles.logo}
        />

        {/* Login Form */}
        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <View style={styles.buttonWrapper}>
            <Button title="Login" onPress={handleLogin} color="#4CAF50" />
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              title="Signup"
              onPress={() => navigation.navigate('Signup')}
              color="#2196F3"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cdc2c2ff',
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    marginBottom: 40,
    borderRadius: 60,
    backgroundColor: '#eee',
  },
  form: {
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#555',
    paddingVertical: 10,
    marginBottom: 30,
    fontSize: 16,
  },
  buttonWrapper: {
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
