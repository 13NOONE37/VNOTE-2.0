import React, { useContext, useState } from 'react';
import AppContext from 'store/AppContext';
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
  const handleOpenFullView = (noteId) => {
    console.log('full view');
    setNotesState({ ['showFullView']: true });
    setNotesState({ ['currentId']: noteId });
  };

  let isPressed = false;
  const handleTimeout = (item, noteId) => {
    if (isPressed) {
      selectNote(item, noteId);
    } else {
      handleOpenFullView(noteId);
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
      handleOpenFullView(noteId);
    }
  };
  console.log(decodeURI(title), decodeURIComponent(title));
  return (
    <div
      className="notePreview"
      style={{ backgroundColor: `var(--noteColor-${color})` }}
      {...props}
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
