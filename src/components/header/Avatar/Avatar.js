import React, { useContext, useRef, useState } from 'react';
import './Avatar.css';
import Image from './Avatar.jpg';
import { ReactComponent as Update } from 'assets/Icons/refresh-cw.svg';
import { gsap } from 'gsap';
import AppContext from 'store/AppContext';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import useWindowSize from 'utils/useWindowSize';
import Modal, { ModalButton } from 'components/Modal/Modal';
import { t } from 'i18next';

import { ReactComponent as LanguageIcon } from 'assets/Icons/lock.svg';
import { ReactComponent as FileIcon } from 'assets/Icons/lock.svg';
import { ReactComponent as LockIcon } from 'assets/Icons/lock.svg';
import { ReactComponent as LogoutIcon } from 'assets/Icons/lock.svg';

export default function Avatar() {
  const { userInfo, canBeSaved, setLanguage } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);
  const spinIcon = useRef(null);
  const spin = () => {
    const tl = gsap.timeline();
    if (canBeSaved) {
      tl.fromTo(spinIcon.current, { rotate: 0 }, { rotate: 360, duration: 1 });
    } else {
      tl.from(spinIcon.current, { rotate: 0, ease: 'power3.inOut' })
        .to(spinIcon.current, { rotate: 40 })
        .to(spinIcon.current, {
          rotate: 0,
          ease: 'power3.inOut',
          duration: 0.3,
        });
      window.alert('Show notify that it is already saved');
    }
  };

  const size = useWindowSize();

  return (
    <div className="avatar">
      {size.width < 750 && <ThemeToggler />}
      <Update className="saveIcon" ref={spinIcon} onClick={spin} />
      <div className="picture" onClick={() => setShowModal(!showModal)}>
        <img
          src={Image}
          alt={userInfo.nickname}
          // src={`https://avatars.dicebear.com/api/${userInfo.gender}/${userInfo.nickname}.svg?mood[]=${mood}`}
        />
      </div>

      {showModal && (
        <Modal setShowModal={setShowModal}>
          <h1>hello gustaw</h1>
          <ModalButton
            isCollapse
            collapseContent={
              <>
                <button onClick={() => setLanguage('pl')}>pl</button>
                <button onClick={() => setLanguage('en')}>en</button>
              </>
            }
          >
            <LanguageIcon />
            {t('Language')}
          </ModalButton>
          <ModalButton isCollapse>
            <FileIcon />
            {t('ImportExport')}
          </ModalButton>
          <ModalButton isCollapse>
            <LockIcon />
            {t('ChangePasswordEmail')}
          </ModalButton>
          <ModalButton>
            <LogoutIcon />
            {t('Logout')}
          </ModalButton>
        </Modal>
      )}
    </div>
  );
}
