import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SearchBar.css';
import { ReactComponent as Bars } from 'assets/Icons/bars.svg';
import { ReactComponent as XCircle } from 'assets/Icons/x-circle.svg';
import AppContext from 'store/AppContext';

export default function SearchBar({ variant2 }) {
  const { setFilterPhrase } = useContext(AppContext);
  const { t } = useTranslation();

  const [tempPhrase, setTempPhrase] = useState('');
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilterPhrase(tempPhrase);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [tempPhrase]);

  return (
    <div className={`searchBar ${variant2 && 'searchBarVariant2'}`}>
      <Bars />
      <input
        type="text"
        placeholder={t('SearchYourNotes')}
        value={tempPhrase}
        onChange={(e) => setTempPhrase(e.target.value)}
      />
      <XCircle
        onClick={() => {
          setFilterPhrase('');
          setTempPhrase('');
        }}
        className={tempPhrase.length > 0 ? 'appearItem' : 'disappearItem'}
      />
    </div>
  );
}
