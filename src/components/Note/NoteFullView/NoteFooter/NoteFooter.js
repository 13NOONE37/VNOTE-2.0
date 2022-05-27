import React from 'react';
import './NoteFooter.css';
import { ReactComponent as Check } from 'assets/Icons/check-square.svg';
import { ReactComponent as Tag } from 'assets/Icons/tag.svg';
import { ReactComponent as Share } from 'assets/Icons/share-2.svg';
import { ReactComponent as Trash } from 'assets/Icons/trash-2.svg';

export default function NoteFooter({
  noteValues,
  setNoteValues,
  additionalClass,
}) {
  const changeColor = (n) => setNoteValues({ ['color']: n });
  const toggleIsTagged = () =>
    setNoteValues({ ['isTagged']: !noteValues.isTagged });

  return (
    <div className={`noteFooter ${additionalClass}`}>
      <div className="colorsRow">
        {[1, 2, 3, 4, 5].map((num, index) => (
          <button
            className={`colorButton ${
              noteValues.color === num && 'selectedColorButton'
            }`}
            style={{ backgroundColor: `var(--noteColor-${num})` }}
            onClick={() => changeColor(num)}
            key={index}
          />
        ))}
      </div>
      <div className="actionsRow">
        <button className="navItem" onClick={toggleIsTagged}>
          <Check />
        </button>
        <button className="navItem navItem2">
          <Tag />
        </button>
        <button className="navItem navItem3">
          <Share />
        </button>
        <button className="navItem">
          <Trash />
        </button>
      </div>
    </div>
  );
}
