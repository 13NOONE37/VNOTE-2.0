import { auth } from '../Config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const handlePasswordSignIn = (
  email,
  password,
  setErrorMessage,
  setIsLogged,
  setUserInfo,
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //signed in
      const user = userCredential.user;
      setIsLogged(true);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage('Email or password is incorrect');
    });
};
export default handlePasswordSignIn;
