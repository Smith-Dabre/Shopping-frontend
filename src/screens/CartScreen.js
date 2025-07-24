import React, { useContext } from 'react';
import { View, Text, FlatList, Button, Image } from 'react-native';
import { CartContext } from '../context/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen({ navigation }) {
  const { cart, increment, decrement, clearCart } = useContext(CartContext);

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={cart}
        keyExtractor={item => item.productId}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <Text>{item.product.name}</Text>
            <Image source={{ uri: item.image }} style={{ height: 20, borderRadius: 10, backgroundColor:'red' }} />
            <View style={{ flexDirection: 'row' }}>
              <Button title="-" onPress={() => decrement(item.productId)} />
              <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
              <Button title="+" onPress={() => increment(item.productId)} />
            </View>
          </View>
        )}
      />
      <Button title="Clear Cart" onPress={() => clearCart()} />
      <Button title="Buy Now" onPress={() => navigation.navigate('Payment')} />
    </SafeAreaView>
  );
}
