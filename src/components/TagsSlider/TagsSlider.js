import React, { useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import './TagsSlider.css';

export default function TagsSlider() {
  const { t } = useTranslation();
  const { tags, setTags } = useContext(AppContext);
  const indicatorRef = useRef(null);
  const handleMouseOver = (e) => {
    indicatorRef.current.style.transform = `translateX(${e.currentTarget.offsetLeft}px)`;
  };
  return (
    <nav className="tagsSlider">
      <button className="tagItem" onMouseOver={handleMouseOver}>
        {t('All')}
      </button>

      {tags.map((item) => (
        <button className="tagItem" onMouseOver={handleMouseOver}>
          {item}
        </button>
      ))}
      <button className="tagItem newTag">{t('New')}</button>
      <div className="tagsIndicator" ref={indicatorRef} />
    </nav>
  );
}
