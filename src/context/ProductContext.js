import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

const handleProduct = (item) => {
    console.log('Clicked item:', item);
    navigation.navigate('Product');
    // Navigate, show details, etc.
  };


  const login = async (userData) => {
    console.log(userData);

    const { token, _id, name, role, email } = userData;
    await AsyncStorage.setItem('token', token);
    setUser(userData);
    // const saved = await AsyncStorage.getItem('token');
    // console.log('Saved token:', saved); 

  }

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('token');
  }

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setUser({ token });
        }
      } catch (err) {
        console.error('Failed to load token', err);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);



  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
