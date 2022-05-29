import React from 'react';
import './NoteFooter.css';
import { ReactComponent as Check } from 'assets/Icons/check-square.svg';
import { ReactComponent as Tag } from 'assets/Icons/tag.svg';
import { ReactComponent as Share } from 'assets/Icons/share-2.svg';
import { ReactComponent as Trash } from 'assets/Icons/trash-2.svg';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function NoteFooter({
  noteValues,
  setNoteValues,
  additionalClass,
  updateToContext,
  setShowModal,
}) {
  const { t } = useTranslation();
  const changeColor = (n) => {
    setNoteValues({ ['color']: n });
  };
  const toggleIsTagged = () => {
    setNoteValues({ ['isTagged']: !noteValues.isTagged });
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
    setNoteValues({ ['isDeleted']: true });
    updateToContext();
    setShowModal(false);
    toast(
      <>
        <button
          className="textButton"
          onClick={() => {
            setNoteValues({ ['isDeleted']: false });
            console.log('undo');
          }}
        >
          {t('Undo')}
        </button>
        {t('DeleteNote')}
      </>,
      {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
    );
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
          />
        ))}
      </div>
      <div className="actionsRow">
        <button className="navItem" onClick={toggleIsTagged}>
          <Check />
        </button>
        <button className="navItem navItem2">
          <Tag />
        </button>
        <button className="navItem navItem3" onClick={handleShare}>
          <Share />
        </button>
        <button className="navItem" onClick={deleteNote}>
          <Trash />
        </button>
      </div>
    </div>
  );
}
