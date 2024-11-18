import { createOrder, fetchOrders, fetchOrderById } from '../api/orderApi';

// Place a new order
export const placeOrder = async (orderData, token) => {
  try {
    const response = await createOrder(orderData, token);
    return response;
  } catch (error) {
    console.error('Placing order failed:', error);
    throw error;
  }
};

// Fetch all orders for the user
export const getOrders = async (token) => {
  try {
    const orders = await fetchOrders(token);
    return orders;
  } catch (error) {
    console.error('Fetching orders failed:', error);
    throw error;
  }
};

// Fetch order details by ID
export const getOrderDetails = async (orderId, token) => {
  try {
    const order = await fetchOrderById(orderId, token);
    return order;
  } catch (error) {
    console.error('Fetching order details failed:', error);
    throw error;
  }
};
