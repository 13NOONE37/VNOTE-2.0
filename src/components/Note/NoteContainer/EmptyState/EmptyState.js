import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import './EmptyState.css';

export default function EmptyState() {
  const { t } = useTranslation();
  const { filterPhrase } = useContext(AppContext);
  return (
    <div className="emptyStateBox">
      <h1>༼ つ ◕_◕ ༽つ</h1>
      <h2>
        {filterPhrase.length > 0
          ? t('Nothing was found')
          : t('There are no notes here')}
      </h2>
    </div>
  );
}
