import { useTranslation } from 'react-i18next';
import Modal from 'components/Modal/Modal';
import './ConfirmModal.css';
import { useEffect, useRef } from 'react';

export default function ConfirmModal({ confirmText, handler, setShowModal }) {
  const { t } = useTranslation();
  const buttonRef = useRef(null);
  useEffect(() => {
    buttonRef.current.focus();
  }, []);

  return (
    <Modal setShowModal={setShowModal} additionalClass={'confirmModal'}>
      <div className="confirmModal--box">
        <button
          className="confirmModal--button"
          onClick={() => setShowModal(false)}
          ref={buttonRef}
        >
          {t('Cancel')}
        </button>
        <button
          className="confirmModal--button confirmModal--button__main"
          onClick={() => {
            handler();
            setShowModal(false);
          }}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
