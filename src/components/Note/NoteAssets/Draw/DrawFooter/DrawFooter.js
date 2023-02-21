import React, { useTransition } from 'react';
import './DrawFooter.css';
import { ReactComponent as Pen } from 'assets/Icons/edit-2.svg';
import { ReactComponent as Eraser } from 'assets/Icons/eraser.svg';
import { ReactComponent as Clear } from 'assets/Icons/clear.svg';
import { ReactComponent as ArrowLeft } from 'assets/Icons/corner-down-left.svg';
import { ReactComponent as ArrowRight } from 'assets/Icons/corner-down-right.svg';
import { useTranslation } from 'react-i18next';

export default function DrawFooter({
  drawRef,
  drawState,
  setDrawState,
  showFooter,
}) {
  const { t } = useTranslation();
  const [isPending, startTransition] = useTransition();

  // const [name, setName] = useState(drawState.name);
  const validateWidth = (value) => Math.max(0, Math.min(100, value));

  return (
    <div
      className={`noteFooter drawFooter ${
        showFooter ? 'showDrawFooter' : 'hideDrawFooter'
      }`}
    >
      <input
        className="draw--input--text"
        type="text"
        placeholder={t('Name')}
        value={drawState.name}
        onChange={(e) => {
          if (/^.{0,32}$/.test(e.target.value)) {
            // startTransition(() => {
            // setName(e.target.value);
            setDrawState({
              name: e.target.value,
            });
            // });
          }
        }}
        maxLength={32}
      />
      <div className="colorsRow">
        {[1, 2, 3, 4, 5, 6].map((num, index) => (
          <button
            className={`colorButton ${
              drawState.strokeColor === `var(--noteColor-${num})` &&
              'selectedColorButton'
            }`}
            style={{ backgroundColor: `var(--noteColor-${num})` }}
            onClick={() =>
              setDrawState({ strokeColor: `var(--noteColor-${num})` })
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
              setDrawState({ strokeColor: e.target.value });
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
                strokeWidth: validateWidth(parseFloat(e.target.value)),
              });
            });
          }}
          // value={drawState.strokeWidth}
          // onChange={(e) => {
          //   startTransition(() => {
          //     setDrawState({
          //       ['strokeWidth: validateWidth(parseFloat(e.target.value)),
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
                strokeWidth: validateWidth(e.target.valueAsNumber),
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
            setDrawState({ currentAction: 'Pen' });
          }}
          aria-label={t('PenDrawFooter')}
          data-tooltip__top={t('PenDrawFooter')}
          style={{ '--leftOffset': '40px' }}
        >
          <Pen />
        </button>
        <button
          className={`navItem button__effect ${
            drawState.currentAction === 'Eraser' && 'navItem__active'
          }`}
          onClick={() => {
            drawRef.current.eraseMode(true);
            setDrawState({ currentAction: 'Eraser' });
          }}
          aria-label={t('EraserDrawFooter')}
          data-tooltip__top={t('EraserDrawFooter')}
          style={{ '--leftOffset': '0px' }}
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
          style={{ '--leftOffset': '0px' }}
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
          style={{ '--leftOffset': '0px' }}
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
          style={{ '--leftOffset': '-10px' }}
        >
          <Clear />
        </button>
      </div>
    </div>
  );
}
