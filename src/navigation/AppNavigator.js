import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import PaymentScreen from '../screens/PaymentScreen';
import AdminScreen from '../screens/AdminScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (!loading)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
  {!user ? (
    <>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </>
  ) : user.role === 'admin' ? (
    
    <Stack.Screen name="Admin" component={AdminScreen} />
  ) : user.token && user ? (
    
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product" component={ProfileScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </>
  ) : (
  
    <>
    
      <Stack.Screen name="Login" component={LoginScreen} />
    </>
  )}
</Stack.Navigator>


  );
};
