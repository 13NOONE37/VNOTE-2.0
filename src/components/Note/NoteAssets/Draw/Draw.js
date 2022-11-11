import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import React, { useEffect, useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { ReactComponent as Close } from 'assets/Icons/x.svg';
import './Draw.css';
import { useTranslation } from 'react-i18next';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';
import { storage } from 'utils/Firebase/Config/firebase';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from 'components/Loading/Loading';

export default function Draw({ noteValues, setNoteValues, url }) {
  const drawRef = useRef(null);
  const { t } = useTranslation();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDraw, setShowDraw] = useState(false);
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
        console.log(paths.data);
        drawRef.current.loadPaths(paths.data);
        setShowDraw(true);
      });
    });
  }, []);

  return (
    <>
      <div className="image--box" additionalClass={'newAttachment--box'}>
        <div style={{ width: '100%' }}>
          <ReactSketchCanvas
            className="draw--preview"
            ref={drawRef}
            style={{
              display: `${showDraw ? 'initial' : 'none'}`,
              // aspectRatio: '2480/3508',
              pointerEvents: 'none',

              // width: '2480px',
              // height: '3508px',
              // zoom: '8%',
            }}
          />
          {!showDraw && (
            <Loading sizeStyle={{ width: '30px', height: '30px' }} />
          )}
        </div>
        <button
          onClick={() => setShowConfirmModal(true)}
          style={{ bottom: '4px' }}
        >
          <Close />
        </button>
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
