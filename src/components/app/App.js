import React, { useState } from 'react';
import AppContext from 'store/AppContext';
import './App.css';
import './Themes.css';
import { useTranslation } from 'react-i18next';

import Main from 'Pages/main/Main';

export default function App() {
  const { i18n } = useTranslation();

  const [isLogged, setIsLogged] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  return (
    <div className={`${theme === 'dark' ? 'darkMode' : 'lightMode'}`}>
      <AppContext.Provider
        value={{
          isLogged,
          setIsLogged,
          theme,
          toggleTheme: () => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
          },
          language,
          setLanguage: (value) => {
            i18n.changeLanguage(value);
          },
          notes,
          setNotes,
          tags,
          setTags,
        }}
      >
        <Main />
      </AppContext.Provider>
    </div>
  );
}
