import Logo from 'assets/Logo/Logo';
import React from 'react';
import './Header.css';

import Avatar from './Avatar/Avatar';
import SearchBar from './SearchBar/SearchBar';
import ThemeToggler from './ThemeToggler/ThemeToggler';

export default function Header() {
  return (
    <header className="header">
      <Logo />
      <div className="searchAndTheme">
        <SearchBar />
        <ThemeToggler />
      </div>
      <Avatar />
    </header>
  );
}
