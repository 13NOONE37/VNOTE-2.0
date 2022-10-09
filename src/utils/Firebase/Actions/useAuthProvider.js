import { useEffect } from 'react';
import { auth } from '../Config/firebase';
import {
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  GithubAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';

const useAuthProvider = (setUserInfo, setIsLogged, setErrorMessage) => {
  const githubAuth = () => {
    const provider = new GithubAuthProvider();

    signInWithRedirect(auth, provider);
  };
  const twitterAuth = () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider);
  };
  const googleAuth = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
      if (currentUser == null) {
        setIsLogged(false);
      } else {
        setIsLogged(true);
      }
      // console.log('User: ', currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return { githubAuth, twitterAuth, googleAuth };
};
export default useAuthProvider;
