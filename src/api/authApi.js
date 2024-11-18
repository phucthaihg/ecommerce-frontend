import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// User Registration
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, userData);
  return response.data;
};

// User Login
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, userData);
  return response.data;
};