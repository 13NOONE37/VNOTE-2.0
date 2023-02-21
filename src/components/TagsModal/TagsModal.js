import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import './TagsModal.css';
import Modal, { ActionButton, ModalButton } from 'components/Modal/Modal';

import { useTranslation } from 'react-i18next';
import CreateTagField from './CreateTag/CreateTagField';

export default function TagsModal({
  noteValues,
  setNoteValues,
  setNotesState,
}) {
  const { tags } = useContext(AppContext);
  const { t } = useTranslation();

  const toggleTag = (tag) => {
    const temp = noteValues.tags;
    if (temp[tag]) {
      // if (Object.values(temp).length > 1) {
      delete temp[tag];
      // }
    } else {
      temp[tag] = true;
    }
    setNoteValues({ tags: temp });
  };
  return (
    <Modal
      additionalClass="tagsViewModal profileModal"
      setShowModal={(value) => {
        setNotesState({ showTagView: value });
      }}
      middleHeadContent={
        <>
          <span className="tagsGallery--title">{t('SelectTags')}</span>
          <ActionButton classes={'hideButton'} />
        </>
      }
    >
      <span className="tagsGallery">
        <span className="tagsGallery--content">
          {[...tags].map((item) => (
            <ModalButton
              action={() => toggleTag(item.name)}
              key={item.id}
              isActive={noteValues.tags[item.name]}
              isCollapse={false}
            >
              {item.name || t('WithoutTitle')}
            </ModalButton>
          ))}
        </span>
        <CreateTagField />
      </span>
    </Modal>
  );
}
