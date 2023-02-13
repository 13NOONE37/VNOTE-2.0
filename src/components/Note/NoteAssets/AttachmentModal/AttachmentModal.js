import Modal, { TopActionButton } from 'components/Modal/Modal';
import React, { useContext } from 'react';
import './AttachmentModal.css';

import { ReactComponent as Pen } from 'assets/Icons/edit-2.svg';
import { ReactComponent as Mic } from 'assets/Icons/mic.svg';
import { ReactComponent as Picture } from 'assets/Icons/image.svg';
import NewImage from '../Image/NewImage/NewImage';
import NewRecord from '../Record/NewRecord/NewRecord';
import NewDraw from '../Draw/NewDraw/NewDraw';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';

export default function AttachmentModal({ notesState, setNotesState }) {
  const { t } = useTranslation();
  const { notes } = useContext(AppContext);
  return (
    <Modal
      additionalClass={'newAttachment--box'}
      setShowModal={(value) =>
        value === false && setNotesState({ showAttachmentModal: false })
      }
    >
      <TopActionButton
        action={() => {
          setNotesState({
            showDrawModal: {
              id: notesState.currentId,
              attachmentNumber:
                notes.find((note) => note.id == notesState.currentId).draws
                  .length - 1,
              drawURL: false,
              drawName: '',
            },
          });
        }}
        title={t('AddDraw')}
      >
        <Pen />
      </TopActionButton>
      <TopActionButton
        action={() => {
          setNotesState({
            showRecordModal: {
              id: notesState.currentId,
              attachmentNumber:
                notes.find((note) => note.id == notesState.currentId).records
                  .length - 1,
            },
          });
        }}
        title={t('AddRecord')}
      >
        <Mic />
      </TopActionButton>
      <TopActionButton
        action={() => {
          setNotesState({
            showImageModal: {
              id: notesState.currentId,
              attachmentNumber:
                notes.find((note) => note.id == notesState.currentId).images
                  .length - 1,
            },
          });
        }}
        title={t('AddPicture')}
      >
        <Picture />
      </TopActionButton>
      {notesState.showAttachmentModal && notesState.showRecordModal && (
        <NewRecord
          noteId={notesState.showRecordModal}
          setNotesState={setNotesState}
        />
      )}
      {notesState.showAttachmentModal && notesState.showImageModal && (
        <NewImage
          noteId={notesState.showImageModal}
          setNotesState={setNotesState}
        />
      )}

      {notesState.showAttachmentModal && notesState.showDrawModal && (
        <NewDraw
          noteId={notesState.showDrawModal}
          setNotesState={setNotesState}
        />
      )}
    </Modal>
  );
}
