// screens/SplashScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = () => {


  return (
    <View style={styles.container}>
      <Text style={styles.text}>SHOPEEE</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // You can change this color
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
});
