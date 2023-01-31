import { useEffect } from 'react';
import { auth } from '../Config/firebase';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import fetchUserData from './fetch_user_data';
import i18n from 'assets/LanguageConfig/i18n';

const useAuthStateChanged = (
  setIsLogged,
  setUserInfo,
  setTheme,
  toggleLanguage,
  setNotes,
  setTags,
) => {
  const listener = (currentUser) => {
    console.log(currentUser);
    if (currentUser?.email != null && currentUser?.emailVerified === false) {
      sendEmailVerification(currentUser);
    }
    setUserInfo(currentUser);
    if (currentUser == null) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
      fetchUserData(setTheme, toggleLanguage, setNotes, setTags);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, listener);

    return () => {
      unsubscribe();
    };
  }, []);
};
export default useAuthStateChanged;
