import React, { useContext, useState } from 'react';
import AppContext from 'store/AppContext';
import './NotePreview.css';
export default function NotePreview({ title, date, color, id, ...props }) {
  const { ua, language } = useContext(AppContext);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedNotes, setselectedNotes] = useState([]);
  //TODO Change for reducer

  const selectNote = (e, noteId) => {
    console.log('select');
    e.currentTarget.classList.toggle('selectedNote');

    const temp = [...selectedNotes, noteId];
    setselectedNotes(temp);
    console.log(selectedNotes);
  };
  const handleOpenFullView = () => {
    console.log('full view');
  };

  let isPressed = false;
  const handleTimeout = (e, noteId) => {
    if (isPressed) {
      selectNote(e, noteId);
    } else {
      handleOpenFullView();
    }
  };
  const MobileTouchStart = (e, noteId) => {
    isPressed = true;
    if (e.currentTarget.className.includes('selectedNote')) {
      e.currentTarget.classList.remove('selectedNote');
    } else {
      window.setTimeout(handleTimeout, 250, e, noteId);
    }
  };
  const MobileTouchEnd = () => {
    isPressed = false;
    window.clearTimeout(handleTimeout);
  };
  const handleClick = (e, noteId) => {
    if (ua === 'mobile' || ua === 'tablet') return;

    if (e.shiftKey || e.altKey || e.ctrlKey) {
      selectNote(e, noteId);
    } else if (!isSelectMode) {
      handleOpenFullView();
    }
  };

  return (
    <div
      className="notePreview"
      style={{ backgroundColor: `var(--noteColor-${color})` }}
      {...props}
      onClick={(e) => handleClick(e, id)}
      onTouchStart={(e) => MobileTouchStart(e, id)}
      onTouchEnd={MobileTouchEnd}
    >
      <h1 className="notePreviewTitle">{title}</h1>
      <span className="notePreviewDate">
        {date.toLocaleDateString(language, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </span>
    </div>
  );
}

NotePreview.defaultProps = {
  title: 'Title of note',
  date: new Date(),
  color: 1,
};
