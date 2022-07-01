import React, { useContext } from 'react';
import AppContext from 'store/AppContext';
import './EmptyState.css';

export default function EmptyState() {
  const { filterPhrase } = useContext(AppContext);
  return (
    <div className="emptyStateBox">
      <h1>༼ つ ◕_◕ ༽つ</h1>
      <h2>
        {filterPhrase.length > 0
          ? 'Nothing was found'
          : 'There is no notes here'}
      </h2>
    </div>
  );
}
