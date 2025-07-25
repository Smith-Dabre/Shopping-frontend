import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { login, user } = useContext(AuthContext);

// const tokenData = async (userData) => {
//     console.log(userData);

//     const { token, _id, name, role, email } = userData;
//     await AsyncStorage.setItem('token', token);
//     setUser(userData);
//     // const saved = await AsyncStorage.getItem('token');
//     // console.log('Saved token:', saved); 

//   }

  const fetchCart = async () => {
    console.log("GET REQUEST CART", user.token);
    try {
      const res = await api.get('/cart', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      // console.log(res.data.userId);
      setCart(res.data.items || []);
    } catch (error) {
      console.log(user.token);
      console.error('Failed to fetch cart:', error);
    }
  };

  // Call fetchCart once when provider mounts
  useEffect(() => {
    // console.log("use effect working");
    fetchCart();
  }, []);

  // const addItem = (item) => {
  //   setCart((prev) => {
  //     const exists = prev.find(p => p.productId === item.productId);
  //     console.log(exists);
  //     if (exists) {
  //       return prev.map(p => p.productId === item.productId ? { ...p, quantity: p.quantity + 1 } : p);
  //     }
  //     return [...prev, { ...item, quantity: 1 }];
  //   });
  // };

  // const increment = (id) => {
  //   setCart((prev) =>
  //     prev.map(item => item.productId === id ? { ...item, quantity: item.quantity + 1 } : item)
  //   );
  // };

  // const decrement = (id) => {
  //   setCart((prev) =>
  //     prev.map(item => item.productId === id
  //       ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
  //       : item
  //     )
  //   );
  // };

  // const clearCart = () => setCart([]);


  
  const addItem = async (productId) => {
  console.log(productId);
    try{
      const res = await api.post('/cart/add', { productId },
        {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        // body: JSON.stringify({ productId })
      });
        fetchCart();
    } catch (error) {
        console.error('Failed to fetch cart:', error);
    }

    // await fetch('http://your-server-url/cart', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer yourToken'
    //   },
    //   body: JSON.stringify({ productId })
    // });
    // fetchCart();
  };

  const increment = async (productId) => {
    await fetch('http://your-server-url/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer yourToken'
      },
      body: JSON.stringify({ productId, action: 'increment' })
    });
    fetchCart();
  };

  const decrement = async (productId) => {
    await fetch('http://your-server-url/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer yourToken'
      },
      body: JSON.stringify({ productId, action: 'decrement' })
    });
    fetchCart();
  };

    const clearCart = async () => {
    await fetch('http://your-server-url/cart/clear', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer yourToken'
      }
    });
    fetchCart();
  };


  return (
    <CartContext.Provider value={{ cart, addItem, increment, decrement, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
