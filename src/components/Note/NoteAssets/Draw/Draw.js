import React, { useEffect, useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import './Draw.css';

export default function Draw({ paths }) {
  const drawRef = useRef(null);
  useEffect(() => {
    drawRef.current.loadPaths(paths);
  }, []);

  return (
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
  );
}
