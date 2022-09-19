import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import React, { useEffect, useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { ReactComponent as Close } from 'assets/Icons/x.svg';
import './Draw.css';
import { useTranslation } from 'react-i18next';

export default function Draw({ noteValues, setNoteValues, paths }) {
  const drawRef = useRef(null);
  const { t } = useTranslation();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = () => {
    const temp = noteValues.draws.filter((draw) => draw !== paths);
    setNoteValues({ ['draws']: temp });
  };

  useEffect(() => {
    drawRef.current.loadPaths(paths);
  }, []);

  return (
    <>
      <div className="image--box" additionalClass={'newAttachment--box'}>
        <div style={{ width: '100%' }}>
          <ReactSketchCanvas
            className="draw--preview"
            ref={drawRef}
            style={{
              // aspectRatio: '2480/3508',
              pointerEvents: 'none',

              // width: '2480px',
              // height: '3508px',
              // zoom: '8%',
            }}
          />
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
