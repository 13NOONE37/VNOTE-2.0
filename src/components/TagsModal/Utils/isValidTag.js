import { t } from 'i18next';
import { toast } from 'react-toastify';

const isValidTag = ({ name, tags, type }) => {
  if (name === undefined) return false;

  if (name.trim().length === 0) {
    toast.warn(
      t('EmptyTagName', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }),
    );
    return false;
  }
  if (name.trim().length > 30) {
    toast.warn(
      t('TooLongTagName', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }),
    );
    return false;
  }
  if (
    ([...tags, { id: '', name: name }].filter((tag) => tag.name === name)
      .length > 1 &&
      type === 'edit') ||
    (tags.filter((tag) => tag.name === name).length > 0 && type === 'new')
  ) {
    toast.warn(
      t('TagNameExist', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }),
    );
    return false;
  }
  if (
    new RegExp(/^trash$/i).test(name) ||
    new RegExp(/^wszystkie$/i).test(name) ||
    new RegExp(/^kosz$/i).test(name) ||
    new RegExp(/^all$/i).test(name)
  ) {
    toast.warn(
      t('WrongTagName', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }),
    );
    return false;
  }
  return true;
};
export default isValidTag;
