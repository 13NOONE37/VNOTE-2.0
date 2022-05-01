import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SearchBar.css';
import { ReactComponent as Bars } from 'assets/Icons/bars.svg';
import { ReactComponent as XCircle } from 'assets/Icons/x-circle.svg';
import { changeInputStateValue } from 'utils/ValueManagment';

export default function SearchBar({ variant2 }) {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className={`searchBar ${variant2 && 'searchBarVariant2'}`}>
      <Bars />
      <input
        type="text"
        placeholder={t('SearchYourNotes')}
        value={searchValue}
        onChange={(e) => changeInputStateValue(e, setSearchValue)}
      />
      <XCircle
        onClick={() => {
          setSearchValue('');
        }}
        className={searchValue.length > 0 ? 'appearItem' : 'disappearItem'}
      />
    </div>
  );
}
