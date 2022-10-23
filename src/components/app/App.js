import React, { useEffect, useState } from 'react';
import AppContext from 'store/AppContext';
import './App.css';
import './Themes.css';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
import pages from 'Pages/Routes/Pages';

import NotFound from 'Pages/NotFound/NotFound';

import AuthRoute from 'Pages/Routes/AuthRoute';
import GuestRoute from 'Pages/Routes/GuestRoute';
import FetchUserData from 'utils/Firebase/Actions/fetch_user_data';
import useFetchData from 'utils/Firebase/Actions/fetch_user_data';
import useAuthStateChanged from 'utils/Firebase/Actions/auth_state_change';
import updateUserData from 'utils/Firebase/Actions/update_user_data';
import { auth } from 'utils/Firebase/Config/firebase';

export default function App() {
  //TODO: fix all overflow hidden in css. For example current solution doesn't work for modals
  const { i18n } = useTranslation();
  const [userInfo, setUserInfo] = useState({});
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
  const [theme, setTheme] = useState(null);
  const [language, setLanguage] = useState(null);
  const [notes, setNotes] = useState([
    // {
    //   id: 1,
    //   title: 'Zakupy',
    //   content:
    //     '%3Cdiv%3EMleko%3C/div%3E%3Cdiv%3E%3Cbr%3E%3C/div%3E%3Cdiv%3EMas%C5%82o%3C/div%3E%3Cdiv%3E%3Cbr%3E%3C/div%3E%3Cdiv%3EChleb%3C/div%3E%3Cdiv%3E%3Cbr%3E%3C/div%3E',
    //   date: new Date(2003, 7, 12),
    //   lastEditDate: new Date(2003, 7, 12),
    //   color: 3,
    //   isDeleted: false,
    //   isListed: false,
    //   tags: { all: true },
    //   checkList: [],
    //   images: [],
    //   draws: [],
    //   records: [],
    // },
  ]);
  const [tags, setTags] = useState(['Books', 'JS Tips', 'TODO']);
  const [canBeSaved, setCanBeSaved] = useState(false);
  const [filterPhrase, setFilterPhrase] = useState('');

  useAuthStateChanged(
    setIsLogged,
    setUserInfo,
    setTheme,
    setLanguage,
    setNotes,
    setTags,
  );

  // useEffect(() => {
  //   auth.currentUser &&
  //     updateUserData(setCanBeSaved, { theme, language, notes, tags });
  // }, [theme, language, tags, canBeSaved]);

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

          <Route path="/" element={<AuthRoute />}>
            {pages.authPages.map((authPage, index) => {
              return (
                <Route
                  path={authPage.path}
                  element={authPage.element}
                  key={index}
                >
                  {authPage?.subPages?.map((subPage, subIndex) => {
                    return (
                      <Route
                        path={subPage.path}
                        element={subPage.element}
                        key={subIndex}
                      />
                    );
                  })}
                </Route>
              );
            })}
          </Route>
          <Route path="/" element={<GuestRoute />}>
            {pages.guestPages.map((guestPage, index) => {
              return (
                <Route
                  path={guestPage.path}
                  element={guestPage.element}
                  key={index}
                >
                  {guestPage?.subPages?.map((subPage, subIndex) => {
                    return (
                      <Route
                        path={subPage.path}
                        element={subPage.element}
                        key={subIndex}
                      />
                    );
                  })}
                </Route>
              );
            })}
          </Route>
        </Routes>
      </AppContext.Provider>
    </div>
  );
}
