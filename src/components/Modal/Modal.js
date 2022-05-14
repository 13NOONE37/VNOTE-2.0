import React, { useRef } from 'react';
import './Modal.css';
import { ReactComponent as CollapseIcon } from 'assets/Icons/chevron-right.svg';
import { ReactComponent as ArrowLeft } from 'assets/Icons/arrow-left.svg';
import { useDetectOutsideClick } from 'utils/useDetectOutsideClick';

export default function Modal({ setShowModal, children }) {
  const modalRef = useRef(null);

  useDetectOutsideClick(modalRef, setShowModal);

  return (
    <div className="modal">
      <div className="modal-main" ref={modalRef}>
        {children}
        <ActionButton
          action={() => setShowModal(false)}
          classes={'fixedActionButton'}
        >
          <ArrowLeft />
        </ActionButton>
      </div>
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
export function ActionButton({ title, children, action, classes }) {
  return (
    <div className={`actionBox ${classes}`}>
      <button className="actionButton" onClick={action}>
        {children}
      </button>
      <span className="actionName">{title}</span>
    </div>
  );
}
