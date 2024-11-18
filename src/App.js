import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';
import { CategoryProvider } from './contexts/CategoryContext';
import AppRoutes from './AppRoutes.js';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <CategoryProvider>
            <Router>
              <AppRoutes />
            </Router>
          </CategoryProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
