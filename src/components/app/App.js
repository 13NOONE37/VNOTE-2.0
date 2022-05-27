import React, { useState } from 'react';
import AppContext from 'store/AppContext';
import './App.css';
import './Themes.css';
import { useTranslation } from 'react-i18next';

import Main from 'Pages/main/Main';

export default function App() {
  //TODO: fix all overflow hidden in css. For example current solution doesn't work for modals
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
      lastEditDate: new Date(2022, 1, 1),
      color: 3,

      isTagged: false,
    },
    {
      id: 2,
      title: 'ZEJU POG',
      content: 'Note Content',
      date: new Date(2022, 4, 11),
      lastEditDate: new Date(2022, 1, 1),

      color: 1,
      isTagged: false,
    },
    {
      id: 3,
      title: 'Javascript / TypeScript Tips for good performance',
      content: 'Note Content',
      date: new Date(1984, 6, 11),
      lastEditDate: new Date(2022, 1, 1),

      color: 2,
      isTagged: true,
    },
    {
      id: 4,
      title: 'Javascript / TypeScript Tips for good performance',
      content: 'Note Content',
      date: new Date(),
      lastEditDate: new Date(2022, 1, 1),

      color: 3,
      isTagged: false,
    },
    {
      id: 5,
      title: 'Bomba na banie',
      content: `Note Content ggg yellow Markets firewallfe
  os quo. Cumque vero velit veritatis. Debitis assumenda velit non corporis amet quo aut. Repudiandae nihil velit quia reprehenderit nostrum nobis numquam.
      Soluta voluptatibus quo et quia officia aliquid rerum impedit. Nulla et omnis unde placeat at saepe magni. Saepe aut incidunt qui.
Consequatur optio eaque voluptas eos expedita deleniti. Qui dolore omnis ullam sapiente rem et delectus in. Vel recusandae harum non dolore autem.
 
Velit iure eos quo. Cumque vero velit veritatis. Debitis assumenda velit non corporis amet quo aut. Repudiandae nihil velit quia reprehenderit nostrum nobis numquam.
      
      Soluta voluptatibus quo et quia officia aliquid rerum impedit. Nulla et omnis unde placeat at saepe magni. Saepe aut incidunt qui.
 
Consequatur optio eaque voluptas eos expedita deleniti. Qui dolore omnis ullam sapiente rem et delectus in. Vel recusandae harum non dolore autem.
 
Velit iure eos quo. Cumque vero velit veritatis. Debitis assumenda velit non corporis amet quo aut. Repudiandae nihil velit quia reprehenderit nostrum nobis numquam.

      ed Developer Frozen`,
      date: new Date(),
      lastEditDate: new Date(2022, 1, 1),

      color: 4,
      isTagged: false,
    },
    {
      id: 6,
      title: 'Kinny Zimmer',
      content: 'Note Content',
      date: new Date(),
      lastEditDate: new Date(2022, 1, 1),

      color: 5,
      isTagged: false,
    },
    {
      id: 7,
      title: 'Marcin Dubiel vs Alberto',
      content: 'Note Content',
      date: new Date(),
      lastEditDate: new Date(2022, 1, 1),

      color: 4,
      isTagged: false,
    },
    {
      id: 8,
      title: 'Javascript / TypeScript Tips for good performance',
      content: 'Note Content',
      date: new Date(),
      lastEditDate: new Date(2022, 1, 1),

      color: 1,
      isTagged: false,
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
