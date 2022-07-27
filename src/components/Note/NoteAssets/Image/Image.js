import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Close } from 'assets/Icons/x.svg';
import './Image.css';

export default function Image({ noteValues, setNoteValues, src }) {
  const { t } = useTranslation();

  const handleDelete = () => {
    const temp = noteValues.images.filter((image) => image !== src);
    setNoteValues({ ['images']: temp });
  };
  return (
    <div className="image--box">
      <img src={src} alt={t('UserImage')} />
      <button onClick={handleDelete}>
        <Close />
      </button>
    </div>
  );
}
