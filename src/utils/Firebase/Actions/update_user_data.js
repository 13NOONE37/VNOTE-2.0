import { auth, db } from '../Config/firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

//todo offline data
//todo https://firebase.google.com/docs/firestore/manage-data/enable-offline?hl=en&authuser=0
const updateUserData = async (setCanBeSaved, data) => {
  const docRef = doc(db, 'users', auth.currentUser.uid);
  const userRef = collection(db, 'users');

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    //update
    await updateDoc(doc(userRef, auth.currentUser.uid), data).then(() => {
      setCanBeSaved(false);
    });
  } else {
    //set
    await setDoc(doc(userRef, auth.currentUser.uid), {
      notes: [],
      tags: [],
      theme: 'dark',
      language: 'en',
    });
  }
};

export default updateUserData;
