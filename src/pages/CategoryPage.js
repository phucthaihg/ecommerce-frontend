import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CategoryContext } from '../contexts/CategoryContext';
import '../styles/CategoryPage.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { categories, subCategories, loading } = useContext(CategoryContext);
  const [categoryName, setCategoryName] = useState('');
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  useEffect(() => {
    if (!loading && categories.length > 0 && subCategories.length > 0) {
      const category = categories.find((cat) => cat.id === categoryId);
      setCategoryName(category ? category.name : 'Unknown Category');

      const filtered = subCategories.filter((subCat) => subCat.categoryId === categoryId);
      setFilteredSubCategories(filtered);
    }
  }, [categoryId, categories, subCategories, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="category-page">
      <h2>{categoryName}</h2>
      {filteredSubCategories.length > 0 ? (
        <div className="subcategory-list">
          {filteredSubCategories.map((subCat) => (
            <Link key={subCat.id} to={`/subcategory/${subCat.id}`} className="subcategory-card">
              <h3>{subCat.name}</h3>
            </Link>
          ))}
        </div>
      ) : (
        <p>No subcategories found.</p>
      )}
    </div>
  );
};

export default CategoryPage;
