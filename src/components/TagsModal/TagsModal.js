import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import './TagsModal.css';
import Modal, { ModalButton } from 'components/Modal/Modal';

import TagsFooter from './TagsFooter/TagsFooter';
import { useTranslation } from 'react-i18next';

export default function TagsModal({
  noteValues,
  setNoteValues,
  notesState,
  setNotesState,
}) {
  const { tags } = useContext(AppContext);
  const { t } = useTranslation();

  const toggleTag = (tag) => {
    const temp = noteValues.tags;
    if (temp[tag]) {
      delete temp[tag];
    } else {
      temp[tag] = true;
    }
    setNoteValues({ ['tags']: temp });
  };
  return (
    <Modal
      additionalClass="tagsViewModal profileModal"
      setShowModal={(value) => {
        setNotesState({ ['showTagView']: value });
      }}
    >
      <span className="tagsGallery">
        <span className="tagsGallery--title">{t('SelectTags')}</span>
        <span className="tagsGallery--content">
          {tags.map((item, index) => (
            <ModalButton
              action={() => toggleTag(item)}
              key={index}
              isActive={noteValues.tags[item]}
            >
              {item}
            </ModalButton>
          ))}
        </span>
        {/* <TagsFooter additionalClass="tagsFooter" /> */}
      </span>
    </Modal>
  );
}
