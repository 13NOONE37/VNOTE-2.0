import { useEffect } from 'react';

const useDetectOutsideClick = (ref, handler) => {
  const listener = (e) => {
    if (!ref.current || ref.current.contains(e.target)) {
      return;
    }
    handler(false);
  };
  useEffect(() => {
    window.addEventListener('mousedown', listener);
    return () => window.removeEventListener('mousedown', listener);
  });
};
export default useDetectOutsideClick;
