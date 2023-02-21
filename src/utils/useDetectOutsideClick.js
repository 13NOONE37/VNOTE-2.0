import { useEffect } from 'react';

const useDetectOutsideClick = (ref, handler) => {
  const listener = (e) => {
    if (!ref.current || ref.current.contains(e.target)) {
      return;
    }
    //? if statement below prevent closing modal
    //? or other component that use detectOutsideClick
    //? from closing when we close notify
    if (document.querySelector('.Toastify').contains(e.target)) {
      return;
    }
    e.stopPropagation();
    handler(false);
  };
  const keyListener = (e) => {
    if (e.key === 'Escape') {
      handler(false);
    }
  };
  useEffect(() => {
    window.addEventListener('mousedown', listener);
    window.addEventListener('keydown', keyListener);
    return () => {
      window.removeEventListener('mousedown', listener);
      window.removeEventListener('keydown', keyListener);
    };
  });
};
export default useDetectOutsideClick;
