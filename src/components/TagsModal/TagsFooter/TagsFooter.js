import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchInput from 'components/header/SearchBar/SearchInput/SearchInput';

import { ReactComponent as Tags } from 'assets/Icons/tag-2.svg';
import { ReactComponent as Plus } from 'assets/Icons/plus.svg';
import { ReactComponent as Trash } from 'assets/Icons/trash-2.svg';

export default function TagsFooter({ additionalClass }) {
  const [tagName, setTagName] = useState('');
  const { t } = useTranslation();

  return (
    <div className={`noteFooter ${additionalClass}`}>
      <div className="colorsRow">
        <SearchInput
          inputValue={tagName}
          inputAction={(e) => setTagName(e.target.value)}
          closeAction={() => {
            setTagName('');
          }}
          placeholder={t('AddNewTag')}
          icon={() => <Tags />}
        />
      </div>
      <div className="actionsRow">
        <button className="navItem" aria-label={t('AddNewTag')}>
          <Plus />
        </button>

        <button className="navItem" aria-label={t('DeleteTag')}>
          <Trash />
        </button>
      </div>
    </div>
  );
}
