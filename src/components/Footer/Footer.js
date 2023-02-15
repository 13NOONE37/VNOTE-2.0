import { useContext } from 'react';
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

import uuid4 from 'uuid4';

export default function Footer({ setNotesState }) {
  const { t } = useTranslation();
  const { category } = useParams();
  const { addNewNote } = useContext(AppContext);

  const noteTemplate = {
    id: uuid4(),
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

  const handleNewNote = async (note, type, showOptionalModal) => {
    if (category) note.tags[category] = true;
    addNewNote(note);
    // showOptionalModal && (await showOptionalModal());
    showOptionalModal &&
      setNotesState({
        [showOptionalModal]: {
          id: note.id,
          attachmentNumber: note[type].length,
        },
      });
    !showOptionalModal && showFullView(note.id);
  };
  const createDefaultNote = () => {
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
      'draws',
      'showDrawModal',
    );
  };
  const createAudioNote = () => {
    handleNewNote(
      {
        ...noteTemplate,
      },
      'records',
      'showRecordModal',
    );
  };
  const createImageNote = () => {
    handleNewNote(
      {
        ...noteTemplate,
      },
      'images',
      'showImageModal',
    );
  };
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
