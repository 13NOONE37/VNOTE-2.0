import React, { useContext, useRef, useState } from 'react';
import { t } from 'i18next';
import Modal, { ActionButton, ModalButton } from 'components/Modal/Modal';
import AppContext from 'store/AppContext';

import { ReactComponent as LanguageIcon } from 'assets/Icons/globe.svg';
import { ReactComponent as FileIcon } from 'assets/Icons/file.svg';
import { ReactComponent as UploadIcon } from 'assets/Icons/upload.svg';
import { ReactComponent as LockIcon } from 'assets/Icons/lock.svg';
import { ReactComponent as LogoutIcon } from 'assets/Icons/log-out.svg';
import { signOut } from 'firebase/auth';
import { auth, storage } from 'utils/Firebase/Config/firebase';
import handlePasswordReset from 'utils/Firebase/Actions/auth_send_password_reset';
import { toast } from 'react-toastify';
import ExportButton from 'utils/ExportButton';
import uuid4 from 'uuid4';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Loading from 'components/Loading/Loading';

export default function ProfileModal({ showModal, setShowModal }) {
  const {
    setIsLogged,
    notes,
    setNotes,
    tags,
    setTags,
    userInfo,
    toggleLanguage,
    setCanBeSaved,
  } = useContext(AppContext);
  const [isUploading, setIsUploading] = useState(false);
  const uploadRef = useRef(null);

  const handleImport = (e) => {
    setIsUploading(true);
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        if (window.confirm(t('ImportConfirm'))) {
          const myObj = JSON.parse(reader.result);

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
            note.records = note.records.map((rec) => {
              rec.date = new Date(rec.date);
              return rec;
            });
            return note;
          });
          uniqueNotes = uniqueNotes.filter((note) => {
            const requiredProperties = [
              { key: 'title', type: 'string' },
              { key: 'content', type: 'string' },
              { key: 'color', type: 'number' },
              { key: 'date', type: Date },
              { key: 'lastEditDate', type: Date },
              { key: 'isDeleted', type: 'boolean' },
              { key: 'isListed', type: 'boolean' },
              { key: 'checkList', type: Array },
              { key: 'images', type: Array },
              { key: 'draws', type: Array },
              { key: 'tags', type: 'object' },
            ];

            return requiredProperties.every(({ key, type }) => {
              return typeof note[key] === type || note[key] instanceof type;
            });
          });
          //Set notes
          setNotes(uniqueNotes);

          //Set tags
          const tempTags = [...myObj.tags, ...tags];
          console.log(tempTags);
          setTags(
            tempTags.filter(
              (tag, index) =>
                tempTags.findIndex((item) => item.name === tag.name) ===
                  index && tag.name.toLowerCase() !== 'all',
            ),
          );
          const handleFile = (file, url) => {
            return new Promise(async (resolve, reject) => {
              url = url.split('/');
              url[1] = auth.currentUser.uid;
              url = url.join('/');

              getDownloadURL(ref(storage, url))
                .then(() => {
                  resolve();
                })
                .catch(() => {
                  const fileType = url.split('.')[1];
                  const filePath = url;
                  const filesRef = ref(storage, filePath);
                  fetch(file)
                    .then((res) => res.blob())
                    .then((res) => {
                      uploadBytes(filesRef, res, {
                        contentType: fileType,
                      })
                        .then(() => {
                          resolve();
                        })
                        .catch((err) => {
                          reject();
                        });
                    });
                });
            });
          };
          Promise.all(myObj.files.map(({ file, url }) => handleFile(file, url)))
            .then(() => {
              // //Set notes
              // setNotes(uniqueNotes);

              // //Set tags
              // const tempTags = [...myObj.tags, ...tags];
              // setTags(
              //   tempTags.filter(
              //     (tag, index) =>
              //       tempTags.indexOf(tag) === index &&
              //       tag.toLowerCase() !== 'all',
              //   ),
              // );
              setCanBeSaved(true);
              setIsUploading(false);
              setShowModal(false);
            })
            .catch(() => {
              setIsUploading(false);
              setShowModal(false);
              toast.error(t('ErrorImport'), {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
            });
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
        <Modal
          setShowModal={
            isUploading
              ? () => {
                  toast.info(t('WaitBackup'));
                }
              : setShowModal
          }
          additionalClass="profileModal"
        >
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
                <ActionButton
                  title={t('Polish')}
                  action={() => {
                    toggleLanguage('pl');
                    setCanBeSaved(true);
                  }}
                >
                  <LanguageIcon />
                </ActionButton>
                <ActionButton
                  title={t('English')}
                  action={() => {
                    toggleLanguage('en');
                    setCanBeSaved(true);
                  }}
                >
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
                  action={
                    isUploading ? () => {} : () => uploadRef.current.click()
                  }
                >
                  {isUploading ? (
                    <Loading
                      styles={{
                        width: '30px',
                        height: '30px',
                        alternativeLook: true,
                      }}
                    />
                  ) : (
                    <UploadIcon />
                  )}
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
      </>
    )
  );
}
