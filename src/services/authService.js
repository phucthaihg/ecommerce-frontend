import { loginUser, registerUser } from '../api/authApi';
import { fetchUserProfile } from '../api/userApi';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'userData';

// Save token to localStorage
const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove token and user data from localStorage
export const clearStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Login function
export const login = async (credentials) => {
  try {
    const { token, user } = await loginUser(credentials);
    saveToken(token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return { token, user };
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// Register function
export const register = async (userData) => {
  try {
    const response = await registerUser(userData);
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

// Fetch user profile using the stored token
export const getUserProfile = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token found');
    const user = await fetchUserProfile(token);
    return user;
  } catch (error) {
    console.error('Fetching user profile failed:', error);
    throw error;
  }
};

// Logout function
export const logout = () => {
  clearStorage();
};
