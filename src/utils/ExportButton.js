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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const downloadRef = useRef(null);

  useEffect(() => {
    const prepareBackup = async () => {
      try {
        const backup = { notes, tags, files: [] };
        const filesNames = [];

        notes.forEach(({ images, records, draws }) => {
          filesNames.push(...images, ...draws);
          filesNames.push(...records.map(({ url }) => url));
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
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    prepareBackup();
  }, []);
  // todo loading i wypadałoby pobierać to tylko w przypadku kliknięcia exportu
  return (
    <ActionButton
      title={t('Export')}
      action={() => {
        downloadRef.current.click();
      }}
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
      <a
        download="Backup_to_string.json"
        href={href}
        ref={downloadRef}
        style={{ display: 'none' }}
        aria-hidden
      ></a>
    </ActionButton>
  );
};
export default ExportButton;

/*
 const handlePrepeareExport = async () => {
    const backup = { notes, tags, images: [] };

    const imagesPromises = [],
      imagesNames = [];
    const recordsPromises = [],
      recordsNames = [];
    const drawsPromises = [],
      drawsNames = [];
    notes.map((note) => {
      imagesPromises.push(
        ...note.images.map((url) => {
          imagesNames.push(url);
          return getBlob(ref(storage, url));
        }),
      );
      recordsPromises.push(
        ...note.records.map(({ url }) => {
          recordsNames.push(url);
          return getBlob(ref(storage, url));
        }),
      );
      drawsPromises.push(
        ...note.draws.map((url) => {
          drawsNames.push(url);
          return getBlob(ref(storage, url));
        }),
      );
    });

    Promise.all([
      Promise.all(imagesPromises).then((values) => {
        values.forEach((value, index) => {
          const reader = new FileReader();
          reader.onload = function () {
            backup.images[recordsNames[index]] = this.result;
          };
          reader.readAsDataURL(value);
        });
      }),
      Promise.all(recordsPromises).then((values) => {
        values.forEach((value, index) => {
          const reader = new FileReader();
          reader.onload = function () {
            backup.records[recordsNames[index]] = this.result;
          };
          reader.readAsDataURL(value);
        });
      }),
      Promise.all(drawsPromises).then((values) => {
        values.forEach((value, index) => {
          const reader = new FileReader();
          reader.onload = function () {
            backup.records[recordsNames[index]] = this.result;
          };
          reader.readAsDataURL(value);
        });
      }),
    ]).then(() => {
      console.log('after all promises');
      console.log(backup);
    });
    console.log(backup.images.length);
    // Promise.all(promiseArray).then((values) => {
    //   //
    // });
    // const reader = new FileReader();
    // reader.readAsDataURL(blob);
    // reader.onload = function () {
    //   const base64data = this.result;
    //   console.log(base64data);
    // };

    const json = JSON.stringify(backup);
    const blob = new Blob([json], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    setDownloadHref(href);
  };
*/
