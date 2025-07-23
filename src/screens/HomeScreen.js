import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const { addItem } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data));
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 10 }} onPress={() => navigation.navigate('Cart')}>
        <Icon name="cart" size={30} />
      </TouchableOpacity>
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 5, backgroundColor: '#f5f5f5', borderRadius: 10, padding: 10 }}>
            <Image source={{ uri: item.image }} style={{ height: 100, borderRadius: 10 }} />
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 5 }}>{item.name}</Text>
            <TouchableOpacity onPress={() => addItem({ productId: item._id, product: item })} style={{ backgroundColor: '#6200ee', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
