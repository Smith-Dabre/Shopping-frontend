import React from 'react';
import { View, Text, Button } from 'react-native';

export default function PaymentScreen({ navigation }) {
  const handlePayment = () => {
    alert('Payment successful! (Simulated)');
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Payment Page</Text>
      <Button title="Simulate Payment" onPress={handlePayment} />
    </View>
  );
}
