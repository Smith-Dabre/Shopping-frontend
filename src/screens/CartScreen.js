import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { CartContext } from '../context/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen({ navigation }) {
  const { cart, increment, decrement, clearCart } = useContext(CartContext);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.productId.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.productId.name}</Text>
        <Text style={styles.price}>${item.productId.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.button} onPress={() => decrement(item.productId._id)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.button} onPress={() => increment(item.productId._id)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>😞 Your cart is empty.</Text>
          </View>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={item => item.productId._id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>

      {/* Footer always visible */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
          <Text style={styles.clearButtonText}>Clear Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton} onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  clearButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
