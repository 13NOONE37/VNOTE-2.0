import Modal from 'components/Modal/Modal';
import React, { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import './NewDraw.css';

import { ReactComponent as FileIcon } from 'assets/Icons/file.svg';
import { ReactComponent as UploadIcon } from 'assets/Icons/upload.svg';
import { upload } from '@testing-library/user-event/dist/upload';
import AppContext from 'store/AppContext';
import useDetectAttachmentPaste from 'utils/useDetectAttachmentPaste';

export default function NewDraw({ noteId, setNotesState }) {
  const { t } = useTranslation();
  const { notes, setNotes } = useContext(AppContext);
  const [dragActive, setDragActive] = useState(false);

  const uploadRef = useRef(null);

  const handleFile = (file) => {
    const reader = new FileReader();

    reader.addEventListener('load', function () {
      const blob = new Blob([this.result]);
      const url = URL.createObjectURL(blob, { type: 'image/png' });

      setNotes(
        notes.map((item) => {
          if (item.id === noteId) {
            let temp = item;
            temp.images.push(url);
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
    });

    reader.readAsArrayBuffer(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  const handleChange = (e) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  useDetectAttachmentPaste('image', handleFile);
  //https://www.npmjs.com/package/react-sketch-canvas
  return (
    <Modal
      additionalClass={'newImage--box hideHeader'}
      setShowModal={(value) =>
        value === false && setNotesState({ ['showDrawModal']: false })
      }
    >
      <ReactSketchCanvas
        // style={styles}
        width="600"
        height="400"
        strokeWidth={4}
        strokeColor="red"
      />
    </Modal>
  );
}
