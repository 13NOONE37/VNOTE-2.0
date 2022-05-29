import React, { useContext, useRef, useState } from 'react';
import './Avatar.css';
import Image from './Avatar.jpg';
import { ReactComponent as Update } from 'assets/Icons/refresh-cw.svg';
import { gsap } from 'gsap';
import AppContext from 'store/AppContext';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import useWindowSize from 'utils/useWindowSize';
import ProfileModal from './ProfileModal';
import { toast } from 'react-toastify';

export default function Avatar() {
  const { userInfo, canBeSaved } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);
  const spinIcon = useRef(null);
  const spin = () => {
    const tl = gsap.timeline();
    if (canBeSaved) {
      tl.fromTo(spinIcon.current, { rotate: 0 }, { rotate: 360, duration: 1 });
      toast.info('uploading data; replace with promise notify');
    } else {
      tl.from(spinIcon.current, { rotate: 0, ease: 'power3.inOut' })
        .to(spinIcon.current, { rotate: 40 })
        .to(spinIcon.current, {
          rotate: 0,
          ease: 'power3.inOut',
          duration: 0.3,
        });
      toast.info('already synced with cloud');
    }
  };

  const size = useWindowSize();

  return (
    <div className="avatar">
      {size.width < 750 && <ThemeToggler />}
      <Update className="saveIcon" ref={spinIcon} onClick={spin} />
      <div className="picture" onClick={() => setShowModal(true)}>
        <img
          src={Image}
          alt="Avatar"
          // src={`https://avatars.dicebear.com/api/${userInfo.gender}/${userInfo.nickname}.svg?mood[]=${mood}`}
        />
      </div>

      <ProfileModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
