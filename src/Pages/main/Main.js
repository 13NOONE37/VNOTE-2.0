import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import Header from 'components/header/Header';
import './Main.css';
export default function Main() {
  const { setLanguage, language } = useContext(AppContext);
  const { t } = useTranslation();
  return (
    <div className="container">
      <Header />

      {t('rat')}
      <button onClick={() => setLanguage('pl')}>pl</button>
      <button onClick={() => setLanguage('en')}>en</button>
    </div>
  );
}
