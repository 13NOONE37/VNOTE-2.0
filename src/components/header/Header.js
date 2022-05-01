import Logo from 'assets/Logo/Logo';
import React from 'react';
import './Header.css';

import Avatar from './Avatar/Avatar';
import SearchBar from './SearchBar/SearchBar';
import ThemeToggler from './ThemeToggler/ThemeToggler';
import useWindowSize from 'utils/useWindowSize';

export default function Header() {
  const size = useWindowSize();
  return (
    <header className="header">
      <Logo />
      <div className="searchAndTheme">
        {size.width > 750 && (
          <>
            <SearchBar />
            <ThemeToggler />
          </>
        )}
      </div>
      <Avatar />
    </header>
  );
}
