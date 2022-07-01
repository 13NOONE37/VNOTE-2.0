import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Bars } from 'assets/Icons/bars.svg';
import AppContext from 'store/AppContext';
import SearchInput from './SearchInput/SearchInput';

export default function SearchBar({ variant2 }) {
  const { setFilterPhrase } = useContext(AppContext);
  const { t } = useTranslation();

  const [tempPhrase, setTempPhrase] = useState('');
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilterPhrase(tempPhrase);
      // setFilterPhrase(encodeURI(tempPhrase));//todo figure out about it now we can looking by emotes but is make bug that when we type for example <div> it show every note becaouse innerHTML containt div
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [tempPhrase]);

  return (
    <SearchInput
      inputValue={tempPhrase}
      inputAction={(e) =>
        setTempPhrase(e.target.value.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&'))
      }
      closeAction={() => {
        setFilterPhrase('');
        setTempPhrase('');
      }}
      placeholder={t('SearchYourNotes')}
      icon={() => <Bars />}
      variant2={variant2 || false}
    />
  );
}
