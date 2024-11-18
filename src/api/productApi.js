import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch All Products
export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/api/products`);
  return response.data;
};

// Fetch Product by ID
export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_URL}/api/products/${id}`);
  return response.data;
};

// Create a New Product (Admin Only)
export const createProduct = async (productData, token) => {
  const response = await axios.post(`${API_URL}/api/products`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update Product
export const updateProduct = async (id, productData, token) => {
  const response = await axios.put(`${API_URL}/api/products/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete Product
export const deleteProduct = async (id, token) => {
  const response = await axios.delete(`${API_URL}/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

