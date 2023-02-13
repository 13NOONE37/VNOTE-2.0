import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function FetchError() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="notFoundBox">
      <h2 className="notFoundBox--heading notFoundBox--heading__2">
        {t('FetchError')}
      </h2>
      <button className="notFoundBox--button" onClick={() => navigate('/')}>
        {t('Go back')}
      </button>
    </div>
  );
}
