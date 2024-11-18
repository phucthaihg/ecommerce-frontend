import React, { createContext, useState, useEffect } from 'react';
import { getCartItems, addItemToCart, removeItemFromCart, getStoredCart } from '../services/cartService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getStoredCart());
  const [loading, setLoading] = useState(false);

  // Fetch cart items from backend
  const loadCart = async (userId, token) => {
    setLoading(true);
    try {
      const items = await getCartItems(userId, token);
      setCart(items);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const handleAddToCart = async (userId, product, token) => {
    try {
      await addItemToCart(userId, product.id, product.quantity, token);
      setCart((prevCart) => [...prevCart, product]);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  // Remove item from cart
  const handleRemoveFromCart = async (userId, productId, token) => {
    try {
      await removeItemFromCart(userId, productId, token);
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, loadCart, handleAddToCart, handleRemoveFromCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};
