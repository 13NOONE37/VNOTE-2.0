import { sendPasswordResetEmail } from 'firebase/auth';
import { t } from 'i18next';
import { auth } from '../Config/firebase';

const handlePasswordReset = (email, setErrorMessage, setSuccessMessage) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      //success
      setSuccessMessage(t('EmailHasBeenSent'));
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      setErrorMessage(errorCode);
    });
};
export default handlePasswordReset;
