import React, { useContext, useEffect, useReducer, useTransition } from 'react';
import ContentEditable from 'react-contenteditable';
import './NoteFullView.css';
import Modal, { TopActionButton } from 'components/Modal/Modal';
import { ReactComponent as EditIcon } from 'assets/Icons/edit.svg';
import AppContext from 'store/AppContext';
import { useTranslation } from 'react-i18next';

export default function NoteFullView({ notesState, setNotesState }) {
  const { t } = useTranslation();
  const { language, notes, setNotes } = useContext(AppContext);
  const [isPending, startTransition] = useTransition();
  const [noteValues, setNoteValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      ...notes.find((i) => i.id === notesState.currentId),
    },
  );
  const setValue = (value, name) => setNoteValues({ [name]: value });

  const updateToContext = () => {
    console.log(noteValues);
    // startTransition(() => {
    const temp = notes.map((item) => {
      if (item.id === notesState.currentId) return noteValues;
      return item;
    });
    setNotes(temp);
    // });
  };
  useEffect(() => {
    console.log('mount full view', noteValues);
    const updateInterval = setInterval(updateToContext, 15000);

    return () => {
      updateToContext();
      console.log(noteValues);
      console.log('unmount full view');
      clearInterval(updateInterval);
    };
  }, []);

  const handleChange = (e) => {
    setValue(
      encodeURI(e.currentTarget.innerHTML),
      e.currentTarget.getAttribute('name'),
    );
  };

  return (
    <Modal
      additionalClass="hideHeader fullViewModal"
      modalHeadContent={
        <TopActionButton classes="fixedActionButton">
          <EditIcon />
        </TopActionButton>
      }
      setShowModal={(value) => setNotesState({ ['showFullView']: value })}
    >
      <ContentEditable
        style={{ color: `var(--noteColor-${noteValues.color})` }}
        className="notePreviewTitle"
        spellCheck={false}
        name="title"
        html={decodeURI(noteValues.title)}
        onChange={handleChange}
        tagName="span"
      />
      <button
        onClick={() => {
          setNoteValues({ ['title']: 'test' });
        }}
      >
        test
      </button>
      <button
        onClick={() => {
          updateToContext();
        }}
      >
        update
      </button>
      <button
        onClick={() => {
          console.log(noteValues);
        }}
      >
        log
      </button>
      <time className="createDate">
        {noteValues.date.toLocaleDateString(language, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </time>
      <ContentEditable
        className="noteContent"
        spellCheck={false}
        name="content"
        html={decodeURI(noteValues.content)}
        onChange={handleChange}
        tagName="span"
      />
      <span className="lastEditDate">
        {t('LastEdit')}:{'    '}
        <time>
          {noteValues.lastEditDate.toLocaleDateString(language, {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
      </span>
    </Modal>
  );
}
