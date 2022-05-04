import React from 'react';
import './Footer.css';
import { ReactComponent as Check } from 'assets/Icons/check-square.svg';
import { ReactComponent as Pen } from 'assets/Icons/edit-2.svg';
import { ReactComponent as Mic } from 'assets/Icons/mic.svg';
import { ReactComponent as Picture } from 'assets/Icons/image.svg';
import { ReactComponent as Plus } from 'assets/Icons/plus.svg';
export default function Footer() {
  //TODO: border radius ktory ma byc przezroczysty nalezy wyeksportowac jako clip path i uzyc go w buttonach
  return (
    <div className="footerNav">
      <button className="navItem">
        <Check />
      </button>
      <button className="navItem navItem2">
        <Pen />
      </button>
      <button className="navItemSpecial">
        <Plus />
      </button>
      <button className="navItem navItem3">
        <Mic />
      </button>
      <button className="navItem">
        <Picture />
      </button>
      {/* <svg className id="buttonPath1">
        <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
          <path d="M0.005,0 l0.05,0.077,0.099,-0.051,0.035,0.08,0.108,-0.043,0.019,0.082,0.116,-0.033,0.003,0.083,0.121,-0.024,-0.012,0.083,0.125,-0.013,-0.028,0.081,0.126,-0.003,-0.043,0.078,0.126,0.007,-0.058,0.074,0.123,0.018,-0.071,0.069,0.119,0.028,-0.084,0.062,0.113,0.037,-0.095,0.055 L1,0.794 l-0.105,0.047,0.095,0.055,-0.113,0.037,0.084,0.062,-0.02,0.005 H0 V0.003"></path>
        </clipPath>
      </svg> */}
    </div>
  );
}
