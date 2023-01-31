import React, { useContext, useRef, useState } from 'react';
import { t } from 'i18next';
import Modal, { ActionButton, ModalButton } from 'components/Modal/Modal';
import AppContext from 'store/AppContext';

import { ReactComponent as LanguageIcon } from 'assets/Icons/globe.svg';
import { ReactComponent as FileIcon } from 'assets/Icons/file.svg';
import { ReactComponent as UploadIcon } from 'assets/Icons/upload.svg';
import { ReactComponent as LockIcon } from 'assets/Icons/lock.svg';
import { ReactComponent as LogoutIcon } from 'assets/Icons/log-out.svg';

import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import { signOut } from 'firebase/auth';
import { auth, storage } from 'utils/Firebase/Config/firebase';
import handlePasswordReset from 'utils/Firebase/Actions/auth_send_password_reset';
import { toast } from 'react-toastify';
import ExportButton from 'utils/ExportButton';
import uuid4 from 'uuid4';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function ProfileModal({ showModal, setShowModal }) {
  const {
    setIsLogged,
    notes,
    setNotes,
    tags,
    setTags,
    userInfo,
    toggleLanguage,
  } = useContext(AppContext);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const uploadRef = useRef(null);

  const handleImportBackup = () => {};

  const handleImport = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        if (window.confirm('Are you sure? It will overide all your data?')) {
          const myObj = JSON.parse(reader.result);

          //set Notes
          const totalNotes = [
            ...myObj.notes.map((note) => {
              note.id = undefined;
              note.date = new Date(note.date);
              note.lastEditDate = new Date(note.lastEditDate);
              return note;
            }),
            ...notes.map((note) => {
              note.id = undefined;
              return note;
            }),
          ];
          let uniqueNotes = [
            ...new Set(totalNotes.map((note) => JSON.stringify(note))),
          ].map((json) => JSON.parse(json));
          uniqueNotes = uniqueNotes.map((note) => {
            note.id = uuid4();
            note.date = new Date(note.date);
            note.lastEditDate = new Date(note.lastEditDate);
            return note;
          });
          //Filter for error
          uniqueNotes = uniqueNotes.filter((note) => {
            const hasValidTitle = typeof note.title === 'string';
            const hasValidContent = typeof note.content === 'string';
            const hasValidColor = typeof note.color === 'number';
            const hasValidDate = note.date instanceof Date;
            const hasValidLastEditDate = note.lastEditDate instanceof Date;
            const hasValidDeletedFlag = typeof note.isDeleted === 'boolean';
            const hasValidListedFlag = typeof note.isListed === 'boolean';
            const hasValidCheckList = Array.isArray(note.checkList);
            const hasValidImages = Array.isArray(note.images);
            const hasValidDraws = Array.isArray(note.draws);
            const hasValidTags = typeof note.tags === 'object';

            return (
              hasValidTitle &&
              hasValidContent &&
              hasValidColor &&
              hasValidDate &&
              hasValidLastEditDate &&
              hasValidDeletedFlag &&
              hasValidListedFlag &&
              hasValidCheckList &&
              hasValidImages &&
              hasValidDraws &&
              hasValidTags
            );
          });
          setNotes(uniqueNotes);

          //Upload files which not exist to storage
          for (const { url, file } of myObj.files) {
            getDownloadURL(ref(storage, url)).catch((error) => {
              const fileType = url.split('.')[1];
              const filePath = url;
              const filesRef = ref(storage, filePath);

              fetch(file)
                .then((res) => res.blob())
                .then((res) => {
                  uploadBytes(filesRef, res, {
                    contentType: fileType,
                  }).catch(() => {
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
                });
            });
          }
          //Set tags
          setTags(
            [...[myObj.tags], ...tags].filter(
              (tag, index) => myObj.tags.indexOf(tag) === index,
            ),
          );
          setShowModal(false);
        }
      });
      reader.readAsText(file);
    }
  };
  const handleLogout = () => {
    setIsLogged(false);
    signOut(auth);
  };

  return (
    showModal && (
      <>
        <Modal setShowModal={setShowModal} additionalClass="profileModal">
          <div className="pictureModal">
            <img
              src={
                userInfo?.photoURL ||
                `https://avatars.dicebear.com/api/bottts/${
                  userInfo?.displayName || 'Nickname'
                }${userInfo.metadata.createdAt}.svg`
              }
              alt="Avatar"
            />
          </div>
          <span className="nicknameModal">
            {userInfo.email || userInfo.displayName}
          </span>

          <ModalButton
            isCollapse
            collapseContent={
              <>
                <ActionButton title={'PL'} action={() => toggleLanguage('pl')}>
                  <LanguageIcon />
                </ActionButton>
                <ActionButton title={'EN'} action={() => toggleLanguage('en')}>
                  <LanguageIcon />
                </ActionButton>
              </>
            }
          >
            <LanguageIcon />
            {t('Language')}
          </ModalButton>
          <ModalButton
            isCollapse
            collapseContent={
              <>
                <ExportButton />
                <ActionButton
                  title={t('Import')}
                  action={() => uploadRef.current.click()}
                >
                  <UploadIcon />
                  <input
                    type="file"
                    ref={uploadRef}
                    onChange={handleImport}
                    style={{ display: 'none' }}
                  />
                </ActionButton>
              </>
            }
          >
            <FileIcon />
            {t('ImportExport')}
          </ModalButton>

          {userInfo.email && (
            <ModalButton
              action={() =>
                handlePasswordReset(
                  userInfo.email,
                  (message) => {
                    toast.error(message, {
                      position: 'bottom-right',
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  },
                  (message) => {
                    toast.info(message, {
                      position: 'bottom-right',
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  },
                )
              }
            >
              <LockIcon />
              {t('ResetPassword')}
            </ModalButton>
          )}

          <ModalButton action={handleLogout}>
            <LogoutIcon />
            {t('Logout')}
          </ModalButton>
        </Modal>
        {showConfirmModal && (
          <ConfirmModal
            setShowModal={setShowConfirmModal}
            confirmText={t('Import')}
            handler={handleImportBackup}
          />
        )}
      </>
    )
  );
}
