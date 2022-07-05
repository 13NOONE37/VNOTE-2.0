import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import './TagsSlider.css';
import NewTagsModal from 'components/TagsModal/NewTagsModal/NewTagsModal';
import { useNavigate, useParams } from 'react-router-dom';

export default function TagsSlider() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { category } = useParams();

  const { tags, setTags } = useContext(AppContext);
  const [showNewTagsModal, setShowNewTagsModal] = useState(false);

  return (
    <nav className="tagsSlider">
      <button
        className={`tagItem ${category === 'all' && 'selectedItem'}`}
        onClick={() => navigate(`/all`)}
      >
        {t('All')}
      </button>
      {tags.map((item, index) => (
        <button
          className={`tagItem ${category === item && 'selectedItem'}`}
          key={index}
          onClick={() => navigate(`/${item}`)}
        >
          {item || t('WithoutTitle')}
        </button>
      ))}
      <button
        className={`tagItem  ${category === 'trash' && 'selectedItem'}`}
        onClick={() => navigate(`/trash`)}
      >
        {t('Trash')}
      </button>
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
