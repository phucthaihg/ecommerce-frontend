import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch Cart Items
export const fetchCartItems = async (userId, token) => {
  const response = await axios.get(`${API_URL}/api/carts/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Add Item to Cart
export const addToCart = async (userId, productId, quantity, token) => {
  const response = await axios.post(
    `${API_URL}/api/carts/add`,
    { userId, productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Remove Item from Cart
export const removeFromCart = async (userId, productId, token) => {
  const response = await axios.delete(`${API_URL}/api/carts/remove`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { userId, productId },
  });
  return response.data;
};
