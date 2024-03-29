import Modal, { TopActionButton } from 'components/Modal/Modal';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import uuid4 from 'uuid4';
import { toast } from 'react-toastify';
import Loading from 'components/Loading/Loading';
import axios from 'axios';

export default function NewDraw({
  noteId: { id, attachmentNumber, drawURL, drawName = '' },
  setNotesState,
}) {
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
      name: drawName,
    },
  );
  const [showFooter, setshowFooter] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const uploadDraw = () => {
    setIsLoading(true);

    drawRef.current.exportPaths().then((data) => {
      if (drawState.name.length === 0 && data.length === 0 && !drawURL) {
        setIsLoading(false);
        setNotesState({ showDrawModal: false });
        setNotesState({ showAttachmentModal: false });

        setNotesState({ showFullView: true });
        setNotesState({ currentId: id });
        return;
      }

      if (!drawState.name?.trim()?.length) {
        toast.info(t('ShouldDefineName'), {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setIsLoading(false);
        return false;
      }

      const jsonString = JSON.stringify(data);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const filePath = `files/${auth.currentUser.uid}/draws/${uuid4()}.json`;

      const fileRef = ref(storage, filePath);

      uploadBytes(fileRef, blob)
        .then((snapshot) => {
          setNotes(
            notes.map((item) => {
              if (item.id === id) {
                let temp = item;
                if (drawURL) {
                  temp.draws[Math.max(attachmentNumber, 0)] = {
                    id: uuid4(),
                    filePath: filePath,
                    // filePath: filePath,
                    name: drawState.name,
                  };
                } else {
                  temp.draws.push({
                    id: uuid4(),
                    filePath: filePath,
                    name: drawState.name,
                  });
                }
                temp.lastEditDate = new Date();

                return temp;
              }
              return item;
            }),
          );
          if (drawURL) {
            deleteObject(ref(storage, drawURL));
          }
          setIsLoading(false);
          setNotesState({ showDrawModal: false });
          setNotesState({ showAttachmentModal: false });

          setNotesState({ showFullView: true });
          setNotesState({ currentId: id });
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
          setIsLoading(false);
          setNotesState({ showDrawModal: false });
          setNotesState({ showAttachmentModal: false });
        });
    });
  };

  useEffect(() => {
    if (drawURL) {
      setIsLoading(true);
      getDownloadURL(ref(storage, drawURL)).then((ur) => {
        axios.get(ur).then((paths) => {
          drawRef.current.loadPaths(paths.data);
          setIsLoading(false);
        });
      });
    }
    // drawPaths && drawRef.current.loadPaths(drawPaths);
    return () => {
      drawRef.current && uploadDraw();
    };
  }, []);

  useShortcuts([
    {
      key: 'KeyZ',
      ctrl: true,
      handler: () => {
        drawRef.current.undo();
      },
    },
    {
      key: 'KeyZ',
      ctrl: true,
      shift: true,
      handler: () => {
        drawRef.current.redo();
      },
    },
    {
      key: 'KeyX',
      ctrl: true,
      handler: () => {
        drawRef.current.eraseMode(true);
        setDrawState({ currentAction: 'Eraser' });
      },
    },
    {
      key: 'KeyC',
      ctrl: true,
      handler: () => {
        drawRef.current.eraseMode(false);
        setDrawState({ currentAction: 'Pen' });
      },
    },
  ]);
  return (
    <Modal
      additionalClass={'newDraw--box '}
      setShowModal={uploadDraw}
      modalHeadContent={
        <div style={{ display: 'flex' }}>
          <TopActionButton
            classes={`moveButton ${
              (ua === 'mobile' || ua === 'tablet') && 'showMoveButton'
            }`}
            action={() => {
              setDrawState({ disabled: !drawState.disabled });
            }}
          >
            <MoveIcon
              className={drawState.disabled ? 'fixedActionButton__active' : ''}
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
      <>
        <ScrollContainer
          className="newDraw--box--container"
          buttons={[1]}
          nativeMobileScroll={!drawState.disabled}
        >
          {isLoading && <Loading styles={{ width: '60px', height: '60px' }} />}
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
      </>
      <DrawFooter
        drawRef={drawRef}
        drawState={drawState}
        setDrawState={setDrawState}
        showFooter={showFooter}
      />
    </Modal>
  );
}
