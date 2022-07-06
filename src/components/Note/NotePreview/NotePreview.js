import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import handleOpenFullView from 'utils/handleOpenFullView';
import './NotePreview.css';

export default function NotePreview({
  title,
  date,
  color,
  id,
  notesState,
  setNotesState,
  ...props
}) {
  const { ua, language } = useContext(AppContext);

  const selectNote = (item, noteId) => {
    item.classList.toggle('selectedNote');
    const temp = notesState.selectedNotes;
    temp.push(noteId);
    setNotesState({ ['selectedNotes']: temp });
  };
  let isPressed = false;
  const handleTimeout = (item, noteId) => {
    if (isPressed) {
      selectNote(item, noteId);
    } else {
      handleOpenFullView(setNotesState, noteId);
    }
  };
  const MobileTouchStart = (e, noteId) => {
    //TODO imporove it mobile
    isPressed = true;
    if (e.currentTarget.className.includes('selectedNote')) {
      e.currentTarget.classList.remove('selectedNote');
    } else {
      window.setTimeout(handleTimeout, 350, e.currentTarget, noteId);
    }
  };
  const MobileTouchEnd = () => {
    isPressed = false;
    window.clearTimeout(handleTimeout);
  };
  const handleClick = (e, noteId) => {
    if (ua === 'mobile' || ua === 'tablet') return;

    if (e.shiftKey || e.altKey || e.ctrlKey) {
      selectNote(e.currentTarget, noteId);
    } else if (!notesState.isSelectMode) {
      //!replace with length of array checking
      handleOpenFullView(setNotesState, noteId);
    }
  };

  return (
    <div
      className="notePreview"
      style={{ backgroundColor: `var(--noteColor-${color})` }}
      {...props}
      // onPointerDown={(e) => {
      //   console.log('pointer down: ', e);
      // }}
      // onPointerMove={(e) => {
      //   console.log('pointer move: ', e);
      // }}
      // onPointerUp={(e) => {
      //   console.log('pointer up: ', e);
      //   handleClick(e, id);
      // }}

      onClick={(e) => handleClick(e, id)}
      onTouchStart={(e) => MobileTouchStart(e, id)}
      onTouchEnd={MobileTouchEnd}
    >
      <span
        className="notePreviewTitle"
        dangerouslySetInnerHTML={{ __html: decodeURI(title) }}
      ></span>

      <time className="notePreviewDate">
        {date.toLocaleDateString(language, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </time>
    </div>
  );
}

NotePreview.defaultProps = {
  title: 'Title of note',
  date: new Date(),
  color: 1,
  notesState: {},
};
