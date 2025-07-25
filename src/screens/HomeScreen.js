import React, { useEffect, useState, useContext } from 'react';
import { ToastAndroid } from 'react-native';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { addItem } = useContext(CartContext);
  const { logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

 const handleProduct = (item) => {
    console.log('Clicked item:', item);
    navigation.navigate('Product');
    // Navigate, show details, etc.
  };

  useEffect(() => {
    const res = api.get('/products').then(res => setProducts(res.data));
    // const pids = products.map(p => p._id);
    // console.log(pids);

    // addItem(products.map(p => p._id));

    // console.log("I want product ID",res.data);
    // addItem(res.data.productId);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Products</Text>

        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={styles.cartButton}
          >
            <Icon name="cart" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logout}
            style={styles.logoutButton}
          >
            <Icon name="log-out-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Products List */}
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity on onPress={() => handleProduct(item)} style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
            />

            <View style={styles.cardHeader}>
              <Text
                numberOfLines={1}
                style={styles.productName}
              >
                {item.name}
              </Text>

              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>

            <Text
              style={[
                styles.stock,
                { color: item.stock > 0 ? '#388e3c' : '#d32f2f' }
              ]}
            >
              {item.stock > 0 ? `In stock: ${item.stock}` : 'Out of stock'}
            </Text>

            <TouchableOpacity
              disabled={item.stock === 0}
              onPress={() => {
                // addItem({ productId: item._id, product: item });
                addItem({ productId: item._id});
                ToastAndroid.show('Item added to cart', ToastAndroid.SHORT);
              }}
              style={[
                styles.addButton,
                { backgroundColor: item.stock === 0 ? '#aaa' : '#6200ee' }
              ]}
            >
              <Text style={styles.addButtonText}>
                {item.stock === 0 ? 'Unavailable' : 'Add to Cart'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 20, // Note: gap might not be supported on all RN versions, you can replace with marginRight on first button if needed
  },
  cartButton: {
    backgroundColor: '#6200ee',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#6200ee',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: '#e53935',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#e53935',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  productImage: {
    height: 180,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6200ee',
  },
  stock: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});