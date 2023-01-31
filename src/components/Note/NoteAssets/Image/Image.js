import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Close } from 'assets/Icons/x.svg';
import './Image.css';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';
import { storage } from 'utils/Firebase/Config/firebase';
import { toast } from 'react-toastify';
import Loading from 'components/Loading/Loading';
import axios from 'axios';

import { ReactComponent as Trash } from 'assets/Icons/trash-2.svg';
import { ReactComponent as Download } from 'assets/Icons/download.svg';
import { ReactComponent as Play } from 'assets/Icons/play.svg';

export default function Image({ noteValues, setNoteValues, src }) {
  const { t } = useTranslation();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [localURL, setlocalURL] = useState(false);

  const handleDelete = () => {
    const temp = noteValues.images.filter((image) => image !== src);
    deleteObject(ref(storage, src))
      .then(() => {})
      .catch(() => {
        toast.error(t('ErrorDeleteImage'), {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });
    setNoteValues({ ['images']: temp });
  };

  useEffect(() => {
    getDownloadURL(ref(storage, src)).then((result) => {
      setlocalURL(result);
    });
  }, []);

  return (
    <>
      <div className={`record draw`}>
        <div className="draw--drawRow">
          {localURL ? (
            <img
              src={localURL}
              alt={t('UserImage')}
              onMouseDown={(e) => e.preventDefault()}
            />
          ) : (
            <Loading styles={{ width: '30px', height: '30px' }} />
          )}
        </div>
        <div className="draw--buttonsRow">
          <button className="record--icon button__effect__background">
            <Play />
          </button>

          <a
            download={'Draw.png'}
            target="_blank"
            // href={localURL}
            className="record--icon record--icon__hide  button__effect__background"
          >
            <Download />
          </a>
          <button
            onClick={() => setShowConfirmModal(true)}
            className="record--icon record--icon__hide button__effect__background"
          >
            <Trash />
          </button>
        </div>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          setShowModal={setShowConfirmModal}
          confirmText={t('Delete')}
          handler={handleDelete}
        />
      )}
    </>
  );
}
