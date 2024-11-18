import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch All SubCategories
export const fetchSubCategories = async () => {
  const response = await axios.get(`${API_URL}/api/subcategories`);
  return response.data;
};

// Create a New SubCategory (Admin Only)
export const createSubCategory = async (subCategoryData, token) => {
  const response = await axios.post(`${API_URL}/api/subcategories`, subCategoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
