import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart((prev) => {
      const exists = prev.find(p => p.productId === item.productId);
      if (exists) {
        return prev.map(p => p.productId === item.productId ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increment = (id) => {
    setCart((prev) =>
      prev.map(item => item.productId === id ? { ...item, quantity: item.quantity + 1 } : item)
    );
  };

  const decrement = (id) => {
    setCart((prev) =>
      prev.map(item => item.productId === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addItem, increment, decrement, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
