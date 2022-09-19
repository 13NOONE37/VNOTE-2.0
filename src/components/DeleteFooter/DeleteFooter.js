import React, { useContext, useState } from 'react';
import './DeleteFooter.css';
import { ReactComponent as Trash } from 'assets/Icons/trash-2.svg';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';

export default function DeleteFooter() {
  const { t } = useTranslation();
  const { notes, setNotes } = useContext(AppContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const deleteAll = () => {
    const temp = notes.filter((item) => !item.isDeleted);

    setNotes(temp);
  };
  return (
    <>
      <div className="footerNav footerNav__delete">
        <button
          onClick={() => setShowConfirmModal(true)}
          className="navItemSpecial"
          aria-label={t('EmptyTrash')}
          data-tooltip__top={t('EmptyTrash')}
        >
          <Trash />
        </button>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          setShowModal={setShowConfirmModal}
          confirmText={t('EmptyTrash')}
          handler={deleteAll}
        />
      )}
    </>
  );
}
