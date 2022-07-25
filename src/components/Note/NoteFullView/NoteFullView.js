import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  useTransition,
} from 'react';
import ContentEditable from 'react-contenteditable';
import { useTranslation } from 'react-i18next';
import useWindowSize from 'utils/useWindowSize';
import AppContext from 'store/AppContext';

import Record from '../NoteAssets/Record/Record';
import Modal, { TopActionButton } from 'components/Modal/Modal';
import NoteFooter from './NoteFooter/NoteFooter';
import TagsModal from 'components/TagsModal/TagsModal';
import Checkbox from './Checkbox/Checkbox';

import { ReactComponent as EditIcon } from 'assets/Icons/edit.svg';
import { ReactComponent as Close } from 'assets/Icons/x.svg';

import './NoteFullView.css';

import audio from 'components/Note/NoteAssets/Record/audio.wav';
import NewRecord from '../NoteAssets/Record/NewRecord/NewRecord';

export default function NoteFullView({ notesState, setNotesState }) {
  const { t } = useTranslation();
  const { theme, language, notes, setNotes } = useContext(AppContext);
  const [showFooterForMobile, setShowFooterForMobile] = useState(true);
  const updateButtonRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const size = useWindowSize();

  const [noteValues, setNoteValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      ...notes.find((i) => i.id === notesState.currentId),
    },
  );

  const updateToContext = () => {
    startTransition(() => {
      const temp = notes.map((item) => {
        if (item.id === notesState.currentId) return noteValues;
        return item;
      });
      setNotes(temp);
    });
  };

  const handleChange = (e) => {
    startTransition(() => {
      setNoteValues({ ['lastEditDate']: new Date() });
    });
    setNoteValues({
      [e.currentTarget.getAttribute('name')]: encodeURI(
        e.currentTarget.innerHTML,
      ),
    });
  };
  const handleChangeLine = (e, lineIndex) => {
    let temp = decodeURI(noteValues.content)
      .split('<br>')
      .map((item, index) => {
        if (index === lineIndex) return e.currentTarget.innerHTML;
        return item;
      });
    if (e.currentTarget.innerHTML.split('<br>').length - 1 == 2) {
      temp = temp.map((item) => {
        return item.replace('<br>', '');
      });
    }

    startTransition(() => {
      setNoteValues({ ['lastEditDate']: new Date() });
    });
    setNoteValues({
      ['content']: encodeURI(temp.join('<br>')),
    });
  };
  const DeleteLine = (lineIndex) => {
    let temp = decodeURI(noteValues.content)
      .split('<br>')
      .filter((item, index) => index !== lineIndex);

    startTransition(() => {
      setNoteValues({ ['lastEditDate']: new Date() });
    });
    setNoteValues({
      ['content']: encodeURI(temp.join('<br>')),
    });
  };
  const handleCheck = (index) => {
    const temp = noteValues.checkList;
    temp[index] = !temp[index];

    setNoteValues({ ['checkList']: temp });
  };
  const handleFocus = () => setShowFooterForMobile(false);
  const preventStyledPaste = (e) => {
    e.preventDefault();
    const text = (e.originalEvent || e).clipboardData.getData('text/plain');

    document.execCommand('insertText', false, text);
  };

  /*
  todo po każdym przejściu do nowej lini jest to zapisywane do nowego elementu tablicy
  todo informacje o zaznaczeniu moglibśmy przechowywać np. poprzez napis #checked na początku lini byłby on wymazywany przed pokazaniem
  ? zaoszczędzi to wiele błędów i zmniejszy skomplikowanie kodu
  */
  useEffect(() => {
    const updateInterval = setInterval(
      () => updateButtonRef.current.click(),
      15000,
    );
    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  //!!!xss dangerous we have to take care about that
  //?paste has been fixed by using insertText now it's imposibble to inject in paste or typing
  //?but i have to read more about that

  //todo w content editable jest lista
  return (
    <Modal
      additionalClass="hideHeader fullViewModal"
      optionalColor={
        theme === 'light' && `var(--noteColor-${noteValues.color})`
      }
      modalHeadContent={
        <TopActionButton
          classes="fixedActionButton"
          action={() => setShowFooterForMobile(!showFooterForMobile)}
        >
          <EditIcon />
        </TopActionButton>
      }
      setShowModal={(value) => {
        updateToContext();
        setNotesState({ ['showFullView']: value });
      }}
    >
      <button
        style={{ display: 'none' }}
        onClick={() => updateToContext()}
        ref={updateButtonRef}
      />
      <ContentEditable
        style={{
          color: theme === 'dark' && `var(--noteColor-${noteValues.color})`,
        }}
        className="notePreviewTitle notePreviewTitle--placeholder"
        spellCheck={false}
        data-placeholder={t('DefaultTitlePlaceholder')}
        name="title"
        html={decodeURI(noteValues.title)}
        onChange={handleChange}
        tagName="span"
        onPaste={preventStyledPaste}
        onFocus={handleFocus}
        defaultValue={'Test'}
      />
      <time className="createDate">
        {noteValues.date.toLocaleDateString(language, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </time>
      {noteValues.isListed ? (
        <div className="noteListedContent">
          {decodeURI(noteValues.content)
            .split('<br>')
            .map((line, lineIndex) => (
              <span className="noteListedElement" key={lineIndex}>
                <Checkbox
                  defaultChecked={noteValues.checkList[lineIndex]}
                  onClick={() => handleCheck(lineIndex)}
                />
                <ContentEditable
                  className={`noteContent noteContent--placeholder ${
                    noteValues.checkList[lineIndex] && 'doneLine'
                  }`}
                  spellCheck={false}
                  // data-placeholder={t('ListContentPlaceholder')}
                  name="content"
                  html={line}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setTimeout(() => {
                        if (
                          line.replaceAll('<div>', '').replaceAll('</div>', '')
                            .length == 0
                        ) {
                          // console.log('if');
                          // const tempCheckList = noteValues.checkList.splice(
                          //   lineIndex,
                          //   1,
                          //   ...[noteValues.checkList[lineIndex], false],
                          // );
                          // setNoteValues({ ['checkList']: tempCheckList });
                          document
                            .querySelector('.noteListedContent')
                            .children[lineIndex + 1].children[1].focus();
                        } else if (
                          line.length > 0 &&
                          line.includes('<div>') | line.includes('</div>')
                        ) {
                          // console.log('eles if');

                          document
                            .querySelector('.noteListedContent')
                            .children[lineIndex + 1].children[1].focus();
                        }
                      }, 10);
                    }
                  }}
                  onChange={(e) => handleChangeLine(e, lineIndex)}
                  tagName="span"
                  onPaste={preventStyledPaste}
                  key={lineIndex}
                />
                <button
                  className="noteListedElement--close"
                  onClick={DeleteLine.bind(null, lineIndex)}
                >
                  <Close />
                </button>
              </span>
            ))}
        </div>
      ) : (
        <ContentEditable
          className="noteContent noteContent--placeholder"
          data-placeholder={t('DefaultContentPlaceholder')}
          spellCheck={false}
          name="content"
          html={decodeURI(noteValues.content)}
          onChange={handleChange}
          tagName="span"
          onPaste={preventStyledPaste}
          onFocus={handleFocus}
        />
      )}
      <div className="noteAttachments">
        {/* <NewRecord /> */}
        {noteValues.records.map((record) => (
          <Record audio={record} />
        ))}
        <div className="noteAttachments--records"></div>
        <div className="noteAttachments--images">
          {noteValues.images.map((image) => (
            <img src={image} alt={t('ImageUploadedByUser')} />
          ))}
        </div>
        <div className="noteAttachments--draws"></div>
        {/* <Record audio={audio} /> */}
      </div>
      <span className="lastEditDate">
        {t('LastEdit')}:{'    '}
        <time>
          {noteValues.lastEditDate.toLocaleDateString(language, {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </time>
      </span>

      <NoteFooter
        additionalClass={
          (size.width < 900) | (size.height < 750) &&
          (showFooterForMobile ? 'showNoteFooter' : 'hideNoteFooter')
        }
        setShowTagView={(value) => setNotesState({ ['showTagView']: value })}
        noteValues={noteValues}
        setNoteValues={setNoteValues}
        updateToContext={() => updateButtonRef.current.click()}
        setShowModal={(value) => {
          setNotesState({ ['showFullView']: value });
        }}
      />
      {notesState.showTagView && (
        <TagsModal
          noteValues={noteValues}
          setNoteValues={setNoteValues}
          notesState={notesState}
          setNotesState={setNotesState}
        />
      )}
    </Modal>
  );
}
