import React from 'react';
import './NotePreview.css';

export default function NotePreview({ title, date, color }) {
  return (
    <div
      className="notePreview"
      style={{ backgroundColor: `var(--noteColor-${color})` }}
    >
      <h1 className="notePreviewTitle">{title}</h1>
      <span className="notePreviewDate">
        {date.toLocaleDateString('pl', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </span>
    </div>
  );
}
