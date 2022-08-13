import { useState, useEffect } from 'react';

const useShortcuts = (data) => {
  const listener = (e) => {
    data.forEach(
      ({
        key = false,
        ctrl = false,
        alt = false,
        shift = false,
        handler = () => {},
      }) => {
        if (ctrl !== e.ctrlKey) return;
        if (alt !== e.altKey) return;
        if (shift !== e.shiftKey) return;
        if (key !== e.code) return;

        e.preventDefault();
        e.stopPropagation();
        handler();
      },
    );
  };
  useEffect(() => {
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  });
};
export default useShortcuts;
