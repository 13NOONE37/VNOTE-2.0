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

  const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    } else if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua,
      )
    ) {
      return 'mobile';
    }
    return 'desktop';
  };
  const [isLogged, setIsLogged] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'POMPKA',
      content: 'Note Content',
      date: new Date(2022, 1, 1),
      color: 3,
    },
    {
      id: 2,
      title: 'ZEJU POG',
      content: 'Note Content',
      date: new Date(2022, 4, 11),
      color: 1,
    },
    {
      id: 3,
      title: 'Javascript / TypeScript Tips for good performance',
      content: 'Note Content',
      date: new Date(1984, 6, 11),
      color: 2,
    },
    {
      id: 4,
      title: 'Javascript / TypeScript Tips for good performance',
      content: 'Note Content',
      date: new Date(),
      color: 3,
    },
    {
      id: 5,
      title: 'Bomba na banie',
      content: 'Note Content',
      date: new Date(),
      color: 4,
    },
    {
      id: 6,
      title: 'Kinny Zimmer',
      content: 'Note Content',
      date: new Date(),
      color: 5,
    },
    {
      id: 7,
      title: 'Marcin Dubiel vs Alberto',
      content: 'Note Content',
      date: new Date(),
      color: 4,
    },
    {
      id: 8,
      title: 'Javascript / TypeScript Tips for good performance',
      content: 'Note Content',
      date: new Date(),
      color: 1,
    },
  ]);
  const [tags, setTags] = useState(['Books', 'JS Tips', 'TODO']);
  const [canBeSaved, setCanBeSaved] = useState(false);
  const [filterPhrase, setFilterPhrase] = useState('');
  return (
    <div className={`${theme === 'dark' ? 'darkMode' : 'lightMode'}`}>
      <AppContext.Provider
        value={{
          ua: deviceType(),
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
