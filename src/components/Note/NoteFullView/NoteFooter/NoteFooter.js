import React from 'react';
import './NoteFooter.css';
import { ReactComponent as Check } from 'assets/Icons/check-square.svg';
import { ReactComponent as Pen } from 'assets/Icons/edit-2.svg';
import { ReactComponent as Mic } from 'assets/Icons/mic.svg';
import { ReactComponent as Picture } from 'assets/Icons/image.svg';
import { ReactComponent as Plus } from 'assets/Icons/plus.svg';

export default function NoteFooter() {
  //TODO: border radius ktory ma byc przezroczysty nalezy wyeksportowac jako clip path i uzyc go w buttonach
  return (
    <div className="noteFooter">
      <div className="colorsRow">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            className="colorButton"
            style={{ backgroundColor: `var(--noteColor-${num})` }}
          />
        ))}
      </div>
      <div className="actionsRow">
        <button className="navItem">
          <Check />
        </button>
        <button className="navItem navItem2">
          <Pen />
        </button>
        <button className="navItem navItem3">
          <Mic />
        </button>
        <button className="navItem">
          <Picture />
        </button>
      </div>
    </div>
  );
}
