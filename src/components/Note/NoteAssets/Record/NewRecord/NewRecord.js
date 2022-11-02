import Modal from 'components/Modal/Modal';
import React, {
  startTransition,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import './NewRecord.css';
import { ReactComponent as PlayIcon } from 'assets/Icons/play.svg';
import { ReactComponent as PauseIcon } from 'assets/Icons/pause.svg';
import { ReactComponent as PlusIcon } from 'assets/Icons/plus.svg';
import AppContext from 'store/AppContext';
import Record from '../Record';
import { auth, storage } from 'utils/Firebase/Config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import uuid4 from 'uuid4';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import getBlobDuration from 'get-blob-duration';

export default function NewRecord({ noteId, setNotesState }) {
  const { notes, setNotes } = useContext(AppContext);
  const { t } = useTranslation();

  const [testAudio, settestAudio] = useState({ date: new Date(), data: [] });
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const startRef = useRef(null);
  const pauseRef = useRef(null);
  const stopRef = useRef(null);

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
                  if (item.id === noteId) {
                    let temp = item;
                    temp.records.push({
                      date: new Date(),
                      url: filePath,
                      duration: recordDuration,
                    });
                    return temp;
                  }
                  return item;
                }),
              );
              setNotesState({ ['showRecordModal']: false });
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
    console.log('getUserMedia is not supported: ' + err);
  };

  useEffect(() => {
    console.log('recorder rerender');
    if (navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported');
      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    } else {
      console.log('getUserMedia not supported on your browser!');
    }
  }, []);

  const [isRunning, setIsRunning] = useState(false);
  let id;
  useEffect(() => {
    if (isRunning) {
      id = setInterval(intervalHandler, 10);
    } else {
      clearInterval(id);
    }

    return () => {
      clearInterval(id);
    };
  }, [isRunning]);

  return (
    <Modal
      additionalClass={'newRecord--box hideHeader'}
      setShowModal={(value) =>
        value === false && setNotesState({ ['showRecordModal']: false })
      }
    >
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
    </Modal>
  );
}
