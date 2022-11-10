import React, { useContext, useEffect, useRef, useState } from 'react';
import { t } from 'i18next';
import Modal, { ActionButton, ModalButton } from 'components/Modal/Modal';
import AppContext from 'store/AppContext';

import { ReactComponent as LanguageIcon } from 'assets/Icons/globe.svg';
import { ReactComponent as FileIcon } from 'assets/Icons/file.svg';
import { ReactComponent as DownloadIcon } from 'assets/Icons/download.svg';
import { ReactComponent as UploadIcon } from 'assets/Icons/upload.svg';
import { ReactComponent as LockIcon } from 'assets/Icons/lock.svg';
import { ReactComponent as LogoutIcon } from 'assets/Icons/log-out.svg';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import { signOut } from 'firebase/auth';
import { auth } from 'utils/Firebase/Config/firebase';

export default function ProfileModal({ showModal, setShowModal }) {
  const { setIsLogged, notes, setNotes, tags, setTags, userInfo, setLanguage } =
    useContext(AppContext);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [downloadHref, setDownloadHref] = useState('');
  const downloadRef = useRef(null);
  // let bb;
  const uploadRef = useRef(null);
  const handleExport = () => {
    downloadRef.current.click();
  };
  const handlePrepeareExport = async () => {
    const backup = { notes, tags };
    const json = JSON.stringify(backup);
    const blob = new Blob([json], { type: 'application/json' });
    // bb = await fetch(notes[0].images[0]).then((res) => res.blob());

    const href = await URL.createObjectURL(blob);
    setDownloadHref(href);
  };
  const handleImport = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        if (window.confirm('Are you sure? It will overide all your data?')) {
          const myObj = JSON.parse(this.result);

          //todo if some notes includes error we should give
          //todo message and spread with others only correct ones

          // setShowConfirmModal(myObj);
          const notes = myObj.notes.map((note) => {
            note.date = new Date(note.date);
            note.lastEditDate = new Date(note.lastEditDate);
            return note;
          });
          setNotes(notes);
          setTags(myObj.tags);
        }
      });
      reader.readAsText(file);
    }
  };
  const handleLogout = () => {
    setIsLogged(false);
    signOut(auth);
  };

  useEffect(() => {
    handlePrepeareExport();
  }, [showModal]);

  return (
    showModal && (
      <>
        <Modal setShowModal={setShowModal} additionalClass="profileModal">
          <div className=" pictureModal ">
            <img
              src={
                userInfo?.photoURL ||
                `https://avatars.dicebear.com/api/bottts/${
                  userInfo?.nickname || 'Nickname'
                }${userInfo.metadata.createdAt}.svg`
              }
              alt="Avatar"
            />
          </div>
          <span className="nicknameModal">
            {userInfo?.nickname || 'Nickname'}
          </span>
          <ModalButton
            isCollapse
            collapseContent={
              <>
                <ActionButton title={'PL'} action={() => setLanguage('pl')}>
                  <LanguageIcon />
                </ActionButton>
                <ActionButton title={'EN'} action={() => setLanguage('en')}>
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
                <ActionButton title={t('Export')} action={handleExport}>
                  <DownloadIcon />
                  <a
                    download="BackupVNOTE.json"
                    href={downloadHref}
                    ref={downloadRef}
                    style={{ display: 'none' }}
                    aria-hidden
                  ></a>
                </ActionButton>
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
          <ModalButton>
            <LockIcon />
            {t('ResetPassword')}
          </ModalButton>

          <ModalButton action={handleLogout}>
            <LogoutIcon />
            {t('Logout')}
          </ModalButton>
        </Modal>
        {showConfirmModal && (
          <ConfirmModal
            setShowModal={setShowConfirmModal}
            confirmText={t('Import')}
            handler={() => {
              // console.log(showConfirmModal);
              // const notes = showConfirmModal.notes.map((note) => {
              //   note.date = new Date(note.date);
              //   note.lastEditDate = new Date(note.lastEditDate);
              //   return note;
              // });
              // setNotes(notes);
              // setTags(showConfirmModal.tags);
              // setShowConfirmModal(false);
            }}
          />
        )}
      </>
    )
  );
}
