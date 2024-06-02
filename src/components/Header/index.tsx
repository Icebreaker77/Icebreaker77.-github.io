import React from 'react';
import './Header.scss';
import Logo from '../Logo';

const Header: React.FC = () => (
  <header className="header">
    <a href="/" className="header__logo">
      <Logo />
    </a>
  </header>
);

export default Header;
