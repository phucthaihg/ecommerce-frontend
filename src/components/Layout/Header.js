import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>MyShop</h1>
        </Link>
        <div className="search-bar">
          <input type="text" placeholder="Search for products..." />
          <button>Search</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
