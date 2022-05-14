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
  const { notes, tags, userInfo, setLanguage } = useContext(AppContext);

  const [downloadHref, setDownloadHref] = useState('');
  const downloadRef = useRef(null);

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
    /*
 const file = e.target.files[0];
    let result;
    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        if (
          window.confirm('Arey you sure? It will overwrite all your profil.')
        ) {
          const myObj = JSON.parse(this.result);

          if (myObj.notes) {
            setnotes(myObj.notes);
          }
          if (myObj.notebooks) {
            setnotebooks(myObj.notebooks);
          }
          if (myObj.categoriesTable) {
            setcategoriesTable(myObj.categoriesTable);
          }

          console.log(
            myObj,
            myObj.notes ? 'true' : 'false',
            myObj.notebooks ? 'true' : 'false',
            myObj.categoriesTable ? 'true' : 'false',
          );
        } else {
        }
      });
      reader.readAsText(file);
    }
*/
  };

  useEffect(() => {
    handlePrepeareExport();
  }, []);

  return (
    showModal && (
      <Modal setShowModal={setShowModal}>
        <div className=" pictureModal ">
          <img src={Image} alt={userInfo.nickname} />
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
                ></a>
              </ActionButton>
              <ActionButton title={t('Import')}>
                <UploadIcon />
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
