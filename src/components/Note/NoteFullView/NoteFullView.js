import React, { useContext } from 'react';
import './NoteFullView.css';
import Modal, { TopActionButton } from 'components/Modal/Modal';
import { ReactComponent as EditIcon } from 'assets/Icons/edit.svg';
import AppContext from 'store/AppContext';
import { useTranslation } from 'react-i18next';

export default function NoteFullView({ notesState, setNotesState }) {
  const { t } = useTranslation();
  const { language, notes, setNotes } = useContext(AppContext);
  //we should use useTransition for updating changes into context
  const findNote = () => notes.find((i) => i.id === notesState.currentId);

  return (
    <Modal
      additionalClass="hideHeader fullViewModal"
      modalHeadContent={
        <TopActionButton classes="fixedActionButton">
          <EditIcon />
        </TopActionButton>
      }
      setShowModal={(value) => setNotesState({ ['showFullView']: value })}
    >
      <span
        className="notePreviewTitle"
        style={{ color: `var(--noteColor-${findNote().color})` }}
      >
        {findNote().title}
      </span>

      <time className="createDate">
        {findNote().date.toLocaleDateString(language, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </time>
      <span className="noteContent">{findNote().content}</span>
      <span className="lastEditDate">
        {/* {t('LastEdit')}: */}
        <time>
          {findNote().date.toLocaleDateString(language, {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
      </span>
    </Modal>
  );
}
