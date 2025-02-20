import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Halak listája</Link></li>
        <li><Link to="/add-hal">Új hal felvétele</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
