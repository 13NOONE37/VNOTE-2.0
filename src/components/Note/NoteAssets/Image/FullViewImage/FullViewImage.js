import React from 'react';
import Modal from 'components/Modal/Modal';

import './FullViewImage.css';
import { useTranslation } from 'react-i18next';

export default function FullViewImage({ notesState, setNotesState }) {
  const { t } = useTranslation();
  return (
    <Modal
      additionalClass={'newDraw--box'}
      setShowModal={() => {
        setNotesState({ showFullViewImage: false });
      }}
    >
      <img
        src={notesState.showFullViewImage}
        alt={t('UserImage')}
        style={{ width: '100%', height: '80vh', objectFit: 'contain' }}
      />
    </Modal>
  );
}
