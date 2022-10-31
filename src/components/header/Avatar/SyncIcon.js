import React, { useEffect, useRef } from 'react';
import { ReactComponent as Update } from 'assets/Icons/refresh-cw.svg';

export default function SyncIcon({ canBeSaved }) {
  const spinIcon = useRef(null);

  useEffect(() => {
    if (canBeSaved) {
      spinIcon.current.style.animation = '';
      setTimeout(() => {
        spinIcon.current.style.animation = 'saveIconAnimation 1s ease 1';
      }, 100);
    }
  }, [canBeSaved]);

  const handleAnimationEnd = (state) => {
    spinIcon.current.style.animation = '';
    if (state) {
      setTimeout(() => {
        spinIcon.current.style.animation = 'saveIconAnimation 1s ease 1';
      }, 100);
    }
  };
  return (
    <Update
      className="saveIcon"
      ref={spinIcon}
      onAnimationEnd={() => handleAnimationEnd(canBeSaved)}
    />
  );
}
