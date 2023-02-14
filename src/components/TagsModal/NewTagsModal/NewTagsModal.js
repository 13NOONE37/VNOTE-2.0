import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import SearchInput from 'components/header/SearchBar/SearchInput/SearchInput';
import Modal, { ActionButton } from 'components/Modal/Modal';
import './NewTagsModal.css';
import { ReactComponent as Tags } from 'assets/Icons/tag-2.svg';
import { ReactComponent as Plus } from 'assets/Icons/plus.svg';
import { ReactComponent as Trash } from 'assets/Icons/trash-2_2.svg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';

export default function NewTagsModal({ setShowNewTagsModal }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { notes, setNotes, tags, setTags, setCanBeSaved } =
    useContext(AppContext);
  const [tagName, setTagName] = useState('');

  const [tagsNames, setTagsNames] = useState(tags);
  const [tagID, setTagID] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tagDeleteID, setTagDeleteID] = useState('');

  const handleChangeTag = (e, tagIndex) => {
    setTagID(tagIndex);
    const tagName = e.target.value;

    const tempTags = tagsNames.map((item, index) => {
      if (index === tagIndex) {
        item = tagName;
      }
      return item;
    });
    setTagsNames(tempTags);
  };
  const handleSaveChange = () => {
    if (!isValidTag(tagsNames[tagID])) return;

    setTags(tagsNames);
    setTagID(false);
    navigate('/all');
  };
  const handleChangeNewTag = (e) => {
    setTagName(e.target.value);
  };
  const deletePrepare = (tagToDelete) => {
    setTagDeleteID(tagToDelete);
    setShowConfirmModal(true);
  };
  const deleteTag = () => {
    setNotes(
      notes.map((note) => {
        delete note.tags[tagDeleteID];
        return note;
      }),
    );
    setTagsNames(tags.filter((tag) => tag != tagDeleteID));
    setTags(tags.filter((tag) => tag != tagDeleteID));
    setCanBeSaved(true);
  };
  const handleAddNewTag = (e) => {
    e.preventDefault();
    if (!isValidTag(tagName)) return;

    setTagsNames([...tags, tagName]);
    setTags([...tags, tagName]);
    setTagName('');
    setCanBeSaved(true);
  };
  const isValidTag = (name) => {
    if (name === undefined) return false;

    if (name.trim().length === 0) {
      toast.info(
        t('EmptyTagName', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        }),
      );
      return false;
    }
    if (name.trim().length > 30) {
      toast.info(
        t('TooLongTagName', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        }),
      );
      return false;
    }
    if (tags.find((tag) => tag === name)) {
      toast.info(
        t('TagNameExist', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        }),
      );
      return false;
    }
    if (
      new RegExp(/^trash$/i).test(name) ||
      new RegExp(/^wszystkie$/i).test(name) ||
      new RegExp(/^kosz$/i).test(name) ||
      new RegExp(/^all$/i).test(name)
    ) {
      toast.info(
        t('WrongTagName', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        }),
      );
      return false;
    }
    return true;
  };

  return (
    <Modal
      additionalClass="tagsViewModal profileModal newTagsModal"
      setShowModal={(value) => {
        setCanBeSaved(true);
        setShowNewTagsModal(value);
      }}
    >
      <span className="tagsGallery newTagsGallery">
        <span className="tagsGallery--title">{t('AddTags')}</span>
        <span className="tagsGallery--content">
          {tagsNames.map((item, index) => (
            <div className="tagArea">
              <input
                type="text"
                className="modalButton"
                value={item}
                onChange={(e) => handleChangeTag(e, index)}
                onBlur={handleSaveChange}
                maxLength={30}
              />
              <button
                onClick={() => deletePrepare(item)}
                className="navItem"
                aria-label={t('DeleteTag')}
              >
                <Trash />
              </button>
            </div>
          ))}
        </span>
        <form onSubmit={handleAddNewTag}>
          <SearchInput
            inputValue={tagName}
            inputAction={handleChangeNewTag}
            closeAction={() => {
              setTagName('');
            }}
            placeholder={t('AddNewTag')}
            icon={() => <Tags />}
            variant2
            maxLength={30}
          />
          <ActionButton classes={'newTagButton'} type="submit">
            <Plus />
          </ActionButton>
        </form>
      </span>
      {showConfirmModal && (
        <ConfirmModal
          setShowModal={setShowConfirmModal}
          confirmText={t('DeleteTag')}
          handler={deleteTag}
        />
      )}
    </Modal>
  );
}
