import React, { useContext, useState } from 'react';
import AppContext from 'store/AppContext';
import './App.css';
import './Themes.css';
import { useTranslation } from 'react-i18next';
import { Routes, Route, useNavigate } from 'react-router-dom';
import pages from 'Pages/Routes/Pages';

import Main from 'Pages/main/Main';
import Login from 'Pages/login/Login';

import NotFound from 'Pages/NotFound/NotFound';

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
  const [isLogged, setIsLogged] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Zakupy',
      content:
        '%3Cdiv%3EMleko%3C/div%3E%3Cdiv%3E%3Cbr%3E%3C/div%3E%3Cdiv%3EMas%C5%82o%3C/div%3E%3Cdiv%3E%3Cbr%3E%3C/div%3E%3Cdiv%3EChleb%3C/div%3E%3Cdiv%3E%3Cbr%3E%3C/div%3E',
      date: new Date(2003, 7, 12),
      lastEditDate: new Date(2003, 7, 12),
      color: 3,
      isDeleted: false,
      isListed: false,
      tags: { all: true },
      checkList: [],
      images: [],
      draws: [],
      recordings: [],
    },
    //     {
    //       id: 2,
    //       title: 'ZEJU POG',
    //       content: 'Note Content',
    //       date: new Date(2022, 4, 11),
    //       lastEditDate: new Date(2022, 1, 1),
    //       isDeleted: false,
    //       color: 1,
    //       isListed: false,
    //     },
    //     {
    //       id: 3,
    //       title: 'Javascript / TypeScript Tips for good performance',
    //       content: 'Note Content',
    //       date: new Date(1984, 6, 11),
    //       lastEditDate: new Date(2022, 1, 1),
    //       isDeleted: false,
    //       color: 2,
    //       isListed: true,
    //     },
    //     {
    //       id: 4,
    //       title: 'Javascript / TypeScript Tips for good performance',
    //       content: 'Note Content',
    //       date: new Date(),
    //       lastEditDate: new Date(2022, 1, 1),
    //       isDeleted: false,
    //       color: 3,
    //       isListed: false,
    //     },
    //     {
    //       id: 5,
    //       title: 'Bomba na banie',
    //       content: `Note Content ggg yellow Markets firewallfe
    //   os quo. Cumque vero velit veritatis. Debitis assumenda velit non corporis amet quo aut. Repudiandae nihil velit quia reprehenderit nostrum nobis numquam.
    //       Soluta voluptatibus quo et quia officia aliquid rerum impedit. Nulla et omnis unde placeat at saepe magni. Saepe aut incidunt qui.
    // Consequatur optio eaque voluptas eos expedita deleniti. Qui dolore omnis ullam sapiente rem et delectus in. Vel recusandae harum non dolore autem.

    // Velit iure eos quo. Cumque vero velit veritatis. Debitis assumenda velit non corporis amet quo aut. Repudiandae nihil velit quia reprehenderit nostrum nobis numquam.

    //       Soluta voluptatibus quo et quia officia aliquid rerum impedit. Nulla et omnis unde placeat at saepe magni. Saepe aut incidunt qui.

    // Consequatur optio eaque voluptas eos expedita deleniti. Qui dolore omnis ullam sapiente rem et delectus in. Vel recusandae harum non dolore autem.

    // Velit iure eos quo. Cumque vero velit veritatis. Debitis assumenda velit non corporis amet quo aut. Repudiandae nihil velit quia reprehenderit nostrum nobis numquam.

    //       ed Developer Frozen`,
    //       date: new Date(),
    //       lastEditDate: new Date(2022, 1, 1),
    //       isDeleted: false,
    //       color: 4,
    //       isListed: false,
    //     },
    //     {
    //       id: 6,
    //       title: 'Kinny Zimmer',
    //       content: 'Note Content',
    //       date: new Date(),
    //       lastEditDate: new Date(2022, 1, 1),
    //       isDeleted: false,
    //       color: 5,
    //       isListed: false,
    //     },
    //     {
    //       id: 7,
    //       title: 'Marcin Dubiel vs Alberto',
    //       content: 'Note Content',
    //       date: new Date(),
    //       lastEditDate: new Date(2022, 1, 1),
    //       isDeleted: false,
    //       color: 4,
    //       isListed: false,
    //     },
    //     {
    //       id: 8,
    //       title: 'Javascript / TypeScript Tips for good performance',
    //       content: 'Note Content',
    //       date: new Date(),
    //       lastEditDate: new Date(2022, 1, 1),
    //       isDeleted: false,
    //       color: 1,
    //       isListed: false,
    //     },
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
          addNewNote: (note) => {
            setNotes([...notes, note]);
          },
          tags,
          setTags,
          canBeSaved,
          setCanBeSaved,
        }}
      >
        <Routes>
          <Route path="*" element={<NotFound />} />
          {pages.map((page, pageIndex) => {
            return <Route path={page.path} element={page.element} />;
          })}
        </Routes>
        {/* <Main /> */}
        {/* <Login /> */}
      </AppContext.Provider>
    </div>
  );
}
const AuthRoute = ({ path, element }) => {
  const { isLogged } = useContext(AppContext);
  const navigate = useNavigate();

  if (isLogged == null) {
    return <Route path="/loading" element={<>Loading...</>} />;
  }
  if (isLogged) return <Route path={path} element={element} />;
  navigate('/login');
};
const GuestRoute = ({ path, element }) => {
  const { isLogged } = useContext(AppContext);
  const navigate = useNavigate();

  if (isLogged == null) {
    return <Route path="/loading" element={<>Loading...</>} />;
  }
  if (!isLogged) return <Route path={path} element={element} />;
  navigate('/');
};
