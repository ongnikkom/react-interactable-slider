import React, { useCallback } from 'react';
import { arrow, dotsContainer, dot } from './styles';

function Navigation({ cellAlign, currentSnapPoint, navigationType, snapPoints, view }) {
  const isLeft = cellAlign === 'left';

  const renderArrows = useCallback(() => {
    const navLeft = () =>
      currentSnapPoint !== snapPoints.length - 1 &&
      view.current.snapTo({ index: currentSnapPoint + 1 });

    const navRight = () =>
      currentSnapPoint !== 0 && view.current.snapTo({ index: currentSnapPoint - 1 });

    const leftDisabled = currentSnapPoint === snapPoints.length - 1;
    const rightDisabled = currentSnapPoint < 1;

    return (
      <>
        <div
          className={arrow('left', navigationType === 'both')}
          onClick={isLeft ? navLeft : navRight}
          disabled={isLeft ? leftDisabled : rightDisabled}
        />
        <div
          className={arrow('right', navigationType === 'both')}
          onClick={isLeft ? navRight : navLeft}
          disabled={isLeft ? rightDisabled : leftDisabled}
        />
      </>
    );
  }, [currentSnapPoint, navigationType, snapPoints]);

  const renderDots = useCallback(() => {
    const selectedDot = isLeft ? snapPoints.length - currentSnapPoint - 1 : currentSnapPoint;

    const onClick = e => {
      const { target } = e;
      const index = Array.prototype.indexOf.call(target.parentNode.childNodes, target);
      const selectedIndex = isLeft ? snapPoints.length - 1 - index : index;
      view.current.snapTo({ index: selectedIndex });
    };

    return (
      <div className={dotsContainer}>
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
