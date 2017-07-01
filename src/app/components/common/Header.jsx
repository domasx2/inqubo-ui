import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
          <Link className="logo" to="/">Inqubo</Link>
      </nav>
    </header>
  )
}

export default Header;
