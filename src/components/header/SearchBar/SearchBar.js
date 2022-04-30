import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SearchBar.css';
import { ReactComponent as Bars } from 'assets/Icons/bars.svg';
import { ReactComponent as XCircle } from 'assets/Icons/x-circle.svg';
import { changeInputStateValue } from 'utils/ValueManagment';

export default function SearchBar() {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="searchBar">
      <Bars />
      <input
        type="text"
        placeholder={t('SearchYourNotes')}
        value={searchValue}
        onChange={(e) => changeInputStateValue(e, setSearchValue)}
      />
      {/* {searchValue.length > 0 && ( */}
      <XCircle
        className={searchValue.length > 0 ? 'appearItem' : 'disappearItem'}
      />
      {/* )} */}
    </div>
  );
}
