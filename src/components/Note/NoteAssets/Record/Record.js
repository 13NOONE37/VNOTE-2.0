import React, { useContext, useEffect, useReducer, useRef } from 'react';
import './Record.css';

import { ReactComponent as Trash } from 'assets/Icons/trash-2.svg';
import { ReactComponent as Download } from 'assets/Icons/download.svg';
import { ReactComponent as Play } from 'assets/Icons/play-circle.svg';
import { ReactComponent as Pause } from 'assets/Icons/pause-circle.svg';

import AppContext from 'store/AppContext';

export default function Record({ audio, onlyPreview }) {
  const { language } = useContext(AppContext);

  const audioRef = useRef(null);
  const [recordState, setRecordState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      isPlaying: false,
      date: audio.date,
      length: 0,
      currentTime: 0,
    },
  );

  const handleRunAudio = () => {
    setRecordState({ ['isPlaying']: true });
    audioRef.current.play();
  };
  const handlePauseAudio = () => {
    setRecordState({ ['isPlaying']: false });
    audioRef.current.pause();
  };

  return (
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
        max={recordState.length}
        step={0.01}
        onChange={({ target: { value } }) => {
          setRecordState({ ['currentTime']: value });
          audioRef.current.currentTime = value;
        }}
        style={{
          backgroundSize: `${
            (recordState.currentTime / recordState.length) * 100
          }% 100%`,
        }}
      />
      <time className="record--length">
        {new Date(
          // recordState.length
          10 * 1000,
        )
          .toISOString()
          .slice(14, 19)}
      </time>
      <audio
        onCanPlay={(e) => {
          setRecordState({ ['length']: audioRef.current.duration || 0 });
          setRecordState({ ['currentTime']: audioRef.current.currentTime });
        }}
        onPause={handlePauseAudio}
        onPlay={handleRunAudio}
        onEnded={() => setRecordState({ ['isPlaying']: false })}
        onTimeUpdate={(e) =>
          setRecordState({ ['currentTime']: e.target.currentTime })
        }
        src={audio.data}
        ref={audioRef}
      />
      <button className="record--icon record--icon__hide  button__effect__background">
        <Download />
      </button>
      <button className="record--icon record--icon__hide button__effect__background">
        <Trash />
      </button>
    </div>
  );
}
