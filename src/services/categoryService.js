import { fetchCategories, createCategory } from '../api/categoryApi';
import { fetchSubCategories, createSubCategory } from '../api/subCategoryApi';

// Fetch all categories
export const getCategories = async () => {
  try {
    const categories = await fetchCategories();
    return categories;
  } catch (error) {
    console.error('Fetching categories failed:', error);
    throw error;
  }
};

// Fetch all subcategories
export const getSubCategories = async () => {
  try {
    const subCategories = await fetchSubCategories();
    return subCategories;
  } catch (error) {
    console.error('Fetching subcategories failed:', error);
    throw error;
  }
};

// Add a new category (Admin only)
export const addCategory = async (categoryData, token) => {
  try {
    const response = await createCategory(categoryData, token);
    return response;
  } catch (error) {
    console.error('Adding category failed:', error);
    throw error;
  }
};

// Add a new subcategory (Admin only)
export const addSubCategory = async (subCategoryData, token) => {
  try {
    const response = await createSubCategory(subCategoryData, token);
    return response;
  } catch (error) {
    console.error('Adding subcategory failed:', error);
    throw error;
  }
};
