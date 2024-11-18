import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import { CategoryContext } from '../contexts/CategoryContext';
import '../styles/Home.css';
import Layout from '../components/Layout';

const Home = () => {
  const { products, loading: productsLoading } = useContext(ProductContext);
  const { categories, loading: categoriesLoading } = useContext(CategoryContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Fetch featured products on component mount
  useEffect(() => {
    if (products.length > 0) {
      const featured = products.filter((product) => product.isFeatured);
      setFeaturedProducts(featured);
    }
  }, [products]);

  if (productsLoading || categoriesLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <h1>Welcome to MyShop</h1>
          <p>Discover the best products at unbeatable prices!</p>
          <Link to="/products" className="shop-now-button">
            Shop Now
          </Link>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <h2>Shop by Category</h2>
          <div className="categories-list">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.id}`} className="category-card">
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="featured-products-section">
          <h2>Featured Products</h2>
          <div className="products-list">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.imageUrl} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No featured products available.</p>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
