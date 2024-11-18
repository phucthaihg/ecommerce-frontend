import { fetchProducts, fetchProductById, createProduct, updateProduct, deleteProduct } from '../api/productApi';

// Fetch all products
export const getAllProducts = async () => {
  try {
    const products = await fetchProducts();
    return products;
  } catch (error) {
    console.error('Fetching products failed:', error);
    throw error;
  }
};

// Fetch product details by ID
export const getProductDetails = async (productId) => {
  try {
    const product = await fetchProductById(productId);
    return product;
  } catch (error) {
    console.error('Fetching product details failed:', error);
    throw error;
  }
};

// Create a new product (Admin only)
export const addProduct = async (productData, token) => {
  try {
    const newProduct = await createProduct(productData, token);
    return newProduct;
  } catch (error) {
    console.error('Creating product failed:', error);
    throw error;
  }
};

// Update an existing product (Admin only)
export const updateProductDetails = async (productId, productData, token) => {
  try {
    const updatedProduct = await updateProduct(productId, productData, token);
    return updatedProduct;
  } catch (error) {
    console.error('Updating product failed:', error);
    throw error;
  }
};

// Delete a product (Admin only)
export const removeProduct = async (productId, token) => {
  try {
    const response = await deleteProduct(productId, token);
    return response;
  } catch (error) {
    console.error('Deleting product failed:', error);
    throw error;
  }
};
