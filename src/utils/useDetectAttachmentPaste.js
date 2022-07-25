import { useEffect } from 'react';

const useDetectAttachmentPaste = (type, handler) => {
  const listener = (e) => {
    const item = e.clipboardData.items[0];
    if (item.type.indexOf(type) === 0) {
      const blob = item.getAsFile();

      handler(blob);
    }
  };
  useEffect(() => {
    window.addEventListener('paste', listener);
    return () => window.removeEventListener('paste', listener);
  });
};
export default useDetectAttachmentPaste;
