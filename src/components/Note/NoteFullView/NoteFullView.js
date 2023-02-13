import {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useTranslation } from 'react-i18next';
import ContentEditable from 'react-contenteditable';

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
import FullViewImage from '../NoteAssets/Image/FullViewImage/FullViewImage';

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
      const updatedNotes = notes.map((item) => {
        return item.id === notesState.currentId ? noteValues : item;
      });
      setNotes(updatedNotes);
      setCanBeSaved(true);
    });
  };

  const handleChange = ({ currentTarget }) => {
    const attributeName = currentTarget.getAttribute('name');
    setNoteValues({ [attributeName]: encodeURI(currentTarget.innerHTML) });
  };

  const handleChangeLine = (e, lineIndex) => {
    let temp = decodeURI(noteValues.content)
      .split('<br>')
      .map((item, index) => {
        if (index === lineIndex) return e.currentTarget.innerHTML;
        return item;
      });
    if (e.currentTarget.innerHTML.split('<br>').length - 1 === 2) {
      temp = temp.map((item) => {
        return item.replace('<br>', '');
      });
    }

    startTransition(() => {
      setNoteValues({ lastEditDate: new Date() });
    });
    setNoteValues({
      content: encodeURI(temp.join('<br>')),
    });
  };

  const handleKeyDown = (e, lineIndex) => {
    if (e.key !== 'Enter') return;

    const selectionIndex = window.getSelection().anchorOffset;
    const selectionLength = window.getSelection().anchorNode.textContent.length;
    const currentChecklist = noteValues.checkList;

    if (
      (selectionIndex === 0 && selectionLength > 0) ||
      (selectionIndex !== 0 && selectionIndex === selectionLength) ||
      selectionLength === 0
    ) {
      setTimeout(() => {
        document
          .querySelector('.noteListedContent')
          .children[lineIndex + 1].children[1].focus();
      }, 10);

      if (currentChecklist[lineIndex]) {
        currentChecklist.splice(lineIndex + 1, 0, false);
      } else {
        currentChecklist.splice(lineIndex, 0, false);
      }
    }

    for (let i = 0; i < currentChecklist.length; i++) {
      if (currentChecklist[i] === undefined) currentChecklist[i] = false;
    }
    setNoteValues({ checkList: currentChecklist });
  };

  const DeleteLine = (lineIndex) => {
    let temp = decodeURI(noteValues.content)
      .split('<br>')
      .filter((item, index) => index !== lineIndex);
    let tempCheckList = noteValues.checkList;
    tempCheckList.splice(lineIndex, 1);

    startTransition(() => {
      setNoteValues({ lastEditDate: new Date() });
    });

    setNoteValues({
      content: encodeURI(temp.join('<br>')),
    });
  };

  const toggleCheckListItem = (index) => {
    let temp = noteValues.checkList;
    temp[index] = !temp[index];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === undefined) temp[i] = false;
    }

    setNoteValues({ checkList: temp });
  };

  const handleFocus = () => setShowFooterForMobile(false);

  const preventStyledPaste = (e) => {
    e.preventDefault();
    const text = (e.originalEvent || e).clipboardData.getData('text/plain');

    document.execCommand('insertText', false, text);
  };

  const showAttachmentModal = () => {
    setNotesState({ showAttachmentModal: true });
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

  const focusRef = useRef(null);
  useEffect(() => {
    if (
      focusRef !== null &&
      !noteValues.isListed &&
      noteValues.content.length === 0
    ) {
      focusRef.current.focus();
    }
  }, []);

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
        setNotesState({ showFullView: value });
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
                  onChange={() => toggleCheckListItem(lineIndex)}
                  // onClick={() => toggleCheckListItem(lineIndex)}
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
          innerRef={focusRef}
        />
      )}
      <div
        className="noteAttachments"
        // style={{
        //   gap: `${
        //     noteValues.draws.length > 0 ||
        //     noteValues.records.length > 0 ||
        //     noteValues.images.length > 0
        //       ? '32px'
        //       : 'unset'
        //   }`,
        // }}
      >
        <div
          className="noteAttachments--records"
          style={{
            margin: `${noteValues.records.length > 0 ? '8px 0' : '0'}`,
          }}
        >
          {noteValues.records.map((record) => (
            <Record
              key={record.id}
              src={record}
              noteValues={noteValues}
              setNoteValues={setNoteValues}
            />
          ))}
        </div>
        <div
          className="noteAttachments--images"
          style={{
            margin: `${noteValues.images.length > 0 ? '8px 0' : '0'}`,
          }}
        >
          {noteValues.images.map((image) => (
            <Image
              key={image.id}
              image={image}
              setNotesState={setNotesState}
              noteValues={noteValues}
              setNoteValues={setNoteValues}
            />
          ))}
        </div>
        <div
          className="noteAttachments--images"
          style={{
            margin: `${noteValues.draws.length > 0 ? '8px 0' : '0'}`,
          }}
        >
          {noteValues.draws.map((draw) => (
            <Draw
              key={draw.id}
              draw={draw}
              id={notesState.currentId}
              setNotesState={setNotesState}
              setNoteValues={setNoteValues}
              noteValues={noteValues}
            />
          ))}
        </div>
      </div>
      <span className="lastEditDate">
        {t('LastEdit')}:
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
        setShowTagView={(value) => setNotesState({ showTagView: value })}
        noteValues={noteValues}
        setNoteValues={setNoteValues}
        updateToContext={() => updateButtonRef.current.click()}
        setShowModal={(value) => {
          setNotesState({ showFullView: value });
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
      {notesState.showFullViewImage && (
        <FullViewImage notesState={notesState} setNotesState={setNotesState} />
      )}
    </Modal>
  );
}
