import React from 'react';
import './ActionHeader.css';

import { ReactComponent as ArrowBack } from 'assets/Icons/arrow-left.svg';
import { useTranslation } from 'react-i18next';

export default function ActionHeader({ notesState, setNotesState }) {
  const { t } = useTranslation();

  return (
    <header className="editHeader">
      <ArrowBack
        className="editHeader--icon"
        onClick={() => {
          setNotesState({ ['selectedNotes']: {} });
        }}
      />
      <span className="editHeader--counter">
        {t('Selected')}:
        <span>{Object.keys(notesState.selectedNotes).length}</span>{' '}
      </span>
    </header>
  );
}
