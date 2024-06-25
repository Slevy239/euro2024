// Header.js
import React from 'react';
import './Header.css'; // Import header styles

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src='/src/assets/UEFA_Euro_2024_Logo.svg.png' alt="Euro 2024 Logo" />
      </div>
      <h1 className="tournament-name">Euro 2024 Tournament</h1>
    </header>
  );
}

export default Header;
