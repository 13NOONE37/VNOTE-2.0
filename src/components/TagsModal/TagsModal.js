import Modal, { ModalButton } from 'components/Modal/Modal';
import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import './TagsModal.css';

export default function TagsModal({ notesState, setNotesState }) {
  const { tags } = useContext(AppContext);
  return (
    <Modal
      additionalClass="tagsViewModal"
      hideModalHead
      setShowModal={(value) => {
        setNotesState({ ['showTagView']: value });
      }}
    >
      {tags.map((item) => (
        <ModalButton>{item}</ModalButton>
      ))}
    </Modal>
  );
}
