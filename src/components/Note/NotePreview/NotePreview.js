import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import './NotePreview.css';
import propTypes from 'prop-types';
export default function NotePreview({ title, date, color, ...props }) {
  const { language } = useContext(AppContext);

  return (
    <div
      className="notePreview"
      style={{ backgroundColor: `var(--noteColor-${color})` }}
      {...props}
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
