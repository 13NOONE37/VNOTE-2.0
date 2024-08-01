import { auth } from '../Config/firebase';
import {
  signInWithRedirect,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const useAuthProvider = (setUserInfo, setIsLogged, setErrorMessage) => {
  const githubAuth = async () => {
    const provider = new GithubAuthProvider();

    // signInWithRedirect(auth, provider);
    const userCred = await signInWithPopup(auth, provider);
  };
  const twitterAuth = async () => {
    // const provider = new TwitterAuthProvider();
    // signInWithPopup(auth, provider)
  };
  const googleAuth = async () => {
    const provider = new GoogleAuthProvider();
    // signInWithRedirect(auth, provider);
    const userCred = await signInWithPopup(auth, provider);
  };

  return { githubAuth, twitterAuth, googleAuth };
};
export default useAuthProvider;
