import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SearchBar.css';
import { ReactComponent as Bars } from 'assets/Icons/bars.svg';
import { ReactComponent as XCircle } from 'assets/Icons/x-circle.svg';
import { changeInputStateValue } from 'utils/ValueManagment';
import AppContext from 'store/AppContext';

export default function SearchBar({ variant2 }) {
  const { filterPhrase, setFilterPhrase } = useContext(AppContext);
  const { t } = useTranslation();

  return (
    <div className={`searchBar ${variant2 && 'searchBarVariant2'}`}>
      <Bars />
      <input
        type="text"
        placeholder={t('SearchYourNotes')}
        value={filterPhrase}
        onChange={(e) => changeInputStateValue(e, setFilterPhrase)}
      />
      <XCircle
        onClick={() => {
          setFilterPhrase('');
        }}
        className={filterPhrase.length > 0 ? 'appearItem' : 'disappearItem'}
      />
    </div>
  );
}
