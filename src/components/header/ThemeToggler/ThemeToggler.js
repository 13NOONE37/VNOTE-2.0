import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import './ThemeToggler.css';
import { ReactComponent as Moon } from 'assets/Icons/moon.svg';
import { ReactComponent as Sun } from 'assets/Icons/sun.svg';
import { useTranslation } from 'react-i18next';

export default function ThemeToggler() {
  const { t } = useTranslation();

  const { theme, toggleTheme } = useContext(AppContext);
  return (
    <button
      className="themeToggler "
      onClick={toggleTheme}
      data-tooltip__bottom={t('ToggleTheme')}
    >
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
    </button>
  );
}
