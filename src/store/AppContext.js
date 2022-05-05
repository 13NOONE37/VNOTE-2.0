import { getDefaultNormalizer } from '@testing-library/react';
import { createContext } from 'react';
const AppContext = createContext({
  userInfo: {},
  setUserInfo: () => {},
  isLogged: true,
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
  canBeSaved: false,
  setCanBeSaved: () => {},
});
export default AppContext;
