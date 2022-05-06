import React, { useState } from 'react';
import AppContext from 'store/AppContext';
import './App.css';
import './Themes.css';
import { useTranslation } from 'react-i18next';

import Main from 'Pages/main/Main';

export default function App() {
  const { i18n } = useTranslation();

  const [userInfo, setUserInfo] = useState({
    nickname: 'Nickname',
    gender: 'Female',
    email: 'test@gmail.com',
  });
  const [isLogged, setIsLogged] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [notes, setNotes] = useState([
    {
      title: 'Javascript / TypeScript Tips for good performance',
      content: 'Note Content',
      date: new Date(),
      color: 2,
    },
    {
      title: 'Javascript / TypeScript Tips for good performance',
      content: 'Note Content',
      date: new Date(),
      color: 3,
    },
    {
      title: 'Bomba na banie',
      content: 'Note Content',
      date: new Date(),
      color: 4,
    },
    {
      title: 'Kinny Zimmer',
      content: 'Note Content',
      date: new Date(),
      color: 5,
    },
    {
      title: 'Marcin Dubiel vs Alberto',
      content: 'Note Content',
      date: new Date(),
      color: 4,
    },
    {
      title: 'Javascript / TypeScript Tips for good performance',
      content: 'Note Content',
      date: new Date(),
      color: 1,
    },

    {
      title: 'Javascript / TypeScript Tips for good performance',
      content: 'Note Content',
      date: new Date(),
      color: 2,
    },
    {
      title: 'Javascript / TypeScript Tips for good performance',
      content: 'Note Content',
      date: new Date(),
      color: 3,
    },
    {
      title: 'Bomba na banie',
      content: 'Note Content',
      date: new Date(),
      color: 4,
    },
    {
      title: 'Kinny Zimmer',
      content: 'Note Content',
      date: new Date(),
      color: 5,
    },
    {
      title: 'Marcin Dubiel vs Alberto',
      content: 'Note Content',
      date: new Date(),
      color: 4,
    },
  ]);
  const [tags, setTags] = useState(['Books', 'JS Tips', 'TODO']);
  const [canBeSaved, setCanBeSaved] = useState(false);
  const [filterPhrase, setFilterPhrase] = useState('');
  return (
    <div className={`${theme === 'dark' ? 'darkMode' : 'lightMode'}`}>
      <AppContext.Provider
        value={{
          userInfo,
          setUserInfo,
          isLogged,
          setIsLogged,
          theme,
          toggleTheme: () => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
          },
          language,
          setLanguage: (value) => {
            i18n.changeLanguage(value);
            setLanguage(value);
          },
          filterPhrase,
          setFilterPhrase,
          notes,
          setNotes,
          tags,
          setTags,
          canBeSaved,
          setCanBeSaved,
        }}
      >
        <Main />
      </AppContext.Provider>
    </div>
  );
}
