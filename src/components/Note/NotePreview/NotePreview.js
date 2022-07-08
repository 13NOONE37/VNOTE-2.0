import React, { useCallback, useContext, useState } from 'react';
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

  const selectNote = (noteId) => {
    console.log(notesState.selectedNotes);
    const temp = notesState.selectedNotes;
    if (temp[noteId]) {
      delete temp[noteId];
    } else {
      temp[noteId] = noteId;
    }
    setNotesState({ ['selectedNotes']: temp });
  };

  // const [enabled, setEnabled] = useState(true);
  // // let currentId;
  // const callback = useCallback(() => {
  //   if (ua === 'desktop') {
  //     console.log('callback pc');
  //   } else {
  //     console.log('callback mobile');
  //   }
  //   // selectNote(currentId);
  // }, []);
  // const bind = useLongPress(enabled ? callback : null, {
  //   onStart: (e) => {
  //     const isSelectedMode = Object.keys(notesState.selectedNotes).length > 0;

  //     if (ua === 'desktop') {
  //       console.log(
  //         'start pc',
  //         parseFloat(e.currentTarget.getAttribute('data-id')),
  //       );
  //       handleOpenFullView(
  //         setNotesState,
  //         parseFloat(e.currentTarget.getAttribute('data-id')),
  //       );
  //     } else if (isSelectedMode) {
  //       console.log('start mobile', 'add instnatly and do not run callback');
  //     } else {
  //       console.log('default start mobile');
  //     }
  //     // console.log('Press started', e.currentTarget);
  //     // currentId = parseFloat(e.currentTarget.getAttribute('data-id'));
  //   },
  //   // onFinish: (e) => console.log('Long press finished'),
  //   onCancel: (e) => {
  //     if (ua === 'desktop') {
  //       console.log('cancel pc', e.currentTarget);
  //     } else {
  //       handleOpenFullView(
  //         setNotesState,
  //         parseFloat(e.currentTarget.getAttribute('data-id')),
  //       );
  //       console.log('cancel mobile', e.currentTarget);
  //     }
  //   },
  //   onMove: () => console.log('Detected mouse or touch movement'),
  //   threshold: 1000,
  //   captureEvent: true,
  //   cancelOnMovement: true,
  //   detect: LongPressDetectEvents.BOTH,
  // });

  const handleClick = (e, noteId) => {
    console.log('click exexuction');
    // if (ua === 'mobile' || ua === 'tablet') return;
    const isSelectedMode = Object.keys(notesState.selectedNotes).length > 0;
    if (e.shiftKey || e.altKey || e.ctrlKey || isSelectedMode) {
      selectNote(noteId);
    } else if (!isSelectedMode) {
      handleOpenFullView(setNotesState, noteId);
    }
  };
  return (
    <div
      className={`notePreview  ${
        notesState.selectedNotes[id] && 'selectedNote'
      }`}
      style={{ backgroundColor: `var(--noteColor-${color})` }}
      // data-id={id}
      onClick={(e) => handleClick(e, id)}
      // {...bind()}
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
