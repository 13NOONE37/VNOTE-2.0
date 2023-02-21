import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import Modal, { ActionButton } from 'components/Modal/Modal';
import './NewTagsModal.css';

import { ReactComponent as Trash } from 'assets/Icons/trash-2_2.svg';
import { ReactComponent as Dots } from 'assets/Icons/drag-handler.svg';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import { Container, Draggable } from 'react-smooth-dnd';
import applyDrag from 'utils/applyDrag';
import isValidTag from '../Utils/isValidTag';
import CreateTagField from '../CreateTag/CreateTagField';

export default function NewTagsModal({ setShowNewTagsModal }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { notes, setNotes, tags, setTags, setCanBeSaved } =
    useContext(AppContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [editTagName, setEditTagName] = useState(null);
  const [editTagID, setEditTagID] = useState(null);
  const handleChangeTag = (e, id) => {
    setEditTagID(id);
    setEditTagName(e.target.value);
  };
  const handleSaveChange = () => {
    if (editTagName === null) return;
    if (!isValidTag({ name: editTagName, tags, type: 'edit' })) return;
    let previousName;
    const currentTags = tags.map((item) => {
      if (item.id === editTagID) {
        previousName = item.name;
        item.name = editTagName;
      }
      return item;
    });
    const currentNotes = notes.map((note) => {
      if (Object.keys(note.tags).includes(previousName)) {
        delete note.tags[previousName];
        note.tags[editTagName] = editTagName;
      }
      return note;
    });
    setNotes(currentNotes);
    setTags(currentTags);
    setEditTagID(null);
    setEditTagName(null);
    navigate('/all');
  };

  const [tagDeleteID, setTagDeleteID] = useState('');
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
    setTags(tags.filter((tag) => tag.id !== tagDeleteID));
    setCanBeSaved(true);
  };

  return (
    <Modal
      additionalClass="newTagsModal"
      setShowModal={(value) => {
        setCanBeSaved(true);
        handleSaveChange();
        setShowNewTagsModal(value);
      }}
      middleHeadContent={
        <>
          <span className="tagsGallery--title">{t('AddTags')}</span>
          <ActionButton classes={'hideButton'} />
        </>
      }
    >
      <span className="newTagsGallery">
        <span className="newTagsGallery--content">
          <Container
            // shouldAnimateDrop={function shouldAnimateDrop(
            //   sourceContainerOptions,
            //   payload,
            // ) {
            //   return false;
            // }}
            dragHandleSelector=".tagArea--drag"
            lockAxis="y"
            onDrop={(e) => {
              const currentTags = applyDrag(tags, e);

              setTags(currentTags);
              setCanBeSaved(true);
            }}
          >
            {tags.map((item) => (
              <Draggable key={item.id}>
                <div className="tagArea">
                  <button
                    className="tagArea--drag"
                    aria-label={t('DragAndDrop')}
                  >
                    <Dots />
                  </button>

                  <input
                    type="text"
                    className="tagArea--input"
                    value={item.id === editTagID ? editTagName : item.name}
                    placeholder={t('AddTagName')}
                    onChange={(e) => handleChangeTag(e, item.id)}
                    onBlur={handleSaveChange}
                    maxLength={30}
                  />
                  <button
                    onClick={() => deletePrepare(item.id)}
                    className="tagArea--button tagArea--deleteIcon"
                    aria-label={t('DeleteTag')}
                  >
                    <Trash />
                  </button>
                </div>
              </Draggable>
            ))}
          </Container>
        </span>
        <CreateTagField />
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
