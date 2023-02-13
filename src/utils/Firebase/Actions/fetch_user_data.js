import { auth, db } from '../Config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { t } from 'i18next';
import { Navigate } from 'react-router-dom';

const fetchUserData = async (
  setTheme,
  toggleLanguage,
  setNotes,
  setTags,
  setIsDataFetched,
) => {
  const docRef = doc(db, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { theme, language, notes, tags } = docSnap.data();
    setTheme(
      !theme
        ? window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme,
    );
    const webLanguage = navigator.language.includes('pl') ? 'pl' : 'en';
    toggleLanguage(!language ? webLanguage : language);
    setNotes(
      notes?.map((n) => {
        n.lastEditDate = n.lastEditDate.toDate();
        n.date = n.date.toDate();
        n.records = n.records.map((r) => {
          r.date = r.date.toDate();
          return r;
        });
        return n;
      }) || [],
    );
    setTags(tags || []);
  } else if (docSnap.exists() === false) {
    setTheme(
      window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
    );
    toggleLanguage('en');
    setNotes([]);
    setTags([]);
  } else {
    Navigate('/error/fetch');
    // alert("Error. we can't load your data");
  }

  setIsDataFetched(true);
};

export default fetchUserData;
