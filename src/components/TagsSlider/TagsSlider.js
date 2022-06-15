import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import './TagsSlider.css';
import NewTagsModal from 'components/TagsModal/NewTagsModal/NewTagsModal';

export default function TagsSlider() {
  const { t } = useTranslation();
  const { tags, setTags } = useContext(AppContext);
  const [showNewTagsModal, setShowNewTagsModal] = useState(false);
  return (
    <nav className="tagsSlider">
      <button className="tagItem selectedItem">{t('All')}</button>
      {tags.map((item, index) => (
        <button className="tagItem" key={index}>
          {item || t('WithoutTitle')}
        </button>
      ))}
      <button
        className="tagItem newTag"
        onClick={() => setShowNewTagsModal(true)}
      >
        {t('NewTag')}
      </button>
      {showNewTagsModal && (
        <NewTagsModal setShowNewTagsModal={setShowNewTagsModal} />
      )}
    </nav>
  );
}
