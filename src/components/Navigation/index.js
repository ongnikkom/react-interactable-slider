import React, { cloneElement, useCallback, useContext } from 'react';
import { arrow, dotsContainer, dot } from './styles';
import Context from '../../context';

function Navigation() {
  const [state] = useContext(Context);
  const { cellAlign, currentSnapPoint, customArrows, navigationType, snapPoints, view } = state;

  const isLeft = cellAlign === 'left';

  const renderArrows = useCallback(() => {
    const navLeft = () =>
      currentSnapPoint !== snapPoints.length - 1 &&
      view.current.snapTo({ index: currentSnapPoint + 1 });

    const navRight = () =>
      currentSnapPoint !== 0 && view.current.snapTo({ index: currentSnapPoint - 1 });

    const leftDisabled = currentSnapPoint === snapPoints.length - 1;
    const rightDisabled = currentSnapPoint < 1;

    const leftEventBinding = isLeft ? navRight : navLeft;
    const leftArrowDisabled = isLeft ? rightDisabled : leftDisabled;

    const rightEventBinding = isLeft ? navLeft : navRight;
    const rightArrowDisabled = isLeft ? leftDisabled : rightDisabled;

    const renderCustomArrows = () => {
      const { left, right } = customArrows;

      const leftArrow = cloneElement(left, { disabledArrow: leftArrowDisabled });
      const rightArrow = cloneElement(right, { disabledArrow: rightArrowDisabled });

      return (
        <>
          <div className={`custom-left-arrow`} onClick={leftEventBinding}>
            {leftArrow}
          </div>

          <div className={`custom-right-arrow`} onClick={rightEventBinding}>
            {rightArrow}
          </div>
        </>
      );
    };

    const renderDefaultArrows = () => (
      <>
        <div
          className={arrow('left', navigationType === 'both', leftArrowDisabled)}
          onClick={leftEventBinding}
        />

        <div
          className={arrow('right', navigationType === 'both', rightArrowDisabled)}
          onClick={rightEventBinding}
        />
      </>
    );

    return customArrows ? renderCustomArrows() : renderDefaultArrows();
  }, [currentSnapPoint, navigationType, snapPoints]);

  const renderDots = useCallback(() => {
    const selectedDot = currentSnapPoint;

    const onClick = e => {
      const { target } = e;
      const index = Array.prototype.indexOf.call(target.parentNode.childNodes, target);
      view.current.snapTo({ index });
    };

    return (
      <div className={dotsContainer(cellAlign)}>
        {snapPoints.map((v, i) => {
          return <div className={dot(i === selectedDot)} key={i} onClick={onClick} />;
        })}
      </div>
    );
  }, [currentSnapPoint, snapPoints]);

  switch (navigationType) {
    case 'arrows':
      return renderArrows();
    case 'dots':
      return renderDots();
    case 'both':
      return (
        <>
          {renderArrows()}
          {renderDots()}
        </>
      );
    default:
      return null;
  }
}

export default Navigation;
