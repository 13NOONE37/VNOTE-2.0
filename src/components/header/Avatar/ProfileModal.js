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
import Image from './Avatar.jpg';

export default function ProfileModal({ showModal, setShowModal }) {
  const { notes, setNotes, tags, setTags, userInfo, setLanguage } =
    useContext(AppContext);

  const [downloadHref, setDownloadHref] = useState('');
  const downloadRef = useRef(null);
  const uploadRef = useRef(null);

  const handleExport = () => {
    downloadRef.current.click();
  };
  const handlePrepeareExport = async () => {
    const backup = { notes, tags };
    const json = JSON.stringify(backup);
    const blob = new Blob([json], { type: 'application/json' });
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
          //todo we should validate it in some way
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

  useEffect(() => {
    handlePrepeareExport();
  }, [showModal]);

  return (
    showModal && (
      <Modal setShowModal={setShowModal} additionalClass="profileModal">
        <div className=" pictureModal ">
          <img src={Image} alt="Avatar" />
        </div>
        <span className="nicknameModal">{userInfo.nickname}</span>
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
        <ModalButton
        // isCollapse
        >
          <LockIcon />
          {t('ChangePasswordEmail')}
        </ModalButton>
        <ModalButton>
          <LogoutIcon />
          {t('Logout')}
        </ModalButton>
      </Modal>
    )
  );
}
