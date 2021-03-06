import React, { useContext, useId, useTransition } from 'react';
import './Footer.css';
import { ReactComponent as Check } from 'assets/Icons/check-square.svg';
import { ReactComponent as Pen } from 'assets/Icons/edit-2.svg';
import { ReactComponent as Mic } from 'assets/Icons/mic.svg';
import { ReactComponent as Picture } from 'assets/Icons/image.svg';
import { ReactComponent as Plus } from 'assets/Icons/plus.svg';

import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import handleOpenFullView from 'utils/handleOpenFullView';
import { useParams } from 'react-router-dom';
import getUniqId from 'utils/getUniqId';

export default function Footer({ setNotesState }) {
  const { t } = useTranslation();
  const { category } = useParams();
  const { notes, addNewNote } = useContext(AppContext);

  const [isPending, startTransition] = useTransition();

  const noteTemplate = {
    id: getUniqId(notes),
    title: '',
    content: '',
    date: new Date(),
    lastEditDate: new Date(),
    color: 1,
    isDeleted: false,
    isListed: false,
    tags: { all: true },
    checkList: [],
    images: [],
    draws: [],
    records: [],
  };

  const showFullView = (id) => {
    handleOpenFullView(setNotesState, id);
  };
  const showDrawModal = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Draw view exec');
        resolve();
      }, 600);
    });
  };
  const showAudioModal = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Audio view exec');
        resolve();
      }, 600);
    });
  };
  const showImageModal = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Image view exec');
        resolve();
      }, 600);
    });
  };

  const handleNewNote = async (note, showOptionalModal) => {
    if (category) note.tags[category] = true;
    addNewNote(note);
    // showOptionalModal && (await showOptionalModal());
    showOptionalModal && setNotesState({ [showOptionalModal]: note.id });
    !showOptionalModal && showFullView(note.id);
  };
  const createDefaultNote = () => {
    //todo await until it's finished then run necessary function like full view or some modal
    handleNewNote({
      ...noteTemplate,
    });
  };
  const createListNote = () => {
    handleNewNote({
      ...noteTemplate,
      isListed: true,
    });
  };
  const createDrawNote = () => {
    handleNewNote(
      {
        ...noteTemplate,
      },
      // showDrawModal,
      'showDrawModal',
    );
    //todo call draw component and place it inside note
  };
  const createAudioNote = () => {
    handleNewNote(
      {
        ...noteTemplate,
      },
      // showAudioModal,
      'showRecordModal',
    );
    //todo call audio component and place it inside note
  };
  const createImageNote = () => {
    handleNewNote(
      {
        ...noteTemplate,
      },
      // showImageModal,
      'showImageModal',
    );
    //todo call image component and place it inside note
  };

  //TODO: border radius ktory ma byc przezroczysty nalezy wyeksportowac jako clip path i uzyc go w buttonach
  return (
    <div className="footerNav">
      <button
        onClick={createListNote}
        className="navItem button__effect"
        aria-label={t('NewListedNote')}
        data-tooltip__top={t('NewListedNote')}
      >
        <Check />
      </button>
      <button
        onClick={createDrawNote}
        className="navItem button__effect navItem2"
        aria-label={t('NewDrawNote')}
        data-tooltip__top={t('NewDrawNote')}
      >
        <Pen />
      </button>
      <button
        onClick={createDefaultNote}
        className="navItemSpecial"
        aria-label={t('NewNote')}
        data-tooltip__top={t('NewNote')}
      >
        <Plus />
      </button>
      <button
        onClick={createAudioNote}
        className="navItem button__effect navItem3"
        aria-label={t('NewAudioNote')}
        data-tooltip__top={t('NewAudioNote')}
      >
        <Mic />
      </button>
      <button
        onClick={createImageNote}
        className="navItem button__effect"
        aria-label={t('NewPictureNote')}
        data-tooltip__top={t('NewPictureNote')}
      >
        <Picture />
      </button>
    </div>
  );
}
