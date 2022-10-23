import React, { useContext, useEffect, useRef, useState } from 'react';
import './Avatar.css';
import { ReactComponent as Update } from 'assets/Icons/refresh-cw.svg';
import { gsap } from 'gsap';
import AppContext from 'store/AppContext';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import ProfileModal from './ProfileModal';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function Avatar() {
  const { t } = useTranslation();
  const { userInfo, canBeSaved } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);
  const spinIcon = useRef(null);
  const tl = gsap.timeline();

  useEffect(() => {
    if (canBeSaved) {
      tl.fromTo(
        spinIcon.current,
        { rotate: 0, ease: 'linear' },
        {
          rotate: 360,
          duration: 2,
          repeat: -1,
        },
      );
    } else {
      tl.to(spinIcon.current, {
        rotate: 0,
        ease: 'linear',
        duration: 1,
        repeat: 1,
      });
    }
  }, [canBeSaved]);

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
        <Update className="saveIcon" ref={spinIcon} />
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
