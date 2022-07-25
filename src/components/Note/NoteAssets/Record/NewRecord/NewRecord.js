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

export default function NewRecord({ noteId, setNotesState }) {
  const { notes, setNotes } = useContext(AppContext);

  const [isRecording, setIsRecording] = useState(false);
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
      setInterval(intervalHandler, 1000);
      if (mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
      } else {
        mediaRecorder.start();
      }
      setIsRecording(true);
    };
    pauseRef.current.onclick = () => {
      clearInterval(intervalHandler);
      mediaRecorder.pause();
      setIsRecording(false);
    };
    stopRef.current.onclick = () => {
      clearInterval(intervalHandler);

      mediaRecorder.stop();
    };

    mediaRecorder.onstop = (e) => {
      const blob = new Blob(chunks, {
        type: 'audio/ogg; codecs=opus',
      });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);

      audioRef.current.src = audioURL;

      setNotes(
        notes.map((item) => {
          if (item.id === noteId) {
            let temp = item;
            temp.records.push({
              date: new Date(),
              data: audioURL,
            });
            return temp;
          }
          return item;
        }),
      );
      setNotesState({ ['showRecordModal']: false });
      setNotesState({ ['showFullView']: true });
      setNotesState({ ['currentId']: noteId });
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

  return (
    <Modal
      additionalClass={'newRecord--box'}
      setShowModal={(value) =>
        value === false && setNotesState({ ['showRecordModal']: false })
      }
    >
      <button
        className={`mic--button ${!isRecording && 'mic--button__disabled'}`}
        ref={pauseRef}
      >
        <PauseIcon />
      </button>
      <button
        className={`mic--button ${isRecording && 'mic--button__disabled'}`}
        ref={startRef}
      >
        <PlayIcon className="mic--button--icon__play" />
      </button>
      <time>{currentTime}</time>
      <audio ref={audioRef} controls></audio>
      <button ref={stopRef} className={`mic--button `}>
        <PlusIcon />
      </button>
    </Modal>
  );
}
