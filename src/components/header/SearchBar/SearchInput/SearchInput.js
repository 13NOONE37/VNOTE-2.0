import React from 'react';
import './SearchInput.css';
import { ReactComponent as XCircle } from 'assets/Icons/x-circle.svg';

export default function SearchInput({
  inputValue,
  inputAction,
  closeAction,
  placeholder,
  icon,
  variant2,
}) {
  return (
    <div className={`searchBar ${variant2 && 'searchBarVariant2'}`}>
      {icon()}
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={inputAction}
      />
      <XCircle
        onClick={closeAction}
        className={inputValue.length > 0 ? 'appearItem' : 'disappearItem'}
      />
    </div>
  );
}
