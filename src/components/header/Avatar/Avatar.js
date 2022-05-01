import React, { useContext, useRef } from 'react';
import './Avatar.css';
import Image from './Avatar.jpg';
import { ReactComponent as Update } from 'assets/Icons/refresh-cw.svg';
import { gsap } from 'gsap';
import AppContext from 'store/AppContext';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import useWindowSize from 'utils/useWindowSize';

export default function Avatar() {
  const { userInfo, canBeSaved } = useContext(AppContext);

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
      <div className="picture">
        <img
          src={Image}
          alt={userInfo.nickname}
          // src={`https://avatars.dicebear.com/api/${userInfo.gender}/${userInfo.nickname}.svg?mood[]=${mood}`}
        />
      </div>
    </div>
  );
}
