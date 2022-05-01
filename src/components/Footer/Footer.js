import React from 'react';
import './Footer.css';
import { ReactComponent as Check } from 'assets/Icons/check-square.svg';
import { ReactComponent as Pen } from 'assets/Icons/edit-2.svg';
import { ReactComponent as Mic } from 'assets/Icons/mic.svg';
import { ReactComponent as Picture } from 'assets/Icons/image.svg';
import { ReactComponent as Plus } from 'assets/Icons/plus.svg';
export default function Footer() {
  return (
    <div className="footerNav">
      <button className="navItem">
        <Check />
      </button>
      <button className="navItem">
        <Pen />
      </button>
      <button className="navItemSpecial">
        <Plus />
      </button>
      <button className="navItem">
        <Mic />
      </button>
      <button className="navItem">
        <Picture />
      </button>
    </div>
  );
}
