import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import './TagsSlider.css';

export default function TagsSlider() {
  const { t } = useTranslation();
  const { tags, setTags } = useContext(AppContext);

  return (
    <nav className="tagsSlider">
      <button className="tagItem selectedItem">{t('All')}</button>
      {tags.map((item) => (
        <button className="tagItem">{item}</button>
      ))}
      <button className="tagItem newTag">{t('NewTag')}</button>
    </nav>
  );
}
