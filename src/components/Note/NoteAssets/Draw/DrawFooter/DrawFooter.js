import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import './DrawFooter.css';
import { ReactComponent as Pen } from 'assets/Icons/edit-2.svg';
import { ReactComponent as Eraser } from 'assets/Icons/eraser.svg';
import { ReactComponent as Clear } from 'assets/Icons/clear.svg';
import { ReactComponent as ArrowLeft } from 'assets/Icons/corner-down-left.svg';
import { ReactComponent as ArrowRight } from 'assets/Icons/corner-down-right.svg';
import { ReactComponent as Download } from 'assets/Icons/download.svg';
import { useTranslation } from 'react-i18next';

export default function DrawFooter({
  drawRef,
  drawState,
  setDrawState,
  showFooter,
}) {
  const { t } = useTranslation();
  const [isPending, startTransition] = useTransition();

  const validateWidth = (value) => Math.max(0, Math.min(100, value));
  return (
    <div
      className={`noteFooter drawFooter ${
        showFooter ? 'showDrawFooter' : 'hideDrawFooter'
      }`}
    >
      <div className="colorsRow">
        {[1, 2, 3, 4, 5, 6].map((num, index) => (
          <button
            className={`colorButton ${
              drawState.strokeColor === `var(--noteColor-${num})` &&
              'selectedColorButton'
            }`}
            style={{ backgroundColor: `var(--noteColor-${num})` }}
            onClick={() =>
              setDrawState({ ['strokeColor']: `var(--noteColor-${num})` })
            }
            key={index}
            value={num}
            aria-label={t('AriaColor')}
          />
        ))}
        <input
          type="color"
          className={`colorButton colorInput`}
          onChange={(e) => {
            startTransition(() => {
              setDrawState({ ['strokeColor']: e.target.value });
            });
          }}
          aria-label={t('AriaColor')}
        />
      </div>
      <div className="sizeRow">
        <input
          className="draw--input--size"
          type="range"
          min={1}
          max={100}
          defaultValue={drawState.strokeWidth}
          onPointerUp={(e) => {
            startTransition(() => {
              setDrawState({
                ['strokeWidth']: validateWidth(parseFloat(e.target.value)),
              });
            });
          }}
          // value={drawState.strokeWidth}
          // onChange={(e) => {
          //   startTransition(() => {
          //     setDrawState({
          //       ['strokeWidth']: validateWidth(parseFloat(e.target.value)),
          //     });
          //   });
          // }}
        />
        <input
          className="draw--input--size--number"
          type="number"
          value={drawState.strokeWidth}
          onChange={(e) => {
            startTransition(() => {
              setDrawState({
                ['strokeWidth']: validateWidth(e.target.valueAsNumber),
              });
            });
          }}
          min={0}
          max={100}
        />
      </div>

      <div className="actionsRow">
        <button
          className={`navItem button__effect ${
            drawState.currentAction === 'Pen' && 'navItem__active'
          }`}
          onClick={() => {
            drawRef.current.eraseMode(false);
            setDrawState({ ['currentAction']: 'Pen' });
          }}
          aria-label={t('PenDrawFooter')}
          data-tooltip__top={t('PenDrawFooter')}
        >
          <Pen />
        </button>
        <button
          className={`navItem button__effect ${
            drawState.currentAction === 'Eraser' && 'navItem__active'
          }`}
          onClick={() => {
            drawRef.current.eraseMode(true);
            setDrawState({ ['currentAction']: 'Eraser' });
          }}
          aria-label={t('EraserDrawFooter')}
          data-tooltip__top={t('EraserDrawFooter')}
        >
          <Eraser />
        </button>
        <button
          className={`navItem button__effect`}
          onClick={() => {
            drawRef.current.undo();
          }}
          aria-label={t('UndoDrawFooter')}
          data-tooltip__top={t('UndoDrawFooter')}
        >
          <ArrowLeft />
        </button>
        <button
          className={`navItem button__effect`}
          onClick={() => {
            drawRef.current.redo();
          }}
          aria-label={t('RedoDrawFooter')}
          data-tooltip__top={t('RedoDrawFooter')}
        >
          <ArrowRight />
        </button>
        <button
          className={`navItem button__effect`}
          onClick={() => {
            drawRef.current.clearCanvas();
          }}
          aria-label={t('Clear')}
          data-tooltip__top={t('Clear')}
        >
          <Clear />
        </button>
      </div>
    </div>
  );
}
