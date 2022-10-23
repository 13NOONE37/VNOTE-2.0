import { auth, db } from '../Config/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

//todo offline data
//todo https://firebase.google.com/docs/firestore/manage-data/enable-offline?hl=en&authuser=0
const setUserData = async () => {
  //set
  const userRef = collection(db, 'users');
  await setDoc(doc(userRef, auth.currentUser.uid), {
    notes: [],
    tags: [],
    theme: false,
    language: false,
  });
};

export default setUserData;
