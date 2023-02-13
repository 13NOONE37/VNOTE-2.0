import React, { useRef } from 'react';
import './Modal.css';
import './Buttons.css';
import { ReactComponent as CollapseIcon } from 'assets/Icons/chevron-right.svg';
import { ReactComponent as ArrowLeft } from 'assets/Icons/arrow-left.svg';

import useDetectOutsideClick from 'utils/useDetectOutsideClick';

export default function Modal({
  setShowModal,
  modalHeadContent,
  middleHeadContent,
  children,
  additionalClass,
  optionalColor,
}) {
  const modalRef = useRef(null);

  useDetectOutsideClick(modalRef, setShowModal);

  return (
    <div className={`modal ${additionalClass}`}>
      <div className="modal-main" ref={modalRef}>
        <div className="modalHead" style={{ backgroundColor: optionalColor }}>
          <TopActionButton
            action={() => setShowModal(false)}
            classes={'fixedActionButton'}
          >
            <ArrowLeft />
          </TopActionButton>
          {/* <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '65px',
            }}
          > */}
          {middleHeadContent ? middleHeadContent : <span></span>}
          {/* </span> */}
          {modalHeadContent}
        </div>

        <div
          className="modalContent"
          style={{ backgroundColor: optionalColor }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function ModalButton({
  isCollapse,
  children,
  collapseContent,
  action,
  isActive,
}) {
  const toggleList = (e) => {
    action && action();
    if (!isCollapse) return;
    for (const item of document.querySelectorAll('.modalButton')) {
      item !== e.currentTarget && item.classList.remove('clickedModalButton');
    }
    e.currentTarget.classList.add('clickedModalButton');
  };
  return (
    <div
      className={`modalButton ${isActive && 'clickedModalButton'}`}
      onClick={toggleList}
    >
      {children}
      {isCollapse && <CollapseIcon className="collapseIcon" />}
      <div className="buttonCollapsedContent">{collapseContent}</div>
    </div>
  );
}
export function TopActionButton({ title, children, action, classes }) {
  return (
    <ActionButton
      title={title}
      action={action}
      classes={`fixedActionButton ${classes}`}
    >
      {children}
    </ActionButton>
  );
}
export function ActionButton({ title, children, action, classes, ...props }) {
  return (
    <div className={`actionBox ${classes}`}>
      <button className="actionButton" onClick={action} {...props}>
        {children}
      </button>
      <span className="actionName">{title}</span>
    </div>
  );
}
