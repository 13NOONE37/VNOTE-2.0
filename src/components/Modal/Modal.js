import React, { useRef } from 'react';
import './Modal.css';
import { ReactComponent as CollapseIcon } from 'assets/Icons/chevron-right.svg';

export default function Modal({ setShowModal, children }) {
  const modalRef = useRef(null);
  return (
    <div
      className="modal"
      onClick={(e) => {
        setShowModal(modalRef.current !== e.target);
      }}
      ref={modalRef}
    >
      <div className="modal-main">{children}</div>
    </div>
  );
}

export function ModalButton({ isCollapse, children, collapseContent }) {
  const toggleList = (e) => {
    if (!isCollapse) return;
    for (const item of document.querySelectorAll('.modalButton')) {
      item !== e.currentTarget && item.classList.remove('clickedModalButton');
    }

    // e.currentTarget.classList.toggle('clickedModalButton');
    e.currentTarget.classList.add('clickedModalButton');
  };
  return (
    <button className="modalButton" onClick={toggleList}>
      {children}
      {isCollapse && <CollapseIcon />}
      <div className="buttonCollapsedContent">{collapseContent}</div>
    </button>
  );
}
export function ActionButton({ title, children, action }) {
  return (
    <div className="actionBox">
      <button className="actionButton" onClick={action}>
        {children}
      </button>
      <span className="actionName">{title}</span>
    </div>
  );
}
