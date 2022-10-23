import { useEffect } from 'react';
import { auth } from '../Config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import fetchUserData from './fetch_user_data';

const useAuthStateChanged = (
  setIsLogged,
  setUserInfo,
  setTheme,
  setLanguage,
  setNotes,
  setTags,
) => {
  const listener = (currentUser) => {
    setUserInfo(currentUser);
    if (currentUser == null) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
      fetchUserData(setTheme, setLanguage, setNotes, setTags);
    }
    console.log('User: ', currentUser);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, listener);

    return () => {
      unsubscribe();
    };
  }, []);
};
export default useAuthStateChanged;
