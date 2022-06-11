import React from 'react';
import './Footer.css';
import { ReactComponent as Check } from 'assets/Icons/check-square.svg';
import { ReactComponent as Pen } from 'assets/Icons/edit-2.svg';
import { ReactComponent as Mic } from 'assets/Icons/mic.svg';
import { ReactComponent as Picture } from 'assets/Icons/image.svg';
import { ReactComponent as Plus } from 'assets/Icons/plus.svg';
import { useTranslation } from 'react-i18next';
export default function Footer() {
  const { t } = useTranslation();
  //TODO: border radius ktory ma byc przezroczysty nalezy wyeksportowac jako clip path i uzyc go w buttonach
  return (
    <div className="footerNav">
      <button className="navItem" aria-label={t('AriaCheck')}>
        <Check />
      </button>
      <button className="navItem navItem2" aria-label={t('AriaPen')}>
        <Pen />
      </button>
      <button className="navItemSpecial" aria-label={t('AriaPlus')}>
        <Plus />
      </button>
      <button className="navItem navItem3" aria-label={t('AriaMic')}>
        <Mic />
      </button>
      <button className="navItem" aria-label={t('AriaPicture')}>
        <Picture />
      </button>
    </div>
  );
}
