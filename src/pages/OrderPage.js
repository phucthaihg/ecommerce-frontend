import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { OrderContext } from '../contexts/OrderContext';
import '../styles/OrderPage.css';

const OrderPage = () => {
  const { orders, loading, handleGetOrderDetails } = useContext(OrderContext);
  const [error, setError] = useState(null);

  // Fetch orders on component mount
  useEffect(() => {
    if (orders.length === 0) {
      setError('No orders found. Start shopping to place your first order!');
    }
  }, [orders]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="order-page">
      <h2>Your Orders</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <Link to={`/order/${order.id}`} onClick={() => handleGetOrderDetails(order.id)}>
                <h3>Order ID: {order.id}</h3>
                <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Total Amount: ${order.totalAmount}</p>
                <p>Status: {order.status}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
