import { auth, db } from '../Config/firebase';
import {
  addDoc,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
} from 'firebase/firestore';

//todo offline data
//todo https://firebase.google.com/docs/firestore/manage-data/enable-offline?hl=en&authuser=0
const fetchUserData = async () => {
  //set
  // const userRef = collection(db, 'users');
  // await setDoc(doc(userRef, auth.currentUser.uid), {
  //   name: 'San Fra5555cis234iso',
  // });
  //get
  // const docRef = doc(db, 'users', auth.currentUser.uid);
  // const docSnap = await getDoc(docRef);
  // if (docSnap.exists()) {
  //   console.log('Success ', docSnap.data());
  // } else {
  //   console.log('Failure');
  // }
};

export default fetchUserData;
