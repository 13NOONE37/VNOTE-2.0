import React, {
  useContext,
  useEffect,
  useLayoutEffect,
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
  const updateAttachment = () => {
    document.querySelector('.noteAttachments').style.width = `${
      document.querySelector('.noteContent').getBoundingClientRect().width
    }px`;
  };
  const handleChange = (e) => {
    startTransition(() => {
      updateAttachment();
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
      updateAttachment();
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
  const showAttachmentModal = () => {
    setNotesState({ ['showAttachmentModal']: true });
  };

  useEffect(() => {
    const updateInterval = setInterval(
      () => updateButtonRef.current.click(),
      15000,
    );
    updateAttachment();
    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  //!!!xss dangerous we have to take care about that
  /*
  todo po ka??dym przej??ciu do nowej lini jest to zapisywane do nowego elementu tablicy
  todo informacje o zaznaczeniu moglib??my przechowywa?? np. poprzez napis #checked na pocz??tku lini by??by on wymazywany przed pokazaniem
  ? zaoszcz??dzi to wiele b????d??w i zmniejszy skomplikowanie kodu
  */
  //! content editable mo??e akceptowa?? tylko style b, i, oraz rozpoznowa?? linki u a nie przyk??adowo zdj??cia nale??y u??y?? jakiego?? z neta albo napisa?? w??asny
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
        {noteValues.records.map((record) => (
          <Record audio={record} />
        ))}

        <div className="noteAttachments--records"></div>
        <Masonry
          className="noteAttachments--images"
          columnClassName="noteAttachments--images--column"
        >
          {noteValues.images.map((image) => (
            <Image
              src={image}
              setNoteValues={setNoteValues}
              noteValues={noteValues}
            />
          ))}
          {noteValues.draws.map((draw) => (
            <span>draw</span>
            // <img src={image} alt={t('ImageUploadedByUser')} />
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
