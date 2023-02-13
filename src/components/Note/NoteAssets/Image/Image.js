import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import { ReactComponent as Play } from 'assets/Icons/play.svg';

export default function Image({
  image,
  setNotesState,
  noteValues,
  setNoteValues,
}) {
  const { t } = useTranslation();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [localURL, setlocalURL] = useState(false);

  const handleDelete = () => {
    const temp = noteValues.images.filter(
      ({ filePath }) => filePath !== image.filePath,
    );

    deleteObject(ref(storage, image.filePath))
      .then(() => {
        setNoteValues({ images: temp });
      })
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
  };

  useEffect(() => {
    getDownloadURL(ref(storage, image.filePath)).then((result) => {
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
              style={{ width: '100%' }}
            />
          ) : (
            <Loading styles={{ width: '30px', height: '30px' }} />
          )}
        </div>
        <div className="draw--buttonsRow">
          <button
            className="record--icon button__effect__background"
            onClick={() => setNotesState({ showFullViewImage: localURL })}
          >
            <Play />
          </button>

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
