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
  maxLength,
}) {
  return (
    <div className={`searchBar ${variant2 && 'searchBarVariant2'}`}>
      {icon()}
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={inputAction}
        maxLength={maxLength || 524288}
      />
      <XCircle
        onClick={closeAction}
        className={inputValue.length > 0 ? 'appearItem' : 'disappearItem'}
      />
    </div>
  );
}
