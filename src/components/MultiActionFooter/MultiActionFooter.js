import React, { useContext } from 'react';
import './MultiActionFooter.css';
import { ReactComponent as Check } from 'assets/Icons/check-square.svg';
import { ReactComponent as Tag } from 'assets/Icons/tag.svg';
import { ReactComponent as Share } from 'assets/Icons/share-2.svg';
import { ReactComponent as Trash } from 'assets/Icons/trash-2.svg';
import { ReactComponent as Restore } from 'assets/Icons/restore.svg';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import { useParams } from 'react-router-dom';

export default function MultiActionFooter({ notesState }) {
  const { category } = useParams();
  const { t } = useTranslation();
  const { notes, setNotes } = useContext(AppContext);

  const setNoteValues = (name, valueCallback) => {
    const temp = notes.map((item) => {
      if (notesState.selectedNotes[item.id]) {
        item[name] = valueCallback(item);
      }
      return item;
    });

    setNotes(temp);
  };

  const changeColor = (n) => {
    setNoteValues('color', () => n);
  };
  const toggleIsListed = () => {
    setNoteValues('isListed', (item) => !item.isDeleted);
  };
  const handleOpenTagModal = () => {
    // setShowTagView(true);
  };

  const deleteNote = () => {
    //   setNoteValues({ ['isDeleted']: !noteValues.isDeleted });
    //   //it's not too good solution i think
    //   setTimeout(() => {
    //     updateToContext();
    //     setShowModal(false);
    //     !noteValues.isDeleted &&
    //       toast(t('NoteDeleted'), {
    //         position: 'bottom-right',
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: false,
    //         draggable: true,
    //         progress: undefined,
    //       });
    //   }, 0);
  };
  return (
    <div className="noteFooter">
      <div className="colorsRow">
        {[1, 2, 3, 4, 5, 6].map((num, index) => (
          <button
            // className={`colorButton
            // ${
            //   noteValues.color === num && 'selectedColorButton'
            // }`}
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
          className="navItem"
          onClick={toggleIsListed}
          aria-label={t('MakeListed')}
          data-tooltip__top={t('MakeListed')}
        >
          <Check />
        </button>
        <button
          className="navItem navItem2"
          // onClick={handleOpenTagModal}
          aria-label={t('SetTagsForNote')}
          data-tooltip__top={t('SetTagsForNote')}
        >
          <Tag />
        </button>

        <button
          className="navItem"
          onClick={deleteNote}
          aria-label={t('DeleteNote')}
          data-tooltip__top={
            category == 'trash' ? t('RestoreNote') : t('DeleteNote')
          }
        >
          {category == 'trash' ? <Restore /> : <Trash />}
        </button>
      </div>
    </div>
  );
}
