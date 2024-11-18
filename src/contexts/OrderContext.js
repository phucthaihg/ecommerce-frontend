import React, { createContext, useState, useEffect } from 'react';
import { placeOrder, getOrders, getOrderDetails } from '../services/orderService';
import { getToken } from '../services/authService';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      const token = getToken();
      if (token) {
        try {
          const ordersData = await getOrders(token);
          setOrders(ordersData);
          setError(null);
        } catch (error) {
          setError('Failed to load orders.');
          console.error(error);
        }
      }
      setLoading(false);
    };
    loadOrders();
  }, []);

  const handlePlaceOrder = async (orderData) => {
    try {
      const token = getToken();
      const newOrder = await placeOrder(orderData, token);
      setOrders((prev) => [...prev, newOrder]);
      setError(null);
    } catch (error) {
      setError('Failed to place order.');
      console.error(error);
    }
  };

  const handleGetOrderDetails = async (orderId) => {
    try {
      const token = getToken();
      const details = await getOrderDetails(orderId, token);
      setOrderDetails(details);
    } catch (error) {
      setError('Failed to fetch order details.');
      console.error(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        orderDetails,
        loading,
        error,
        handlePlaceOrder,
        handleGetOrderDetails,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
