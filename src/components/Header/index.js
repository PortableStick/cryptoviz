import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar is-warning" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item home-link has-text-dark is-size-1-desktop is-size-3-tablet is-uppercase has-text-weight-semibold" to="/">CryptoViz</Link>
      </div>
    </nav>
  );
}

export default Header;
