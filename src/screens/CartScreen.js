import React, { useContext } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const { cart, increment, decrement } = useContext(CartContext);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={cart}
        keyExtractor={item => item.productId}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <Text>{item.product.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Button title="-" onPress={() => decrement(item.productId)} />
              <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
              <Button title="+" onPress={() => increment(item.productId)} />
            </View>
          </View>
        )}
      />
      <Button title="Buy Now" onPress={() => navigation.navigate('Payment')} />
    </View>
  );
}
