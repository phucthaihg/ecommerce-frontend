import { fetchCartItems, addToCart, removeFromCart } from '../api/cartApi';

const CART_KEY = 'cartData';

// Save cart to localStorage
const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Get cart from localStorage
export const getStoredCart = () => {
  const storedCart = localStorage.getItem(CART_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
};

// Fetch cart items from backend
export const getCartItems = async (userId, token) => {
  const response = await fetchCartItems(userId, token);
  saveCart(response);
  return response;
};

// Add item to cart
export const addItemToCart = async (userId, productId, quantity, token) => {
  const response = await addToCart(userId, productId, quantity, token);
  return response;
};

// Remove item from cart
export const removeItemFromCart = async (userId, productId, token) => {
  const response = await removeFromCart(userId, productId, token);
  return response;
};
