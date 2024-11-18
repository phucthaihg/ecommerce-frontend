import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import { CategoryContext } from '../contexts/CategoryContext';
import '../styles/SubCategoryPage.css';

const SubCategoryPage = () => {
  const { subCategoryId } = useParams();
  const { products, loading: productsLoading } = useContext(ProductContext);
  const { subCategories, loading: subCategoriesLoading } = useContext(CategoryContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState('');

  // Filter products based on the selected subcategory
  useEffect(() => {
    if (!productsLoading && !subCategoriesLoading && products.length > 0 && subCategories.length > 0) {
      const subCategory = subCategories.find((subCat) => subCat.id === subCategoryId);
      setSubCategoryName(subCategory ? subCategory.name : 'Unknown Subcategory');
      const filtered = products.filter((product) => product.subCategoryId === subCategoryId);
      setFilteredProducts(filtered);
    }
  }, [subCategoryId, products, subCategories, productsLoading, subCategoriesLoading]);

  if (productsLoading || subCategoriesLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="subcategory-page">
      <h2>{subCategoryName}</h2>
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in this subcategory.</p>
      )}
    </div>
  );
};

export default SubCategoryPage;
