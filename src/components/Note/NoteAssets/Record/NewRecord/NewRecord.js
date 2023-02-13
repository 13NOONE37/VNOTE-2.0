import Modal from 'components/Modal/Modal';
import React, { useContext, useEffect, useRef, useState } from 'react';
import './NewRecord.css';
import { ReactComponent as PlayIcon } from 'assets/Icons/play.svg';
import { ReactComponent as PauseIcon } from 'assets/Icons/pause.svg';
import { ReactComponent as PlusIcon } from 'assets/Icons/plus.svg';
import AppContext from 'store/AppContext';
import { auth, storage } from 'utils/Firebase/Config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import uuid4 from 'uuid4';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import getBlobDuration from 'get-blob-duration';
import Loading from 'components/Loading/Loading';

export default function NewRecord({
  noteId: { id, attachmentNumber },
  setNotesState,
}) {
  const { notes, setNotes } = useContext(AppContext);
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(0);
  const startRef = useRef(null);
  const pauseRef = useRef(null);
  const stopRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const constraints = { audio: true };
  let chunks = [];
  let mediaRecorder = null;
  let audioCtx = null;

  const intervalHandler = () => setCurrentTime((v) => v + 1);
  const onSuccess = (stream) => {
    mediaRecorder = new MediaRecorder(stream);
    startRef.current.onclick = () => {
      // setInterval(intervalHandler, 1000);
      if (mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
      } else {
        mediaRecorder.start();
      }
      setIsRunning(true);
    };
    pauseRef.current.onclick = () => {
      clearInterval(intervalHandler);
      mediaRecorder.pause();
      setIsRunning(false);
    };
    stopRef.current.onclick = () => {
      clearInterval(intervalHandler);

      mediaRecorder.stop();
      setIsRunning(false);
    };

    mediaRecorder.onstop = (e) => {
      setIsLoading(true);
      const blob = new Blob(chunks, {
        type: 'audio/ogg; codecs=opus',
      });
      chunks = [];
      getBlobDuration(blob)
        .then((recordDuration) => {
          const filePath = `files/${auth.currentUser.uid}/audio/${uuid4()}.mp3`;
          const fileType = 'audio/ogg';

          const audioRef = ref(storage, filePath);
          uploadBytes(audioRef, blob, {
            contentType: fileType,
          })
            .then((snapshot) => {
              setNotes(
                notes.map((item) => {
                  if (item.id === id) {
                    let temp = item;
                    temp.records.push({
                      id: uuid4(),
                      date: new Date(),
                      filePath: filePath,
                      duration: recordDuration,
                    });
                    temp.lastEditDate = new Date();

                    return temp;
                  }
                  return item;
                }),
              );
              setIsLoading(false);
              setNotesState({ showRecordModal: false });
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
            });
        })
        .catch((err) => {
          toast.error(t('SomethingWentWrong'), {
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
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
  };
  const onError = (err) => {
    alert('Recording is not supported in your browser' + err);
  };

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    } else {
      alert('Recording is not supported in your browser');
    }
  }, []);

  const [isRunning, setIsRunning] = useState(false);
  let intervalId;
  useEffect(() => {
    if (isRunning) {
      intervalId = setInterval(intervalHandler, 10);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <Modal
      additionalClass={'newRecord--box hideHeader'}
      setShowModal={(value) =>
        value === false && setNotesState({ showRecordModal: false })
      }
    >
      {isLoading ? (
        <div style={{ gridArea: '1/1/1/4' }}>
          <Loading styles={{ width: '60px', height: '60px' }} />
        </div>
      ) : (
        <>
          <button
            className={`mic--button ${!isRunning && 'mic--button__disabled'}`}
            ref={pauseRef}
          >
            <PauseIcon />
          </button>
          <button
            className={`mic--button ${isRunning && 'mic--button__disabled'}`}
            ref={startRef}
          >
            <PlayIcon className="mic--button--icon__play" />
          </button>
          <time className="newRecord--box--length">
            {new Date(currentTime * 10).toISOString().slice(14, 22)}
          </time>
          {/* <audio ref={audioRef} controls ></audio> */}
          <button ref={stopRef} className={`mic--button `}>
            <PlusIcon />
          </button>
        </>
      )}
    </Modal>
  );
}
