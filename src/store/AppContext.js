import { getDefaultNormalizer } from '@testing-library/react';
import { createContext } from 'react';
const AppContext = createContext({
  ua: '',
  userInfo: {},
  setUserInfo: () => {},
  isLogged: null,
  setisLogged: () => {},
  language: 'en',
  setLanguage: () => {},
  theme: 'dark',
  toggleTheme: () => {},
  filterPhrase: '',
  setFilterPhrase: () => {},
  tags: [],
  setTags: () => {},
  notes: [],
  setNotes: () => {},
  addNewNote: () => {},
  canBeSaved: false,
  setCanBeSaved: () => {},
});
export default AppContext;
