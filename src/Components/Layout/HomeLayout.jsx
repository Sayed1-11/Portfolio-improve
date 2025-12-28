// Components/Layout/HomeLayout.js
import React from 'react';
import Navigation from '../Navigation/Navigation';

const HomeLayout = ({ children }) => {
  return (
    <div className="home-layout">
      <Navigation />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default HomeLayout;