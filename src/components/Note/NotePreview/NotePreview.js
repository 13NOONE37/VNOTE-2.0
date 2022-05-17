import React, { useContext, useState } from 'react';
import AppContext from 'store/AppContext';
import './NotePreview.css';
export default function NotePreview({ title, date, color, ...props }) {
  const { ua, language } = useContext(AppContext);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedNotes, setselectedNotes] = useState([]);
  //TODO Change for reducer

  const selectNote = (e) => {
    console.log('select');
  };
  const handleOpenFullView = () => {
    console.log('full view');
  };

  let isPressed = false;
  const handleTimeout = (item) => {
    if (isPressed) {
      item.classList.toggle('selectedNote');
    } else {
      handleOpenFullView();
    }
  };
  const MobileTouchStart = (e) => {
    isPressed = true;
    if (e.currentTarget.className.includes('selectedNote')) {
      e.currentTarget.classList.remove('selectedNote');
    } else {
      window.setTimeout(handleTimeout, 250, e.currentTarget);
    }
  };
  const MobileTouchEnd = () => {
    isPressed = false;
    window.clearTimeout(handleTimeout);
  };

  const handleClick = (e) => {
    if (ua === 'mobile' || ua === 'tablet') return;

    if (e.shiftKey || e.altKey || e.ctrlKey) {
      e.currentTarget.classList.toggle('selectedNote');
    } else if (!isSelectMode) {
      handleOpenFullView();
    }
  };

  return (
    <div
      className="notePreview"
      style={{ backgroundColor: `var(--noteColor-${color})` }}
      {...props}
      onClick={handleClick}
      onTouchStart={MobileTouchStart}
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
