import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'store/AppContext';
import SearchInput from 'components/header/SearchBar/SearchInput/SearchInput';
import Modal, { ActionButton } from 'components/Modal/Modal';
import './NewTagsModal.css';
import { ReactComponent as Tags } from 'assets/Icons/tag-2.svg';
import { ReactComponent as Plus } from 'assets/Icons/plus.svg';
import { ReactComponent as Trash } from 'assets/Icons/trash-2_2.svg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function NewTagsModal({ setShowNewTagsModal }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { tags, setTags } = useContext(AppContext);
  const [tagName, setTagName] = useState('');

  const handleChangeTag = (e, value) => {
    const isCorrect = !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
      e.target.value,
    );

    !isCorrect &&
      toast.warn(t('TagNameError'), {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    e.target.value.trim().length > 0 &&
      setTags(
        tags.map((item) => {
          if (item == value && isCorrect) return e.target.value;
          return item;
        }),
      );
    navigate('/all');
  };
  const handleChangeNewTag = (e) => {
    const isCorrect = !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
      e.target.value,
    );
    isCorrect && setTagName(e.target.value);
  };
  const deleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag != tagToDelete));
  };
  const handleAddNewTag = (e) => {
    e.preventDefault();

    if (
      tagName.trim().length > 0 &&
      !tags.find((tag) => tag === tagName) &&
      !new RegExp(/^trash$/i).test(tagName) &&
      !new RegExp(/^wszystkie$/i).test(tagName) &&
      !new RegExp(/^kosz$/i).test(tagName) &&
      !new RegExp(/^all$/i).test(tagName)
    ) {
      setTags([...tags, tagName]);
      setTagName('');
    }
  };

  return (
    <Modal
      additionalClass="tagsViewModal profileModal newTagsModal"
      setShowModal={(value) => {
        setShowNewTagsModal(value);
      }}
    >
      <span className="tagsGallery newTagsGallery">
        <span className="tagsGallery--title">{t('AddTags')}</span>
        <span className="tagsGallery--content">
          {tags.map((item, index) => (
            <div className="tagArea" key={index}>
              {/* <button className="navItem" aria-label={t('EditTag')}>
                <Edit />
              </button> */}
              <input
                type="text"
                className="modalButton"
                value={item}
                onChange={(e) => handleChangeTag(e, item)}
              />
              <button
                onClick={() => deleteTag(item)}
                className="navItem"
                aria-label={t('DeleteTag')}
              >
                <Trash />
              </button>
            </div>
          ))}
          {/* <button className="navItem" aria-label={t('AddNewTag')}>
                <Plus />
              </button>
              <button className="navItem" aria-label={t('DeleteTag')}>
                <Trash />
              </button> */}
        </span>
        <form onSubmit={handleAddNewTag}>
          <SearchInput
            inputValue={tagName}
            inputAction={handleChangeNewTag}
            closeAction={() => {
              setTagName('');
            }}
            placeholder={t('AddNewTag')}
            icon={() => <Tags />}
            variant2
          />
          <ActionButton classes={'newTagButton'} type="submit">
            <Plus />
          </ActionButton>
        </form>
      </span>
    </Modal>
  );
}
