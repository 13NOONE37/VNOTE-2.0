import React, { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import { LongPressDetectEvents, useLongPress } from 'use-long-press';
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

  const [enabled, setEnabled] = useState(true);

  const selectNote = (n) => {
    const temp = notesState.selectedNotes;
    if (temp[n]) {
      delete temp[n];
    } else {
      temp[n] = n;
    }
    setNotesState({ ['selectedNotes']: temp });
  };

  const callback = () => {
    if (ua === 'desktop') {
      handleOpenFullView(setNotesState, id);
    } else {
      selectNote(id);
    }
  };

  const bind = useLongPress(enabled ? callback : null, {
    onStart: () => console.log('Press started'),
    onFinish: () => console.log('Long press finished'),
    onCancel: () => console.log('Press cancelled'),
    //onMove: () => console.log("Detected mouse or touch movement"),
    threshold: 500,
    captureEvent: true,
    cancelOnMovement: true,
    detect: LongPressDetectEvents.BOTH,
  });

  const handleClick = (e) => {
    const isSelectedMode = Object.keys(notesState.selectedNotes).length > 0;
    if (e.shiftKey || e.altKey || e.ctrlKey || isSelectedMode) {
      selectNote(id);
    } else if (!isSelectedMode) {
      handleOpenFullView(setNotesState, id);
    }
  };
  return (
    <div
      className={`notePreview  ${
        notesState.selectedNotes[id] && 'selectedNote'
      }`}
      style={{ backgroundColor: `var(--noteColor-${color})` }}
      onClick={handleClick}
      {...bind()}
      {...props}
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
  notesState: { selectedNotes: {} },
};
