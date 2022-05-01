import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import Header from 'components/header/Header';
import './Main.css';
import Footer from 'components/Footer/Footer';
import useWindowSize from 'utils/useWindowSize';
import SearchBar from 'components/header/SearchBar/SearchBar';
import TagsSlider from 'components/TagsSlider/TagsSlider';
export default function Main() {
  const { setLanguage, language } = useContext(AppContext);
  const { t } = useTranslation();

  const size = useWindowSize();
  return (
    <div className="container">
      <Header />
      {size.width < 750 && <SearchBar variant2={true} />}
      <TagsSlider />
      {/* {t('rat')}
      <button onClick={() => setLanguage('pl')}>pl</button>
      <button onClick={() => setLanguage('en')}>en</button> */}
      <Footer />
    </div>
  );
}
