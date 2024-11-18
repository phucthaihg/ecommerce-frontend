import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch User Profile
export const fetchUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/api/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update User Profile
export const updateUserProfile = async (userData, token) => {
  const response = await axios.put(`${API_URL}/api/users/profile`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch All Users (Admin Only)
export const fetchAllUsers = async (token) => {
  const response = await axios.get(`${API_URL}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete User (Admin Only)
export const deleteUser = async (userId, token) => {
  const response = await axios.delete(`${API_URL}/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Change User Password
export const changeUserPassword = async (passwordData, token) => {
  const response = await axios.put(`${API_URL}/api/users/change-password`, passwordData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
