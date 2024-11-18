import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create a New Order
export const createOrder = async (orderData, token) => {
  const response = await axios.post(`${API_URL}/api/orders`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch All Orders
export const fetchOrders = async (token) => {
  const response = await axios.get(`${API_URL}/api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch Order by ID
export const fetchOrderById = async (id, token) => {
  const response = await axios.get(`${API_URL}/api/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
