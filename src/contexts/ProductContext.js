import React, { createContext, useState, useEffect } from 'react';
import {
  getAllProducts,
  getProductDetails,
  addProduct,
  updateProductDetails,
  removeProduct,
} from '../services/productService';
import { getToken } from '../services/authService';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products when the component mounts
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
        setError(null);
      } catch (error) {
        setError('Failed to load products.');
        console.error(error);
      }
      setLoading(false);
    };
    loadProducts();
  }, []);

  // Fetch product details by ID
  const handleGetProductDetails = async (productId) => {
    try {
      const product = await getProductDetails(productId);
      setProductDetails(product);
      setError(null);
    } catch (error) {
      setError('Failed to fetch product details.');
      console.error(error);
    }
  };

  // Add a new product (Admin only)
  const handleAddProduct = async (productData) => {
    try {
      const token = getToken();
      const newProduct = await addProduct(productData, token);
      setProducts((prev) => [...prev, newProduct]);
      setError(null);
    } catch (error) {
      setError('Failed to add product.');
      console.error(error);
    }
  };

  // Update an existing product (Admin only)
  const handleUpdateProduct = async (productId, productData) => {
    try {
      const token = getToken();
      const updatedProduct = await updateProductDetails(productId, productData, token);
      setProducts((prev) =>
        prev.map((product) => (product.id === productId ? updatedProduct : product))
      );
      setError(null);
    } catch (error) {
      setError('Failed to update product.');
      console.error(error);
    }
  };

  // Delete a product (Admin only)
  const handleRemoveProduct = async (productId) => {
    try {
      const token = getToken();
      await removeProduct(productId, token);
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      setError(null);
    } catch (error) {
      setError('Failed to remove product.');
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        productDetails,
        loading,
        error,
        handleGetProductDetails,
        handleAddProduct,
        handleUpdateProduct,
        handleRemoveProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
