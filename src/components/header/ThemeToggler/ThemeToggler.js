import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import './ThemeToggler.css';
import { ReactComponent as Moon } from 'assets/Icons/moon.svg';
import { ReactComponent as Sun } from 'assets/Icons/sun.svg';

export default function ThemeToggler() {
  const { theme, toggleTheme } = useContext(AppContext);
  return (
    <div className="themeToggler" onClick={toggleTheme}>
      <div
        className="themeIcon"
        style={{
          transform: `${
            theme === 'dark' ? 'translateX(130%)' : 'translateX(20%)'
          }`,
        }}
      >
        {theme === 'dark' ? <Moon /> : <Sun />}
      </div>
    </div>
  );
}
