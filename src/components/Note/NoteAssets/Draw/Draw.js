import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import React, { useEffect, useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

import './Draw.css';
import { useTranslation } from 'react-i18next';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';
import { storage } from 'utils/Firebase/Config/firebase';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from 'components/Loading/Loading';
import NewDraw from './NewDraw/NewDraw';

import { ReactComponent as Trash } from 'assets/Icons/trash-2.svg';
import { ReactComponent as Download } from 'assets/Icons/download.svg';
import { ReactComponent as Play } from 'assets/Icons/play.svg';

export default function Draw({
  noteValues,
  setNoteValues,
  setNotesState,
  url,
}) {
  const drawRef = useRef(null);
  const { t } = useTranslation();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDraw, setShowDraw] = useState(false);

  const [drawPaths, setDrawPaths] = useState(false);

  const handleDelete = () => {
    const temp = noteValues.draws.filter((draw) => draw !== url);
    deleteObject(ref(storage, url))
      .then(() => {})
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
    setNoteValues({ ['draws']: temp });
  };

  useEffect(() => {
    getDownloadURL(ref(storage, url)).then((ur) => {
      axios.get(ur).then((paths) => {
        drawRef.current.loadPaths(paths.data);
        setDrawPaths(paths.data);
        setShowDraw(true);
      });
    });
  }, []);

  return (
    <>
      <div className={`record draw`}>
        <div className="draw--drawRow">
          <ReactSketchCanvas
            className="draw--preview"
            ref={drawRef}
            style={{
              display: `${showDraw ? 'initial' : 'none'}`,
              pointerEvents: 'none',
            }}
          />
          {!showDraw && <Loading styles={{ width: '30px', height: '30px' }} />}{' '}
        </div>
        <div className="draw--buttonsRow">
          <button
            className="record--icon button__effect__background"
            onClick={() => console.log(noteValues.id, drawPaths)}
          >
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
