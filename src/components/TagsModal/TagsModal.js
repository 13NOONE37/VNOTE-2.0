import Modal, { ModalButton } from 'components/Modal/Modal';
import { t } from 'i18next';
import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import './TagsModal.css';

export default function TagsModal({ notesState, setNotesState }) {
  const { tags } = useContext(AppContext);
  return (
    <Modal
      additionalClass="tagsViewModal profileModal"
      setShowModal={(value) => {
        setNotesState({ ['showTagView']: value });
      }}
    >
      <span className="tagsGallery">
        <span className="tagsGallery--title">{t('SelectTags')}</span>
        <span className="tagsGallery--content">
          {tags.map((item) => (
            <ModalButton>{item}</ModalButton>
          ))}
        </span>
      </span>
    </Modal>
  );
}
