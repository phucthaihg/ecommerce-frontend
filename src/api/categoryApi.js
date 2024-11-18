import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch All Categories
export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/api/categories`);
  return response.data;
};

// Create a New Category (Admin Only)
export const createCategory = async (categoryData, token) => {
  const response = await axios.post(`${API_URL}/api/categories`, categoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
