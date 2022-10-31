import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Close } from 'assets/Icons/x.svg';
import './Image.css';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from 'utils/Firebase/Config/firebase';

export default function Image({ noteValues, setNoteValues, src }) {
  const { t } = useTranslation();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [localURL, setlocalURL] = useState('');

  const handleDelete = () => {
    const temp = noteValues.images.filter((image) => image !== src);
    setNoteValues({ ['images']: temp });
  };

  useEffect(() => {
    getDownloadURL(ref(storage, src)).then((result) => {
      setlocalURL(result);
    });
  }, []);

  return (
    <>
      <div className="image--box" additionalClass={'newAttachment--box'}>
        <img
          src={localURL}
          alt={t('UserImage')}
          onMouseDown={(e) => e.preventDefault()}
        />
        <button onClick={() => setShowConfirmModal(true)}>
          <Close />
        </button>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          setShowModal={setShowConfirmModal}
          confirmText={t('Delete')}
          handler={handleDelete}
        />
      )}
    </>
  );
}
