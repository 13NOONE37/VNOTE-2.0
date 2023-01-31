import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useTranslation } from 'react-i18next';
import ContentEditable from 'react-contenteditable';
import Masonry from 'react-masonry-css';

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
import AttachmentModal from '../NoteAssets/AttachmentModal/AttachmentModal';
import Image from '../NoteAssets/Image/Image';
import Draw from '../NoteAssets/Draw/Draw';

export default function NoteFullView({ notesState, setNotesState }) {
  const { t } = useTranslation();
  const { theme, language, notes, setNotes, setCanBeSaved } =
    useContext(AppContext);
  const [showFooterForMobile, setShowFooterForMobile] = useState(false);
  const updateButtonRef = useRef(null);
  const noteListedElementRef = useRef(null);
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
      setCanBeSaved(true);
    });
  };
  const handleChange = (e) => {
    startTransition(() => {
      // updateAttachment();
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
      // updateAttachment();
      setNoteValues({ ['lastEditDate']: new Date() });
    });
    setNoteValues({
      ['content']: encodeURI(temp.join('<br>')),
    });
  };
  const handleKeyDown = (e, lineIndex) => {
    if (e.key === 'Enter') {
      const handleFocusNext = (index) => {
        setTimeout(() => {
          document
            .querySelector('.noteListedContent')
            .children[index + 1].children[1].focus();
        }, 10);
      };
      const selectionIndex = window.getSelection().anchorOffset;
      // const lineLength = line
      //   .replaceAll('<div>', '')
      //   .replaceAll('</div>', '').length;

      if (
        selectionIndex < window.getSelection().anchorNode.textContent.length
      ) {
        console.log('mid', window.getSelection());
      } else {
        handleFocusNext(lineIndex);
        let temp = noteValues.checkList;
        if (temp[lineIndex]) {
          temp.splice(lineIndex + 1, 0, false);
        } else {
          temp.splice(lineIndex, 0, false);
        }
        setNoteValues({ ['checkList']: temp });
      }
    }
  };
  const DeleteLine = (lineIndex) => {
    let temp = decodeURI(noteValues.content)
      .split('<br>')
      .filter((item, index) => index !== lineIndex);
    let tempCheckList = noteValues.checkList;
    tempCheckList.splice(lineIndex, 1);
    console.log(noteValues.checkList, lineIndex);
    console.log(tempCheckList);

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
  const showAttachmentModal = () => {
    setNotesState({ ['showAttachmentModal']: true });
  };

  useEffect(() => {
    const updateTimeout = setTimeout(
      () => updateButtonRef.current.click(),
      500,
    );
    return () => {
      clearTimeout(updateTimeout);
    };
  }, [noteValues]);

  return (
    <Modal
      additionalClass="hideHeader fullViewModal"
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
              <span
                className="noteListedElement"
                key={lineIndex}
                ref={noteListedElementRef}
              >
                <Checkbox
                  checked={noteValues.checkList[lineIndex]}
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
                  onKeyDown={(e) => handleKeyDown(e, lineIndex)}
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
      <div
        className="noteAttachments"
        style={{
          gap: `${
            noteValues.draws.length > 0 ||
            noteValues.images.length > 0 ||
            noteValues.images.length > 0
              ? '32px'
              : 'unset'
          }`,
        }}
      >
        <div className="noteAttachments--records">
          {noteValues.records.map((record, recordIndex) => (
            <Record
              key={recordIndex}
              src={record}
              setNoteValues={setNoteValues}
              noteValues={noteValues}
            />
          ))}
        </div>
        <Masonry
          className="noteAttachments--images"
          columnClassName="noteAttachments--images--column"
        >
          {noteValues.images.map((image, imageIndex) => (
            <Image
              key={imageIndex}
              src={image}
              setNoteValues={setNoteValues}
              noteValues={noteValues}
            />
          ))}
        </Masonry>
        <Masonry
          className="noteAttachments--images "
          columnClassName="noteAttachments--images--column"
        >
          {noteValues.draws.map((draw, drawIndex) => (
            <Draw
              key={drawIndex}
              url={draw}
              setNotesState={setNotesState}
              setNoteValues={setNoteValues}
              noteValues={noteValues}
            />
          ))}
        </Masonry>
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
        showAttachmentModal={showAttachmentModal}
      />
      {notesState.showAttachmentModal && (
        <AttachmentModal
          notesState={notesState}
          setNotesState={setNotesState}
        />
      )}
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
