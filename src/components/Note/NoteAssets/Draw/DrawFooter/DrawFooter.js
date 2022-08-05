import React, {
  startTransition,
  useContext,
  useReducer,
  useState,
  useTransition,
} from 'react';
import './DrawFooter.css';
import { ReactComponent as Pen } from 'assets/Icons/edit-2.svg';
import { ReactComponent as Eraser } from 'assets/Icons/eraser.svg';
import { ReactComponent as Clear } from 'assets/Icons/clear.svg';
import { ReactComponent as ArrowLeft } from 'assets/Icons/corner-down-left.svg';
import { ReactComponent as ArrowRight } from 'assets/Icons/corner-down-right.svg';
import { useTranslation } from 'react-i18next';

export default function DrawFooter({ drawRef, drawState, setDrawState }) {
  const { t } = useTranslation();
  const [currentAction, setCurrentAction] = useState(null);
  const [tartTransition, isPending] = useTransition();

  const validateWidth = (value) => Math.max(0, Math.min(100, value));
  return (
    <div className="noteFooter drawFooter">
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
          value={drawState.strokeWidth}
          onChange={(e) => {
            startTransition(() => {
              setDrawState({
                ['strokeWidth']: validateWidth(parseFloat(e.target.value)),
              });
              setDrawState({
                ['eraserWidth']: validateWidth(parseFloat(e.target.value)),
              });
            });
          }}
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
              setDrawState({
                ['eraserWidth']: validateWidth(e.target.valueAsNumber),
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
            currentAction === 'Pen' && 'navItem__active'
          }`}
          onClick={() => {
            drawRef.current.eraseMode(false);
            setCurrentAction('Pen');
          }}
          aria-label={t('Pen')}
          data-tooltip__top={t('Pen')}
        >
          <Pen />
        </button>
        <button
          className={`navItem button__effect ${
            currentAction === 'Eraser' && 'navItem__active'
          }`}
          onClick={() => {
            drawRef.current.eraseMode(true);
            setCurrentAction('Eraser');
          }}
          aria-label={t('Eraser')}
          data-tooltip__top={t('Eraser')}
        >
          <Eraser />
        </button>
        <button
          className={`navItem button__effect`}
          onClick={() => {
            drawRef.current.undo();
          }}
          aria-label={t('Undo')}
          data-tooltip__top={t('Undo')}
        >
          <ArrowLeft />
        </button>
        <button
          className={`navItem button__effect`}
          onClick={() => {
            drawRef.current.redo();
          }}
          aria-label={t('Redo')}
          data-tooltip__top={t('Redo')}
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
