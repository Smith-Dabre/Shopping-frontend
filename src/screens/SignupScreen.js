import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, KeyboardAvoidingView, Platform, } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
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


        {/* Signup Form */}
        <View style={styles.form}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <View style={styles.buttonWrapper}>
            <Button title="Signup" onPress={handleSignup} color="#4CAF50" />
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              title="Back to Login"
              onPress={() => navigation.navigate('Login')}
              color="#2196F3"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
    marginBottom: 30,
    borderRadius: 60,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
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

