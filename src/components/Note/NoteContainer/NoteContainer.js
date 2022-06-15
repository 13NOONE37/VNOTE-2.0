import React, { useContext } from 'react';
import NotePreview from '../NotePreview/NotePreview';
import './NoteContainer.css';
import Masonry from 'react-masonry-css';
import AppContext from 'store/AppContext';
import NoteFullView from '../NoteFullView/NoteFullView';

export default function NoteContainer({ notesState, setNotesState }) {
  const { language, filterPhrase, notes } = useContext(AppContext);

  const FilterNote = (item, phrase) => {
    let isValid = false;

    //Search
    const includesPhrase = (expectValue, value) => {
      const re = new RegExp(expectValue, 'i');
      return value.match(re);
    };
    if (includesPhrase(phrase, item.title)) isValid = true;
    if (includesPhrase(phrase, item.content)) isValid = true;
    if (
      includesPhrase(
        phrase,
        item.date.toLocaleDateString(language, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      )
    ) {
      isValid = true;
    }
    //Category
    //TODO:category in url filtering
    //*below is temporaly for emulating deleting in future it should depent from category
    if (item.isDeleted) isValid = false;

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
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="noteContainer"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map(
          (item, itemKey) =>
            FilterNote(item, filterPhrase) && (
              <NotePreview
                title={item.title}
                date={item.date}
                color={item.color}
                id={item.id}
                key={itemKey}
                notesState={notesState}
                setNotesState={setNotesState}
              />
            ),
        )}
        <NotePreview className="noteBlank" />
        <NotePreview className="noteBlank" />
        <NotePreview className="noteBlank" />
      </Masonry>
      {notesState.showFullView && (
        <NoteFullView notesState={notesState} setNotesState={setNotesState} />
      )}
    </>
  );
}
