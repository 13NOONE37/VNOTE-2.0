import { auth, db } from '../Config/firebase';
import { doc, getDoc } from 'firebase/firestore';

// //todo offline data
// //todo https://firebase.google.com/docs/firestore/manage-data/enable-offline?hl=en&authuser=0

const fetchUserData = async (setTheme, setLanguage, setNotes, setTags) => {
  const docRef = doc(db, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log('Success ', docSnap.data());

    const { theme, language, notes, tags } = docSnap.data();

    setTheme(
      theme
        ? window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme,
    );

    setLanguage(language || 'en');
    setNotes(
      notes?.map((n) => {
        n.lastEditDate = n.lastEditDate.toDate();
        n.date = n.date.toDate();
        return n;
      }) || [],
    );
    setTags(tags || []);
  } else {
    alert("Error. we can't load your data");
  }
};

export default fetchUserData;
