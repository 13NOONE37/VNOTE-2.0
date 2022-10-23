import { auth, db } from '../Config/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';

//todo offline data
//todo https://firebase.google.com/docs/firestore/manage-data/enable-offline?hl=en&authuser=0
const updateUserData = async (setCanBeSaved, data) => {
  //update
  const userRef = collection(db, 'users');
  await updateDoc(doc(userRef, auth.currentUser.uid), data).then(() => {
    setCanBeSaved(false);
  });
};

export default updateUserData;
