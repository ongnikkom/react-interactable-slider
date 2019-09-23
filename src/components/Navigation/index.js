import React, { useCallback, useContext } from 'react';
import { arrow, dotsContainer, dot } from './styles';
import Context from '../../context';

function Navigation() {
  const [state] = useContext(Context);
  const { cellAlign, currentSnapPoint, navigationType, snapPoints, view } = state;

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
          onClick={isLeft ? navRight : navLeft}
          disabled={isLeft ? rightDisabled : leftDisabled}
        />
        <div
          className={arrow('right', navigationType === 'both')}
          onClick={isLeft ? navLeft : navRight}
          disabled={isLeft ? leftDisabled : rightDisabled}
        />
      </>
    );
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
