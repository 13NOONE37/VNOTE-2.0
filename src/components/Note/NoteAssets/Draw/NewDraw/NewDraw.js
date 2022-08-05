import Modal from 'components/Modal/Modal';
import React, { useContext, useReducer, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import './NewDraw.css';

import AppContext from 'store/AppContext';
import DrawFooter from '../DrawFooter/DrawFooter';

export default function NewDraw({ noteId, setNotesState }) {
  const { t } = useTranslation();

  const styles = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
  };

  const drawRef = useRef(null);
  const [drawState, setDrawState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      strokeWidth: 4,
      eraserWidth: 4,
      strokeColor: '#ff0000',
    },
  );
  return (
    <Modal
      additionalClass={'newDraw--box hideHeader'}
      setShowModal={(value) =>
        value === false && setNotesState({ ['showDrawModal']: false })
      }
    >
      <ReactSketchCanvas
        ref={drawRef}
        style={styles}
        width="2480"
        height="3508"
        className="newDraw--box--canvas"
        {...drawState}
      />
      <DrawFooter
        drawRef={drawRef}
        drawState={drawState}
        setDrawState={setDrawState}
      />
    </Modal>
  );
}
