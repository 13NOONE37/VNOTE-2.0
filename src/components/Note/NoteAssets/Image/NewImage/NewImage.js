import Modal from 'components/Modal/Modal';
import React, { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './NewImage.css';

import { ReactComponent as FileIcon } from 'assets/Icons/file.svg';
import { ReactComponent as UploadIcon } from 'assets/Icons/upload.svg';
import { upload } from '@testing-library/user-event/dist/upload';
import AppContext from 'store/AppContext';
import useDetectAttachmentPaste from 'utils/useDetectAttachmentPaste';

export default function NewImage({ noteId, setNotesState }) {
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
            return temp;
          }
          return item;
        }),
      );
      setNotesState({ ['showImageModal']: false });
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

  return (
    <Modal
      additionalClass={'newImage--box'}
      setShowModal={(value) =>
        value === false && setNotesState({ ['showImageModal']: false })
      }
    >
      <div
        className={`newImage--dropzone ${
          dragActive && 'newImage--dropzone__over'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <FileIcon className="newImage--dropzone--icon__file" />
        <h2 className="newImage--dropzone--heading">
          {t('Upload or drag and drop an image')}
        </h2>
        <button
          className="newImage--dropzone--button"
          onClick={() => uploadRef.current.click()}
        >
          <UploadIcon /> Upload
        </button>
        <input
          type="file"
          ref={uploadRef}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </div>
    </Modal>
  );
}
