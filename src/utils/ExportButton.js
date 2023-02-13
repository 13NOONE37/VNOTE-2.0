import React, { useContext, useEffect, useRef, useState } from 'react';
import { getBlob, ref } from 'firebase/storage';
import { storage } from './Firebase/Config/firebase';
import AppContext from 'store/AppContext';

import { ReactComponent as DownloadIcon } from 'assets/Icons/download.svg';
import { ActionButton } from 'components/Modal/Modal';
import { useTranslation } from 'react-i18next';
import Loading from 'components/Loading/Loading';

const readBlobAsDataURL = (blob) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(blob);
  });
};
const ExportButton = () => {
  const { t } = useTranslation();
  const { notes, tags } = useContext(AppContext);

  const [href, setHref] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const downloadRef = useRef(null);

  // useEffect(() => {
  const clickDownload = () => {
    setTimeout(() => {
      downloadRef.current.click();
    }, 500);
  };
  const prepareBackup = async () => {
    if (href !== null) return;
    setLoading(true);
    try {
      const backup = { notes, tags, files: [] };
      const filesNames = [];

      notes.forEach(({ images, records, draws }) => {
        filesNames.push(
          ...[...images, ...records, ...draws].map(({ filePath }) => filePath),
        );
      });
      for (const url of filesNames) {
        const blob = await getBlob(ref(storage, url));
        const file = await readBlobAsDataURL(blob);
        backup.files.push({ url, file });
      }

      const json = JSON.stringify(backup);
      const blob = new Blob([json], { type: 'application/json' });
      const href = URL.createObjectURL(blob);
      setHref(href);
      setLoading(false);
      clickDownload();
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <>
      <ActionButton
        title={t('Export')}
        action={href === null ? prepareBackup : clickDownload}
        disabled={loading}
        style={{ cursor: `${loading ? 'progress' : 'pointer'}` }}
      >
        {loading ? (
          <Loading
            styles={{ width: '35px', height: '35px', alternativeLook: true }}
          />
        ) : (
          <DownloadIcon />
        )}
      </ActionButton>
      <a
        download="Backup_to_string.json"
        href={href}
        ref={downloadRef}
        style={{ display: 'none' }}
        aria-hidden
      ></a>
    </>
  );
};
export default ExportButton;
