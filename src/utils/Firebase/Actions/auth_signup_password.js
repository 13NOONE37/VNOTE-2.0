import { auth } from '../Config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const handlePasswordSignUp = (
  email,
  password,
  setErrorMessage,
  setIsLogged,
  setUserInfo,
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //signed in
      // const user = userCredential.user;
      setIsLogged(true);
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      setErrorMessage(errorCode);
    });
};
export default handlePasswordSignUp;
