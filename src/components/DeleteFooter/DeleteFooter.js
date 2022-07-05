import React, { useContext } from 'react';
import './DeleteFooter.css';
import { ReactComponent as Trash } from 'assets/Icons/trash-2.svg';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';

export default function DeleteFooter() {
  const { t } = useTranslation();
  const { notes, setNotes } = useContext(AppContext);

  const deleteAll = () => {
    if (
      window.confirm('Are you sure you want to permanently delete all notes?')
    ) {
      console.log(notes);
      const temp = notes.filter((item) => !item.isDeleted);
      console.log(temp);
      setNotes(temp);
    }
  };
  return (
    <div className="footerNav footerNav__delete">
      <button
        onClick={deleteAll}
        className="navItemSpecial"
        aria-label={t('NewNote')}
        data-tooltip__top={t('DeleteAll')}
      >
        <Trash />
      </button>
    </div>
  );
}
