import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import getBlobDuration from 'get-blob-duration';
import { useTranslation } from 'react-i18next';
import { storage } from 'utils/Firebase/Config/firebase';
import { deleteObject, getBlob, getDownloadURL, ref } from 'firebase/storage';
import { toast } from 'react-toastify';
import AppContext from 'store/AppContext';

import ConfirmModal from 'components/ConfirmModal/ConfirmModal';

import './Record.css';
import { ReactComponent as Trash } from 'assets/Icons/trash-2.svg';
import { ReactComponent as Download } from 'assets/Icons/download.svg';
import { ReactComponent as Play } from 'assets/Icons/play-circle.svg';
import { ReactComponent as Pause } from 'assets/Icons/pause-circle.svg';
import Loading from 'components/Loading/Loading';

export default function Record({
  src,
  onlyPreview,
  noteValues,
  setNoteValues,
}) {
  const { language } = useContext(AppContext);
  const { t } = useTranslation();

  const audioRef = useRef(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [recordState, setRecordState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      isPlaying: false,
      date: src.date,
      duration: src.duration,
      currentTime: 0,
    },
  );
  const [localURL, setlocalURL] = useState(false);

  const handleRunAudio = () => {
    setRecordState({ isPlaying: true });
    audioRef.current.play();
  };
  const handlePauseAudio = () => {
    setRecordState({ isPlaying: false });
    audioRef.current.pause();
  };

  const handleDelete = () => {
    const temp = noteValues.records.filter(
      ({ filePath }) => filePath !== src.filePath,
    );
    deleteObject(ref(storage, src.filePath))
      .then(() => {
        setNoteValues({ records: temp });
      })
      .catch(() => {
        toast.error(t('ErrorDeleteAudio'), {
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

  useEffect(() => {
    getDownloadURL(ref(storage, src.filePath)).then((result) => {
      setlocalURL(result);
    });
  }, []);

  return localURL ? (
    <>
      <div className={`record ${onlyPreview && 'record__onlyPreview'}`}>
        {recordState.isPlaying ? (
          <button
            className="record--icon button__effect__background"
            onClick={handlePauseAudio}
          >
            <Pause />
          </button>
        ) : (
          <button
            className="record--icon button__effect__background"
            onClick={handleRunAudio}
          >
            <Play />
          </button>
        )}
        <time className="record--date">
          {recordState.date.toLocaleDateString(language, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
        <input
          type="range"
          className="record--progress"
          value={recordState.currentTime}
          max={recordState.duration}
          step={0.01}
          onChange={({ target: { value } }) => {
            setRecordState({ currentTime: value });
            audioRef.current.currentTime = value;
          }}
          style={{
            backgroundSize: `${
              (recordState.currentTime / recordState.duration) * 100
            }% 100%`,
          }}
        />
        <time className="record--length">
          {new Date(recordState.duration * 1000).toISOString().slice(14, 19)}
        </time>
        <audio
          onCanPlay={(e) => {
            setRecordState({ currentTime: audioRef.current.currentTime });
          }}
          onPause={handlePauseAudio}
          onPlay={handleRunAudio}
          onEnded={() => setRecordState({ isPlaying: false })}
          onTimeUpdate={(e) =>
            setRecordState({ currentTime: e.target.currentTime })
          }
          src={localURL}
          ref={audioRef}
        />

        <a
          download={'Audio.mp3'}
          target="_blank"
          href={localURL}
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
      {showConfirmModal && (
        <ConfirmModal
          setShowModal={setShowConfirmModal}
          confirmText={t('Delete')}
          handler={handleDelete}
        />
      )}
    </>
  ) : (
    <Loading styles={{ width: '30px', height: '30px' }} />
  );
}
