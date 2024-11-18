import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import '../styles/CartPage.css';

const CartPage = () => {
  const { cart, handleRemoveFromCart, handleUpdateCartItem, handleClearCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate the total price whenever the cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cart]);

  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) return;
    handleUpdateCartItem(itemId, newQuantity);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <p>Your cart is empty. Start shopping to add items to your cart!</p>
        <Link to="/products" className="shop-now-button">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <div className="quantity-control">
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => handleRemoveFromCart(item.id)} className="remove-button">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        <button onClick={handleClearCart} className="clear-cart-button">Clear Cart</button>
        <button className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
