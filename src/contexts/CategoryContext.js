import React, { createContext, useState, useEffect } from 'react';
import { getCategories, getSubCategories, addCategory, addSubCategory } from '../services/categoryService';
import { getToken } from '../services/authService';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        const subCategoriesData = await getSubCategories();
        setCategories(categoriesData);
        setSubCategories(subCategoriesData);
        setError(null);
      } catch (error) {
        setError('Failed to load categories and subcategories.');
        console.error(error);
      }
      setLoading(false);
    };
    loadCategories();
  }, []);

  const handleAddCategory = async (categoryData) => {
    try {
      const token = getToken();
      const newCategory = await addCategory(categoryData, token);
      setCategories((prev) => [...prev, newCategory]);
    } catch (error) {
      setError('Failed to add new category.');
      console.error(error);
    }
  };

  const handleAddSubCategory = async (subCategoryData) => {
    try {
      const token = getToken();
      const newSubCategory = await addSubCategory(subCategoryData, token);
      setSubCategories((prev) => [...prev, newSubCategory]);
    } catch (error) {
      setError('Failed to add new subcategory.');
      console.error(error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        subCategories,
        loading,
        error,
        handleAddCategory,
        handleAddSubCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
