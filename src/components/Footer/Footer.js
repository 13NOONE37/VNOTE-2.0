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
export default function Footer({ setNotesState }) {
  const { t } = useTranslation();
  const [isPending, startTransition] = useTransition();
  const { notes, addNewNote } = useContext(AppContext);

  const getUniqId = () => {
    const arrayOfIds = notes.map(({ id }) => id);
    let id = 0;
    while (arrayOfIds.includes(id)) {
      id += Math.random();
    }
    return id;
  };
  const showFullView = (id) => {
    console.log('Full view exec');
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
    addNewNote(note);
    showOptionalModal && (await showOptionalModal());
    showFullView(note.id);
  };
  const createDefaultNote = () => {
    //todo await until it's finished then run necessary function like full view or some modal
    handleNewNote({
      id: getUniqId(),
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
      recordings: [],
    });
  };
  const createListNote = () => {
    handleNewNote({
      id: getUniqId(),
      title: '',
      content: '',
      date: new Date(),
      lastEditDate: new Date(),
      color: 1,
      isDeleted: false,
      isListed: true,
      tags: { all: true },
      checkList: [],
      images: [],
      draws: [],
      recordings: [],
    });
  };
  const createDrawNote = () => {
    handleNewNote(
      {
        id: getUniqId(),
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
        recordings: [],
      },
      showDrawModal,
    );
    //todo call draw component and place it inside note
  };
  const createAudioNote = () => {
    handleNewNote(
      {
        id: getUniqId(),
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
        recordings: [],
      },
      showAudioModal,
    );
    //todo call audio component and place it inside note
  };
  const createImageNote = () => {
    handleNewNote(
      {
        id: getUniqId(),
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
        recordings: [],
      },
      showImageModal,
    );
    //todo call image component and place it inside note
  };

  //TODO: border radius ktory ma byc przezroczysty nalezy wyeksportowac jako clip path i uzyc go w buttonach
  return (
    <div className="footerNav">
      <button
        onClick={createListNote}
        className="navItem"
        aria-label={t('AriaCheck')}
      >
        <Check />
      </button>
      <button
        onClick={createDrawNote}
        className="navItem navItem2"
        aria-label={t('AriaPen')}
      >
        <Pen />
      </button>
      <button
        onClick={createDefaultNote}
        className="navItemSpecial"
        aria-label={t('AriaPlus')}
      >
        <Plus />
      </button>
      <button
        onClick={createAudioNote}
        className="navItem navItem3"
        aria-label={t('AriaMic')}
      >
        <Mic />
      </button>
      <button
        onClick={createImageNote}
        className="navItem"
        aria-label={t('AriaPicture')}
      >
        <Picture />
      </button>
    </div>
  );
}
