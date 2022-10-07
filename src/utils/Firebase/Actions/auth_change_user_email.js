import { updateEmail } from 'firebase/auth';
import { auth } from '../Config/firebase';
const handleChangeUserEmail = (email) => {
  updateEmail(auth.currentUser, email)
    .then(() => {
      //success
    })
    .catch((error) => {
      //failed
    });
};
export default handleChangeUserEmail;
