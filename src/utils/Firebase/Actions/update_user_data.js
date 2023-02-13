import { auth, db } from '../Config/firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { t } from 'i18next';
const updateUserData = async (setCanBeSaved, data) => {
  const docRef = doc(db, 'users', auth.currentUser.uid);
  const userRef = collection(db, 'users');

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    //update
    try {
      await updateDoc(doc(userRef, auth.currentUser.uid), data).then(() => {});
    } catch (error) {
      toast.error(t('ErrorUploadToFirestore'), {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,

        onClose: () => setTimeout(() => window.location.reload(), 3000),
      });
    }
    setCanBeSaved(false);
  } else {
    //set

    try {
      await setDoc(doc(userRef, auth.currentUser.uid), {
        notes: [],
        tags: [],
        theme: 'dark',
        language: 'en',
      }).then(() => {});
    } catch (error) {
      toast.error(t('ErrorUploadToFirestore'), {
        onClose: () => setTimeout(() => window.location.reload(), 3000),
      });
    }
    setCanBeSaved(false);
  }
};

export default updateUserData;
