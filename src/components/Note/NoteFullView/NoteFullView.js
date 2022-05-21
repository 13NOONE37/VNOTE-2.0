import React, { useContext } from 'react';
import './NoteFullView.css';
import Modal, { TopActionButton } from 'components/Modal/Modal';
import { ReactComponent as EditIcon } from 'assets/Icons/edit.svg';
import AppContext from 'store/AppContext';

export default function NoteFullView({ notesState, setNotesState }) {
  const { language, notes, setNotes } = useContext(AppContext);
  //we should use useTransition for updating changes into context
  const findNote = () => notes.find((i) => i.id === notesState.currentId);

  return (
    <Modal
      additionalClass="hideHeader"
      modalHeadContent={
        <TopActionButton classes="fixedActionButton">
          <EditIcon />
        </TopActionButton>
      }
      setShowModal={(value) => setNotesState({ ['showFullView']: value })}
    >
      <h2>{findNote().title}</h2>
      <span>
        {findNote().date.toLocaleDateString(language, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </span>
      <span>{findNote().content}</span>
    </Modal>
  );
}
