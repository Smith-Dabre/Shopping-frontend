import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import api from '../services/api';

export default function AdminScreen() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const addProduct = async () => {
    try {
      await api.post('/products', { name, image, price });
      console.log("success");
      alert('Product added');
    } catch {
      console.log("fail");
      // alert('Error adding product');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Image URL" value={image} onChangeText={setImage} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <Button title="Add Product" onPress={addProduct} />
    </View>
  );
}
