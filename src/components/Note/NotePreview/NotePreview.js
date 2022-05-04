import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import './NotePreview.css';

export default function NotePreview({ title, date, color }) {
  const { language } = useContext(AppContext);

  return (
    <div
      className="notePreview"
      style={{ backgroundColor: `var(--noteColor-${color})` }}
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
