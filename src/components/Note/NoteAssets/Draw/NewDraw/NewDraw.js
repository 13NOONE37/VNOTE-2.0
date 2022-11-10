import Modal, { TopActionButton } from 'components/Modal/Modal';
import React, {
  useContext,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import ScrollContainer from 'react-indiana-drag-scroll';

import { ReactComponent as EditIcon } from 'assets/Icons/edit.svg';
import { ReactComponent as MoveIcon } from 'assets/Icons/move.svg';

import './NewDraw.css';

import AppContext from 'store/AppContext';
import DrawFooter from '../DrawFooter/DrawFooter';
import useShortcuts from 'utils/useShortcuts';
import { auth, storage } from 'utils/Firebase/Config/firebase';
import { ref, uploadBytes, uploadString } from 'firebase/storage';
import uuid4 from 'uuid4';
import { toast } from 'react-toastify';

export default function NewDraw({ noteId, setNotesState }) {
  const { t } = useTranslation();
  const { ua, notes, setNotes } = useContext(AppContext);

  const styles = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
  };

  const drawRef = useRef(null);
  const [drawState, setDrawState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      strokeWidth: 16,
      strokeColor: '#000000',
      currentAction: 'Pen',
      disabled: false,
    },
  );
  const [showFooter, setshowFooter] = useState(true);

  const uploadDraw = async () => {
    await drawRef.current.exportPaths().then((data) => {
      const jsonString = JSON.stringify(data);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const filePath = `files/${auth.currentUser.uid}/draws/${uuid4()}.json`;

      const audioRef = ref(storage, filePath);
      uploadBytes(audioRef, blob)
        .then((snapshot) => {
          setNotes(
            notes.map((item) => {
              if (item.id === noteId) {
                let temp = item;
                // temp.draws.push(data);
                temp.draws.push(filePath);
                temp.lastEditDate = new Date();

                return temp;
              }
              return item;
            }),
          );
          setNotesState({ ['showDrawModal']: false });
          setNotesState({ ['showAttachmentModal']: false });

          setNotesState({ ['showFullView']: true });
          setNotesState({ ['currentId']: noteId });
        })
        .catch((error) => {
          toast.error(t('ErrorUpload'), {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        });
    });
  };

  useLayoutEffect(() => {
    return () => {
      drawRef.current && uploadDraw();
    };
  }, []);
  // useEffect(() => {
  //   console.log('change');
  // }, [drawState.strokeWidth]);

  useShortcuts([
    {
      key: 'KeyZ',
      ctrl: true,
      handler: () => {
        drawRef.current.undo();
        console.log('undo');
      },
    },
    {
      key: 'KeyZ',
      ctrl: true,
      shift: true,
      handler: () => {
        drawRef.current.redo();
        console.log('redo');
      },
    },
    {
      key: 'KeyX',
      ctrl: true,
      handler: () => {
        drawRef.current.eraseMode(true);
        setDrawState({ ['currentAction']: 'Eraser' });

        console.log('eraser');
      },
    },
    {
      key: 'KeyC',
      ctrl: true,
      handler: () => {
        drawRef.current.eraseMode(false);
        setDrawState({ ['currentAction']: 'Pen' });

        console.log('pen');
      },
    },
  ]);
  return (
    <Modal
      additionalClass={'newDraw--box '}
      setShowModal={(value) =>
        value === false && setNotesState({ ['showDrawModal']: false })
      }
      modalHeadContent={
        <div style={{ display: 'flex' }}>
          <TopActionButton
            classes={`moveButton ${
              (ua === 'mobile' || ua === 'tablet') && 'showMoveButton'
            }`}
            action={() => {
              setDrawState({ ['disabled']: !drawState.disabled });
            }}
          >
            <MoveIcon
              className={drawState.disabled && 'fixedActionButton__active'}
            />
          </TopActionButton>
          <TopActionButton
            classes="fixedActionButton"
            action={() => setshowFooter(!showFooter)}
          >
            <EditIcon />
          </TopActionButton>
        </div>
      }
    >
      {/* 
      npm uninstall react-indiana-drag-scroll
      replace both scroll on scroll and right mouse button. draw on canvas instead of svg(more efficient) */}

      <ScrollContainer
        className="newDraw--box--container"
        buttons={[1]}
        nativeMobileScroll={!drawState.disabled}
      >
        <ReactSketchCanvas
          ref={drawRef}
          style={styles}
          width="2480"
          height="3508"
          preserveBackgroundImageAspectRatio="true"
          className="newDraw--box--canvas"
          strokeColor={drawState.strokeColor}
          strokeWidth={drawState.strokeWidth}
          eraserWidth={drawState.strokeWidth}
          allowOnlyPointerType={drawState.disabled ? 'mouse' : 'all'}
        />
      </ScrollContainer>

      <DrawFooter
        drawRef={drawRef}
        drawState={drawState}
        setDrawState={setDrawState}
        showFooter={showFooter}
      />
    </Modal>
  );
}
