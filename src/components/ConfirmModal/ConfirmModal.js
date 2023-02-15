import { useTranslation } from 'react-i18next';
import Modal from 'components/Modal/Modal';
import './ConfirmModal.css';

export default function ConfirmModal({ confirmText, handler, setShowModal }) {
  const { t } = useTranslation();
  return (
    <Modal setShowModal={setShowModal} additionalClass={'confirmModal'}>
      <div className="confirmModal--box">
        <button
          className="confirmModal--button"
          onClick={() => setShowModal(false)}
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
