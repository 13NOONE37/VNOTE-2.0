import React from 'react';
import './NoteFooter.css';
import { ReactComponent as Check } from 'assets/Icons/check-square.svg';
import { ReactComponent as Tag } from 'assets/Icons/tag.svg';
import { ReactComponent as Share } from 'assets/Icons/share-2.svg';
import { ReactComponent as Trash } from 'assets/Icons/trash-2.svg';
import { ReactComponent as Restore } from 'assets/Icons/restore.svg';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function NoteFooter({
  noteValues,
  setNoteValues,
  additionalClass,
  updateToContext,
  setShowModal,
  setShowTagView,
}) {
  const { t } = useTranslation();
  const changeColor = (n) => {
    setNoteValues({ ['color']: n });
  };
  const toggleIsListed = () => {
    setNoteValues({ ['isListed']: !noteValues.isListed });
  };
  const handleOpenTagModal = () => {
    setShowTagView(true);
  };
  const handleShare = () => {
    const linkToShare = 'https://tostring.app/noone/note?=1337abasd';

    navigator.clipboard.writeText(linkToShare);
    //TODO:we should implement some check if it's not copied(for example when http)

    toast.info(t('shareCopy'), {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  const deleteNote = () => {
    setNoteValues({ ['isDeleted']: !noteValues.isDeleted });
    //it's not too good solution i think
    setTimeout(() => {
      updateToContext();
      setShowModal(false);
      !noteValues.isDeleted &&
        toast(t('NoteDeleted'), {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
    }, 0);
  };
  return (
    <div className={`noteFooter ${additionalClass}`}>
      <div className="colorsRow">
        {[1, 2, 3, 4, 5, 6].map((num, index) => (
          <button
            className={`colorButton ${
              noteValues.color === num && 'selectedColorButton'
            }`}
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
          onClick={handleOpenTagModal}
          aria-label={t('SetTagsForNote')}
          data-tooltip__top={t('SetTagsForNote')}
        >
          <Tag />
        </button>
        <button
          className="navItem navItem3"
          onClick={handleShare}
          aria-label={t('ShareNote')}
          data-tooltip__top={t('ShareNote')}
        >
          <Share />
        </button>
        <button
          className="navItem"
          onClick={deleteNote}
          aria-label={t('DeleteNote')}
          data-tooltip__top={
            noteValues.isDeleted ? t('RestoreNote') : t('DeleteNote')
          }
        >
          {noteValues.isDeleted ? <Restore /> : <Trash />}
        </button>
      </div>
    </div>
  );
}
