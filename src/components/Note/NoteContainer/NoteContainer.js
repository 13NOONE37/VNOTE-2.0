import React, { useContext } from 'react';
import NotePreview from '../NotePreview/NotePreview';
import './NoteContainer.css';
import Masonry from 'react-masonry-css';
import AppContext from 'store/AppContext';
import NoteFullView from '../NoteFullView/NoteFullView';
import { useParams } from 'react-router-dom';
import EmptyState from './EmptyState/EmptyState';
import Loading from 'components/Loading/Loading';

export default function NoteContainer({ notesState, setNotesState }) {
  const { category } = useParams();
  const { language, filterPhrase, notes, isDataFetched } =
    useContext(AppContext);
  const noteIndexes = [];

  const FilterNote = (item, phrase) => {
    let isValid = false;
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
    if (item.isDeleted) isValid = false;
    if (category && !item.tags[category]) isValid = false;

    if (item.isDeleted && category === 'trash') {
      isValid = true;
    }
    if (isValid) noteIndexes.push(item.id);
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

  return isDataFetched ? (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="noteContainer"
        columnClassName="my-masonry-grid_column"
      >
        {notes
          .sort((a, b) => a.date - b.date)
          .reverse()
          .map(
            (item, itemKey) =>
              FilterNote(item, filterPhrase) && (
                <NotePreview
                  key={itemKey}
                  title={item.title}
                  date={item.date}
                  color={item.color}
                  id={item.id}
                  notesState={notesState}
                  setNotesState={setNotesState}
                />
              ),
          )}
        {noteIndexes.length > 0 && (
          <>
            <NotePreview className="noteBlank" />
            <NotePreview className="noteBlank" />
            <NotePreview className="noteBlank" />
          </>
        )}
      </Masonry>
      {notesState.showFullView && (
        <NoteFullView notesState={notesState} setNotesState={setNotesState} />
      )}
      {noteIndexes.length == 0 && <EmptyState />}
    </>
  ) : (
    <Loading />
  );
}
