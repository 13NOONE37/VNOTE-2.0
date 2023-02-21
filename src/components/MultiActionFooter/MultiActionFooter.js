import React, { useContext, useReducer, useState } from 'react';
import './MultiActionFooter.css';
import { ReactComponent as Check } from 'assets/Icons/check-square.svg';
import { ReactComponent as Tag } from 'assets/Icons/tag.svg';
import { ReactComponent as Trash } from 'assets/Icons/trash-2.svg';
import { ReactComponent as Restore } from 'assets/Icons/restore.svg';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import { useParams } from 'react-router-dom';
import TagsModal from 'components/TagsModal/TagsModal';

export default function MultiActionFooter({ notesState, setNotesState }) {
  const { category } = useParams();
  const { t } = useTranslation();
  const { notes, setNotes, setCanBeSaved } = useContext(AppContext);
  const [tempTags, setTempTags] = useState({ tags: {} });
  const [multiState, setMultiState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      showTagView: false,
    },
  );

  const setNoteValues = (name, valueCallback) => {
    const temp = notes.map((item) => {
      if (notesState.selectedNotes[item.id]) {
        if (typeof valueCallback === 'function') {
          item[name] = valueCallback(item);
        } else {
          item[name] = valueCallback;
        }
      }
      return item;
    });

    setNotes(temp);
    setCanBeSaved(true);
  };
  const changeColor = (n) => {
    setNoteValues('color', () => n);
  };
  const toggleIsListed = () => {
    setNoteValues('isListed', (item) => !item.isListed);
  };
  const handleOpenTagModal = () => {
    setMultiState({ showTagView: true });
  };
  const deleteNote = () => {
    setNoteValues('isDeleted', (item) => !item.isDeleted);

    const negateDependOnPage = (value) => {
      if (category === 'trash') {
        return value;
      } else {
        return !value;
      }
    };
    const temp = Object.values(notesState.selectedNotes).filter((firstId) =>
      notes.find((i) => i.id === firstId && negateDependOnPage(i.isDeleted)),
    );
    setNotesState({ selectedNotes: temp });
  };

  return (
    <>
      <div className="noteFooter">
        <div className="colorsRow">
          {[1, 2, 3, 4, 5, 6].map((num, index) => (
            <button
              className="colorButton"
              style={{ backgroundColor: `var(--noteColor-${num})` }}
              onClick={() => changeColor(num)}
              key={index}
              value={num}
              aria-label={t('AriaColor')}
            />
          ))}
        </div>
        <div className="actionsRow">
          <button
            className="navItem button__effect"
            onClick={toggleIsListed}
            aria-label={t('MakeListed')}
            data-tooltip__top={t('MakeListed')}
            style={{ '--leftOffset': '0px' }}
          >
            <Check />
          </button>
          <button
            className="navItem button__effect navItem2"
            onClick={handleOpenTagModal}
            aria-label={t('SetTagsForNote')}
            data-tooltip__top={t('SetTagsForNote')}
            style={{ '--leftOffset': '0px' }}
          >
            <Tag />
          </button>

          <button
            className="navItem button__effect"
            onClick={deleteNote}
            aria-label={t('DeleteNote')}
            data-tooltip__top={
              category == 'trash' ? t('RestoreNote') : t('DeleteNote')
            }
            style={{ '--leftOffset': '0px' }}
          >
            {category == 'trash' ? <Restore /> : <Trash />}
          </button>
        </div>
      </div>
      {multiState.showTagView && (
        <TagsModal
          setNotesState={setMultiState}
          noteValues={tempTags}
          setNoteValues={(value) => {
            setTempTags(value);
            setNoteValues('tags', ({ tags }) => {
              return { ...tags, ...value.tags };
            });
          }}
        />
      )}
    </>
  );
}
