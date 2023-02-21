import React, { useContext, useState } from 'react';
import uuid4 from 'uuid4';
import { useTranslation } from 'react-i18next';
import isValidTag from '../Utils/isValidTag';

import './CreateTagField.css';
import { ReactComponent as Tags } from 'assets/Icons/tag-2.svg';
import { ReactComponent as Plus } from 'assets/Icons/plus.svg';

import SearchInput from 'components/header/SearchBar/SearchInput/SearchInput';
import { ActionButton } from 'components/Modal/Modal';
import AppContext from 'store/AppContext';

export default function CreateTagField() {
  const { t } = useTranslation();
  const { tags, setTags, setCanBeSaved } = useContext(AppContext);

  const [tagName, setTagName] = useState('');

  const handleAddNewTag = (e) => {
    e.preventDefault();
    if (!isValidTag({ name: tagName, tags, type: 'new' })) return;

    setTags([...tags, { id: uuid4(), name: tagName }]);
    setTagName('');
    setCanBeSaved(true);
  };
  return (
    <form onSubmit={handleAddNewTag} className="tagArea--form">
      <SearchInput
        inputValue={tagName}
        inputAction={(e) => {
          setTagName(e.target.value);
        }}
        closeAction={() => {
          setTagName('');
        }}
        placeholder={t('AddNewTag')}
        icon={() => <Tags />}
        variant2
        maxLength={30}
      />
      <ActionButton classes={'newTagButton'} type="submit">
        <Plus />
      </ActionButton>
    </form>
  );
}
