import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import './TagsSlider.css';
import NewTagsModal from 'components/TagsModal/NewTagsModal/NewTagsModal';
import { useNavigate, useParams } from 'react-router-dom';

export default function TagsSlider() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { category } = useParams();

  const { tags } = useContext(AppContext);
  const [showNewTagsModal, setShowNewTagsModal] = useState(false);

  const tagsSliderRef = useRef(null);

  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    tagsSliderRef.current.scrollLeft += e.deltaY / 2;
  };
  useEffect(() => {
    tagsSliderRef.current.removeEventListener('wheel', handleWheel);
    tagsSliderRef.current.addEventListener('wheel', handleWheel, {
      passive: false,
    });
  }, []);

  return (
    <nav className="tagsSlider" ref={tagsSliderRef}>
      <button
        className={`tagItem ${
          (category === 'all' || category === undefined) && 'selectedItem'
        }`}
        onClick={() => navigate(`/all`)}
      >
        {t('All')}
      </button>
      {tags.map((item) => (
        <button
          className={`tagItem ${category === item.name && 'selectedItem'}`}
          key={item.id}
          onClick={() => navigate(`/${item.name}`)}
        >
          {item.name || t('WithoutTitle')}
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
