import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import Header from 'components/header/Header';
import './Main.css';
import Footer from 'components/Footer/Footer';
import useWindowSize from 'utils/useWindowSize';
import SearchBar from 'components/header/SearchBar/SearchBar';
import TagsSlider from 'components/TagsSlider/TagsSlider';
import NoteContainer from 'components/Note/NoteContainer/NoteContainer';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
export default function Main() {
  const { theme } = useContext(AppContext);
  const { t } = useTranslation();
  //TODO Every element should be focusable and accesable by tab nad css'ed
  const size = useWindowSize();

  injectStyle(); //! temp, we have to use own styles for notify

  return (
    <div className="container">
      <Header />
      {size.width < 750 && <SearchBar variant2={true} />}
      {/* <TagsSlider /> */}

      <ToastContainer position="bottom-right" newestOnTop theme={theme} />
      <NoteContainer />
      <Footer />
    </div>
  );
}
