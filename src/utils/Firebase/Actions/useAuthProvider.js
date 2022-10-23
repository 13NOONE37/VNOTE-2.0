import { auth } from '../Config/firebase';
import {
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
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
    // signInWithPopup(auth, provider)
  };
  const googleAuth = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return { githubAuth, twitterAuth, googleAuth };
};
export default useAuthProvider;
