import React, { useContext, useState } from 'react';
import './Avatar.css';

import AppContext from 'store/AppContext';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import ProfileModal from './ProfileModal';
import { useTranslation } from 'react-i18next';
import SyncIcon from './SyncIcon';

export default function Avatar() {
  const { t } = useTranslation();
  const { userInfo, canBeSaved } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="avatar">
      <ThemeToggler />
      <div
        data-tooltip__bottom={canBeSaved ? t('SyncData') : t('DataSynced')}
        style={{
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <SyncIcon canBeSaved={canBeSaved} />
      </div>
      <div className="picture" onClick={() => setShowModal(true)}>
        <img
          src={
            userInfo?.photoURL ||
            `https://avatars.dicebear.com/api/bottts/${
              userInfo?.nickname || 'Nickname'
            }${userInfo.metadata.createdAt}.svg`
          }
          alt="Avatar"
        />
      </div>

      <ProfileModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
