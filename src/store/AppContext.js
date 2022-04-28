import { createContext } from 'react';
const AppContext = createContext({
  isLogged: true,
  setisLogged: () => {},
  language: 'en',
  setLanguage: () => {},
  theme: 'dark',
  toggleTheme: () => {},
  tags: [],
  setTags: () => {},
  notes: [],
  setNotes: () => {},
});
export default AppContext;
