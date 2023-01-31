import React, { useContext, useState } from 'react';
import './DeleteFooter.css';
import { ReactComponent as Trash } from 'assets/Icons/trash-2.svg';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import { storage } from 'utils/Firebase/Config/firebase';
import { deleteObject, ref } from 'firebase/storage';

export default function DeleteFooter() {
  const { t } = useTranslation();
  const { notes, setNotes, setCanBeSaved } = useContext(AppContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const deleteAll = () => {
    const deleteFromStorage = (url) => {
      deleteObject(ref(storage, url));
    };
    const temp = notes.filter((note) => {
      if (note.isDeleted) {
        note.images.forEach((image) => deleteFromStorage(image));
        note.draws.forEach((draw) => deleteFromStorage(draw));
        note.records.forEach((record) => {
          deleteFromStorage(record.url);
        });
      }
      return !note.isDeleted;
    });

    setNotes(temp);
    setCanBeSaved(true);
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
