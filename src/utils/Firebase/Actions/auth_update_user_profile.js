import { updateProfile } from 'firebase/auth';
import { auth } from '../Config/firebase';
const handleUpdateUserProfile = (name, photo) => {
  updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
    .then(() => {
      //success
    })
    .catch((error) => {
      //failed
    });
};
export default handleUpdateUserProfile;
