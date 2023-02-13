import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import React, { useContext, useEffect, useState } from 'react';

import './Draw.css';
import { useTranslation } from 'react-i18next';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';
import { storage } from 'utils/Firebase/Config/firebase';
import { toast } from 'react-toastify';
import { ReactComponent as Trash } from 'assets/Icons/trash-2.svg';
import { ReactComponent as Play } from 'assets/Icons/play.svg';
import AppContext from 'store/AppContext';

export default function Draw({
  noteValues,
  setNoteValues,
  setNotesState,
  draw,
  id,
}) {
  const { t } = useTranslation();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = () => {
    const temp = noteValues.draws.filter((dr) => dr.filePath !== draw.filePath);
    deleteObject(ref(storage, draw.filePath))
      .then(() => {
        setNoteValues({ draws: temp });
      })
      .catch(() => {
        toast.error(t('ErrorDeleteDraw'), {
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

  return (
    <>
      <div className={`record draw`}>
        <div className="draw--drawRow">
          <h3 className="draw--title">
            {draw.name.length > 0 ? draw.name : t('NoTitle')}
          </h3>
        </div>
        <div className="draw--buttonsRow">
          <button
            className="record--icon button__effect__background"
            onClick={() => {
              setNotesState({
                showDrawModal: {
                  id: id,
                  attachmentNumber: noteValues.draws.findIndex(
                    ({ filePath }) => filePath === draw.filePath,
                  ),

                  drawURL: draw.filePath,
                  drawName: draw.name,
                },
              });
            }}
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
