import { getDefaultNormalizer } from '@testing-library/react';
import { createContext } from 'react';
const AppContext = createContext({
  ua: '',
  userInfo: {},
  setUserInfo: () => {},
  isLogged: null,
  setIsLogged: () => {},
  language: 'en',
  toggleLanguage: () => {},
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
  isDataFetched: false,
  setIsDataFetched: () => {},
});
export default AppContext;
