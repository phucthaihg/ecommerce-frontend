import React from 'react';
import Header from './Layout/Header';
import Navbar from './Layout/Navbar';
import Footer from './Layout/Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
