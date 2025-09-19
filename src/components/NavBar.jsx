import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget.jsx';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-bar-logo">
        <Link to="/" className="nav-link">Mi Tienda</Link>
      </div>

      <ul className="flex space-x-6">
        <li><Link to="/" className="nav-link">Inicio</Link></li>
        <li><Link to="/categoria/electronica" className="nav-link">Electrónica</Link></li>
        <li><Link to="/categoria/ropa" className="nav-link">Ropa</Link></li>
      </ul>

      <div className="flex items-center">
        <CartWidget />
      </div>
    </nav>
  );
};

export default NavBar;