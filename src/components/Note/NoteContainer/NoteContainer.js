import React, { useContext, useState } from 'react';
import NotePreview from '../NotePreview/NotePreview';
import './NoteContainer.css';
import Masonry from 'react-masonry-css';
import AppContext from 'store/AppContext';

export default function NoteContainer() {
  const { filterPhrase, notes } = useContext(AppContext);

  const includesPhrase = (expectValue, value) => {
    const re = new RegExp(expectValue, 'i');
    return value.match(re);
  };
  const FilterNote = (item, phrase) => {
    let isValid = false;

    if (includesPhrase(phrase, item.title)) isValid = true;
    if (includesPhrase(phrase, item.content)) isValid = true;
    // if (includesPhrase(phrase, item.date)) isValid = true;

    return isValid;
  };
  const breakpointColumnsObj = {
    default: Math.max(6, Math.floor(window.innerWidth / 190) - 2),
    1550: 5,
    1300: 4,
    905: 3,
    520: 2,
    300: 2,
  };
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="noteContainer"
      columnClassName="my-masonry-grid_column"
    >
      {notes.map(
        (item) => FilterNote(item, filterPhrase) && <NotePreview {...item} />,
      )}
      <NotePreview className="noteBlank" />
      <NotePreview className="noteBlank" />
      <NotePreview className="noteBlank" />
    </Masonry>
  );
}
