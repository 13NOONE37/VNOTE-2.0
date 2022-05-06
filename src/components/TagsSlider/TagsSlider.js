import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import './TagsSlider.css';

export default function TagsSlider() {
  const { t } = useTranslation();
  const { tags, setTags } = useContext(AppContext);
  // TODO: ideas https://swiperjs.com/ https://codepen.io/Anna_Batura/pen/WNGMerN https://freefrontend.com/javascript-carousels/ https://codepen.io/Alexandr/pen/XWdrxxP
  return (
    <nav
      className="tagsSlider"
      style={{ gridTemplateColumns: `repeat(${tags.length + 3}, auto)` }}
    >
      <button className="tagItem selectedItem">{t('All')}</button>
      <button className="tagItem">{t('Alaaaaaaaaaaaaaaal')}</button>
      {tags.map((item) => (
        <button className="tagItem">{item}</button>
      ))}
      <button className="tagItem newTag">{t('New')}</button>
    </nav>
  );
}
